---
title: Connection time optimization
enableTableOfContents: true
isDraft: true
---

Neon's Auto-suspend feature ('scale to zero') is designed to minimize costs by automatically scaling a compute resource down to zero after a period of inactivity. By default, Neon scales a compute to zero after 5 minutes of inactivity. A unique characteristic of this feature is the concept of a "connection warmup". During this process, also referred to as a "cold start", a compute instance transitions from an idle state to an active state to process requests. Currently, activating a Neon compute from an idle state takes 3 to 4 seconds.

<Admonition type="note">
It's important to remember that services you integrate with Neon may have their own connection warmup periods, which can add to connection latencies. This topic does not address latencies of other vendors, but if your application connects to Neon via another service, do not forget to consider connection warmup times for those services as well.
</Admonition>

This topic describes how to check the status of a compute to determine if it is active or idle, how to explicitly activate a compute, and strategies for managing connection warmups.

## Check the status of a compute

You can check the current status of a compute on the **Branches** page in the Neon Console. A compute will report either an **Active** or **Idle** status.

![Compute endpoint active idle status](/docs/connect/compute_endpoint_status.png)

User actions that activate an idle compute include [connecting from a client such as psql](../connect/query-with-psql-editor), running a query on the associated branch from the [Neon SQL Editor](../get-started-with-neon/query-with-neon-sql-editor), or accessing the compute via the Neon API.

<Admonition type="info">
The Neon API includes [Start endpoint](https://api-docs.neon.tech/reference/startprojectendpoint) and [Suspend endpoint](https://api-docs.neon.tech/reference/startprojectendpoint) APIs for the specific purpose of activating and suspending a compute.
</Admonition>

You can try any of these methods and watch the status of your compute as it changes from an **Active** or **Idle** state. By default, a compute is suspended after 300 seconds (5 minutes) of inactivity. [Neon Pro plan](../introduction/pro-plan) users can configure this delay period, which is described later in this topic.

After a period of time in the **Idle** state, Neon occasionally activates your compute to check for data availability. The time between checks gradually increases if the compute does not receive any client connections.

You can view compute state transitions in the Branches widget on the Neon Dashboard.

## Strategies for managing connection warmups

Given the potential impact on application responsiveness, it's important to have strategies in place for managing the connection warmup period  &mdash; when a compute transitions from an idle to and active state. Here are some methods you can implement:

- [Adjust your Auto-suspend (scale to zero) configuration](#adjust-your-auto-suspend-scale-to-zero-configuration)
- [Increase your connection timeout](#increase-your-connection-timeout)
- [Build connection timeout handling into your application](#build-connection-timeout-handling-into-your-application)
- [Use application-level caching](#use-application-level-caching)

### Adjust your Auto-suspend (scale to zero) configuration

The [Neon Pro plan](/docs/introduction/pro-plan) allows you to configure the period before the system scales down to zero, providing you with control over the balance between performance and cost. The configuration setting is called **Auto-suspend delay**, and it is set to 300 seconds (5 minutes) by default. You can either disable Auto-suspend entirely or increase the setting up to a maximum of 7 days. This strategy eliminates or reduces connection warmup times, respectively, but increases compute usage. For configuration instructions, see [Edit a compute endpoint](/docs/manage/endpoints#edit-a-compute-endpoint).

Consider combining this strategy Autoscaling (available with the [Neon Pro plan](/docs/introduction/pro-plan)), which allows you to run a compute with minimal resources and scale up on demand. For example, with Autoscaling, you can configure a minimum compute size to reduce costs when your compute is active during off-peak times. In the image shown below, the **Auto-suspend delay** is set to 3600 seconds (1 hour) so that your compute only suspends after an hour of inactivity, and Autoscaling is configured with the 1/4 minimum compute size to keep costs low during periods of inactivity or light usage.

![Connection warmup Auto-suspend and Autoscaling configuration](/docs/connect/cold_start_compute_config.png)

For information about what an "always-on" minimum compute size might cost per month, please refer to our [Billing](/docs/introduction/billing) documentation or the pricing calculator on our [Pricing](https://neon.tech/pricing) page.

For Autoscaling configuration instructions, see [Compute size and Autoscaling configuration](https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration).

### Increase your connection timeout

By configuring longer connection timeout durations, your application has more time to accommodate the few seconds it takes to active an idle compute.

Connection timeout settings are typically configured in your application or the database client library you're using, and the specific way to do it depends on the language and framework you're using.

Here are examples of how to increase connection timeout settings in a few common programming languages and frameworks:

<CodeTabs labels={["Node.js", "Python", "Java", "Prisma" ]}>

```js
const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 10000, // connection timeout in milliseconds
    idleTimeoutMillis: 10000 // idle timeout in milliseconds
})
```

```python
import psycopg2
from psycopg2 import connect
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os

DATABASE_URL = os.environ['DATABASE_URL']

conn = psycopg2.connect(DATABASE_URL, connect_timeout=10)
```

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

String dbUrl = System.getenv("DATABASE_URL");
Properties properties = new Properties();
properties.setProperty("connectTimeout", "10");

Connection conn = DriverManager.getConnection(dbUrl, properties);
```

```prisma
DATABASE_URL=postgres://<user>:<password>@<neon_hostname>/neondb?connect_timeout=20`
```

</CodeTabs>

For more information about timeouts when connecting from Prisma, see [Connection timeouts](../guides/prisma#connection-timeouts) in our Prisma documentation.

Remember that increasing the connection timeout might impact the responsiveness of your application, as users could end up waiting longer for their requests to be processed. Always test and monitor your application's performance when making changes like these.

### Build connection timeout handling into your application

You can enhance your application to better handle connection timeouts. This might involve using retries with exponential backoff. This Typescript example connects to the database using the `pg` library and uses the `node-retry` library to handle connection retries with an exponential backoff. The general logic can be easily translated into other languages.

```typescript
require('dotenv').config();
const { Client } = require('pg');
const retry = require('retry');

// Connection string from .env file
const connectionString = process.env.DATABASE_URL;

async function connectWithRetry() {
  const operation = retry.operation({
    retries: 5,               // number of retries before giving up
    minTimeout: 4000,         // minimum time between retries in milliseconds
    randomize: true,          // adds randomness to timeouts to prevent retries from overwhelming the server
  });

  operation.attempt(async (currentAttempt) => {
    const client = new Client({ connectionString });

    try {
      await client.connect();
      console.log('Connected to the database');
      
      // Perform your operations with the client
      // For example, let's run a simple SELECT query
      const res = await client.query('SELECT NOW()');
      console.log(res.rows[0]);
      
      await client.end();
    } catch (err) {
      if (operation.retry(err)) {
        console.warn(`Failed to connect on attempt ${currentAttempt}, retrying...`);
        return;
      }

      console.error('Failed to connect to the database after multiple attempts:', err);
    }
  });
}

// Usage
connectWithRetry();
```

In this example, the `operation.attempt` function executes the connection logic. If the connection fails (i.e., `client.connect()` throws an error), the error is passed to `operation.retry(err)`. If there are retries left, the retry function schedules another attempt with an exponentially increasing delay. Otherwise, the error is logged to the console.

<Admonition type="note">
The example above is a simplification. In a production application, you might want to be more sophisticated, e.g., by initially trying to reconnect quickly in case the problem was a transient network issue, then fall back to slower retries if the problem persists. This could be achieved by using the `factor` option in the `retry` library, or by implementing your own backoff logic.
</Admonition>

### Use application-level caching

Implement a caching system like [Redis](https://redis.io/) or [PolyScale](https://www.polyscale.ai/) to store frequently accessed data, which can be rapidly served to users. This approach aids in reducing latencies by avoiding compute wakeups, but only if the data requested is available in the cache. Challenges with this strategy include cache invalidation due to frequently changing data, and cache misses when a query requests uncached data. This strategy cannot avoid compute wakeups entirely, but you may be able to combine it with other strategies to reduce occurrences of latency overall.

## Conclusion

With the right strategies, you can optimize your system to handle connection warmups, ensuring your application delivers a consistently high level of performance. The best solution often involves a combination of the strategies outlined above, so experiment and find the right configuration for your specific use case.
