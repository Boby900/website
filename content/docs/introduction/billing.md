---
title: Billing
enableTableOfContents: true
---

Neon offers the following plans: **Free Tier**, **Pro**, **Enterprise**, and **Platform Partnership**. The Pro plan is _usage-based_, ensuring you never over-provision and only pay for what you use. The **Enterprise** and **Platform Partnership** plans are custom volume-based plans that offer potential discounts. You can find out more about our [plans](#neon-plans) below.

## Billing and usage metrics

Neon tracks and bills for usage based on the following metrics:

- **Active time**: The number of active compute hours per month for all computes in a Neon project.
- **Compute time**: The amount of computing capacity used within a specified time period.
- **Project storage**: The size of the data and history stored for your project.
- **Written data**: The amount of data written from compute to storage.
- **Data transfer**: The amount of data transferred out of Neon.

See [Billing and usage metrics explained](#billing-and-usage-metrics-explained) for a detailed description of each metric and how Neon calculates costs.

## Neon plans

|                                       | Free Tier                                                                                                                                                               | Pro (usage-based)                                          | Custom - Enterprise or Platform Partnership (volume-based)      |
| :------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- | :-------------------------------------------------------------- |
| **Best for**                          | Prototyping and personal projects                                                                                                                                       | Small to medium teams, setups with 1 to 3 active databases | Medium to large teams, Database fleets, Resale                  |
| **Projects**                          | 1                                                                                                                                                                       | Unlimited\*                                                | Unlimited                                                       |
| **Branches**                          | 10                                                                                                                                                                      | Unlimited                                                  | Unlimited                                                       |
| **Active time per month**             | No limit on the [primary branch](../reference/glossary#primary-branch) compute. 100 hours for [non-primary branch](../reference/glossary#non-primary-branch) computes\* | Unlimited                                                  | Unlimited                                                       |
| **Compute size**                      | 1 shared vCPU with 1 GB RAM                                                                                                                                             | Up to 7 vCPUs, each with 4 GB RAM                          | Custom                                                          |
| **Storage**                           | 3 GB per branch                                                                                                                                                         | Unlimited\*                                                | Unlimited                                                       |
| **Dedicated resources**               | -                                                                                                                                                                       | -                                                          | &check;                                                         |
| **Project sharing**                   | -                                                                                                                                                                       | &check;                                                    | &check;                                                         |
| **Auto-suspend compute**              | &check;                                                                                                                                                                 | &check;                                                    | &check;                                                         |
| **Configurable auto-suspend compute** | -                                                                                                                                                                       | &check;                                                    | &check;                                                         |
| **Autoscaling**                       | -                                                                                                                                                                       | &check;                                                    | &check;                                                         |
| **Payment**                           | Free                                                                                                                                                                    | Credit Card, Pay As You Go with monthly invoicing          | Prepaid, Custom Contract, Volume Discounts                      |
| **Support**                           | Community, support tickets                                                                                                                                              | Community, support tickets, video chat                     | Community, support tickets, video chat, resale customer support |

**Notes:**

- The Pro plan has default limits of 20 projects, 200 GB of storage, and 20 simultaneously active computes. To increase these limits, reach out to our [Sales](https://neon.tech/contact-sales) team. The simultaneously active compute limit does not affect the primary branch compute.
- The Free Tier has an [Active time](../reference/glossary#active-time) limit of 100 hours per month for non-primary branch computes. _Active time_ on the primary branch compute is counted toward the 100 hour limit. See [Free Tier](../introduction/technical-preview-free-tier) for more information.
- **There is no limit on Active time for the primary branch compute. This ensures that access to data on the primary branch is never interrupted.**

## Account billing page

A Neon account subscribed to a paid plan can perform the following actions on the **Billing** page in the Neon Console:

- View your current billing total for the month-to-date, including a cost breakdown by [billing metric](#billing-and-usage-metrics).
- Update your payment details
- Download invoices

Free Tier users can view [Free Tier](/docs/introduction/technical-preview-free-tier) limits on the **Billing** page and learn about the benefits of upgrading to the [Neon Pro plan](/docs/introduction/pro-plan).

To access your **Billing** page:

1. Navigate to the Neon Console.
1. Select **Billing** from the sidebar.

## Neon invoices

A Neon invoice includes an **Amount due** for the billing period and a cost breakdown by [billing metric](#billing-and-usage-metrics).

### Download invoices

You can download invoices from the **Billing** page.

1. Navigate to the **Billing** page in the Neon Console.
1. Under **Latest invoices**, locate the invoice you want to download and click the PDF download icon.

## Cancel a subscription

To cancel a Pro plan subscription:

1. Navigate to the **Billing** page in the Neon Console.
1. Click **Request subscription cancellation** at the bottom of the page.
1. Follow the instructions on the **Request Downgrade** modal, and click **Downgrade**.

Cancelling your Pro plan subscription downgrades your account to our Free Tier, which has lower usage limits that could affect the performance of your applications. To compare plan limits, see [Neon plans](/docs/introduction/billing#neon-plans).

You will be required to remove any projects, branches, or data that exceed [Free Tier limits](/docs/introduction/technical-preview-free-tier). The downgrade goes into effect within 30 minutes. You will receive your final bill at the beginning of the next billing period (the start of the month following the downgrade request).

For cancellation of Enterprise or Platform Partnership plans, please contact [Sales](https://neon.tech/contact-sales). Cancellation of these plans are handled in accordance with the Master Subscription Agreement (MSA) outlined in the customer agreement.

## Billing and usage metrics explained

This section provides a detailed explanation of Neon's billing and usage metrics and how they are calculated. Billing in Neon is account-based. For the billing rate for each metric, see [Billing rates](#billing-rates).

<Admonition type="note">
The **Project storage**, **Written data**, and **Data transfer** billing metrics are calculated in gibibytes (GiB), otherwise known as binary gigabytes. One gibibyte equals 2<sup>30</sup> or 1,073,741,824 bytes.
</Admonition>

### Active time

The _Active time_ metric is a usage metric rather than a billing metric. It is a factor of the _Compute time_ <u>billing</u> metric. It tracks the number of active compute hours per month for all computes in a Neon project. The hours that a compute is in an `Idle` state due to [auto-suspension](../reference/glossary#auto-suspend-compute) are not counted as _Active time_. The **Neon Free Tier** limits non-primary branch computes to 100 hours of _Active time_ per month, but there is no _Active time_ limit on the primary branch compute. For more information, see [Free Tier](../introduction/technical-preview-free-tier).

### Compute time

The _Compute time_ billing metric measures the amount of computing capacity used within a given time period. Neon takes a measure of computing capacity at a defined interval and averages those values to calculate _Compute time_. The minium interval is 12 seconds. Computing capacity is based on _Compute Units (CU)_. A CU in Neon is 1 vCPU and 4 GB of RAM. A Neon [compute endpoint](../reference/glossary/#compute-endpoint) can have anywhere from .25 to 7 CUs. A connection from a client or application activates a compute endpoint and its CUs. Activity on the connection keeps the compute endpoint and its CUs in an `Active` state. A defined period of inactivity places the compute endpoint and its CUs into an `Idle` state.

Factors that affect the amount of compute time include:

- The number of active compute endpoints
- The number of CUs per compute endpoint
- Neon's _Auto-suspend compute_ feature, which suspends a compute endpoint (and its CUs) after a period of inactivity. The default is five minutes.
- Neon's _Configurable auto-suspend compute_ feature, which allows you to configure or disable the timeout period for the _Auto-suspend compute_ feature.
- Neon's _Autoscaling_ feature, which allows you to set a minimum and maximum number of CUs for each compute endpoint. The number of active CUs scale up and down based on workload.

<Admonition type="note">
Neon uses a small amount of compute time, included in your billed amount, to perform a periodic check to ensure that your computes can start and read and write data.
</Admonition>

The cost calculation for _Compute time_ is as follows:

```text
compute units * active time (hours) * price per hour
```

#### Monthly compute time cost estimates

For an idea of compute time cost per month based on compute size and usage, refer to the following table:

| Compute size (CU) | 730 hrs/mth (all hours) | 173 hrs/mth (working hours) | 87 hrs/mth (half of working hours) |
| :---------------- | :---------------------- | :-------------------------- | :--------------------------------- |
| 0.25 CU           | $18.62                  | $4.41                       | $2.22                              |
| 0.5 CU            | $37.23                  | $8.82                       | $4.44                              |
| 1 CU              | $74.46                  | $17.65                      | $8.87                              |

<Admonition type="note">
The prices shown in the table are based on US East (Ohio) _Compute time_ rates.
</Admonition>

- Public-facing applications are likely to be active for all hours in a month (730 hrs/mth).
- Internal applications with consistent usage are likely to be active during working hours (173 hrs/mth).
- Internal applications with moderate usage are likely to be active during half of working hours (87 hrs/mth).

To estimate your own compute time monthly cost:

1. Determine the compute size that you require, in Compute Units (CUs). Neon supports compute size between .25 CUs and 7 CUs. One CU has 1 vCPU and 4GB of RAM.
1. Determine the amount of _Active time_ per month for your database, in hours.
1. Determine the rate (price per hour) for compute time in your region. See [Billing rates](#billing-rates).
1. Input the values into the _Compute time_ cost-calculation formula shown above. For example:

   ```text
   1 CU * 730 hrs * $0.10200 = $74.46
   ```

### Project storage

The _Project storage_ billing metric measures the amount of data and history stored in your Neon projects. Project storage includes:

- **Current data size**

  The size of all databases in your Neon projects. You can think of this as a _snapshot_ of your data at a point in time.

- **History**

  Neon retains a history to support _point-in-time restore_ and _database branching_.

  - _Point-in-time restore_ is the ability to restore data to an earlier point in time. Neon stores a 7-day history in the form of WAL records for a Neon project. WAL records that fall out of the 7-day window are evicted from storage and no longer counted toward project storage.
  - A _database branch_ is a virtual snapshot of your data (including _history_) at the point of branch creation combined with WAL records that capture the branch's data change history from that point forward.
    When a branch is first created, it adds no storage. No data changes have been introduced yet, and the branch's virtual snapshot still exists in the parent branch's _history_, which means that it shares this data in common with the parent branch. A branch only begins adding to storage when data changes are introduced or when the branch's virtual snapshot falls out of the parent branch's _history_, in which case the branch's data is no longer shared in common. In other words, branches add storage when you modify data and allow the branch to age out of the parent branch's _history_.

    Database branches can also share a _history_. For example, two branches created from the same parent at or around the same time share a _history_, which avoids additional storage. The same is true for a branch created from another branch. Wherever possible, Neon minimizes storage through shared history. Additionally, to keep storage to a minimum, Neon takes a new branch snapshot if the amount of data changes grow to the point that a new snapshot would consume less storage than retained WAL records.

The cost calculation for _Project storage_ is as follows:

```text
project storage (GiB) * (seconds stored / 3600) * price per hour
```

### Written data

The _Written data_ billing metric measures the amount of data changes written from compute to storage to ensure the durability of your data.

The cost calculation for _Written data_ is as follows:

```text
written data (GiB) * price per GiB
```

### Data transfer

The _Data transfer_ billing metric counts the amount of data transferred out of Neon (egress). Neon charges for each GiB of data transfer at the egress cost set by the cloud provider. Contact [Sales](https://neon.tech/contact-sales) for custom solutions to minimize data transfer costs.

The cost calculation for _Data transfer_ is as follows:

```text
data transfer (GiB) * price per GiB
```

## Billing rates

| Cloud provider | Region                   | Billing metric  | Price     | Unit           |
| :------------- | :----------------------- | :-------------- | :-------- | :------------- |
| AWS            | US East (N. Virginia)    | Compute time    | $0.0255   | Compute-hour\* |
| AWS            | US East (N. Virginia)    | Project storage | $0.000164 | GiB-hour       |
| AWS            | US East (N. Virginia)    | Written data    | $0.09600  | GiB            |
| AWS            | US East (N. Virginia)    | Data transfer   | $0.09000  | GiB            |
|                |                          |                 |           |                |
| AWS            | US East (Ohio)           | Compute time    | $0.0255   | Compute-hour\* |
| AWS            | US East (Ohio)           | Project storage | $0.000164 | GiB-hour       |
| AWS            | US East (Ohio)           | Written data    | $0.09600  | GiB            |
| AWS            | US East (Ohio)           | Data transfer   | $0.09000  | GiB            |
|                |                          |                 |           |                |
| AWS            | US West (Oregon)         | Compute time    | $0.0255   | Compute-hour\* |
| AWS            | US West (Oregon)         | Project storage | $0.000164 | GiB-hour       |
| AWS            | US West (Oregon)         | Written data    | $0.09600  | GiB            |
| AWS            | US West (Oregon)         | Data transfer   | $0.09000  | GiB            |
|                |                          |                 |           |                |
| AWS            | Europe (Frankfurt)       | Compute time    | $0.0295   | Compute-hour\* |
| AWS            | Europe (Frankfurt)       | Project storage | $0.00018  | GiB-hour       |
| AWS            | Europe (Frankfurt)       | Written data    | $0.09600  | GiB            |
| AWS            | Europe (Frankfurt)       | Data transfer   | $0.09000  | GiB            |
|                |                          |                 |           |                |
| AWS            | Asia Pacific (Singapore) | Compute time    | $0.03025  | Compute-hour\* |
| AWS            | Asia Pacific (Singapore) | Project storage | $0.00018  | GiB-hour       |
| AWS            | Asia Pacific (Singapore) | Written data    | $0.09600  | GiB            |
| AWS            | Asia Pacific (Singapore) | Data transfer   | $0.09000  | GiB            |

\*The _Compute-hour_ price is for a <sup>1</sup>&frasl;<sub>4</sub> Compute Unit (CU), the smallest CU size offered by Neon. A <sup>1</sup>&frasl;<sub>4</sub> CU has .25 vCPU and 1 GB of RAM. Neon currently supports computes with up to 7 CU (7 vCPU and 28 GB of RAM).

## Support

Support channels for the Neon Free Tier and paid plans are outlined below.

| Support channels                                     | Free Tier |   Pro   | Custom  |
| :--------------------------------------------------- | :-------: | :-----: | :-----: |
| [Neon Community Forum](https://community.neon.tech/) |  &check;  | &check; | &check; |
| Ability to submit support tickets                    |  &check;  | &check; | &check; |
| Video chat                                           |     -     | &check; | &check; |
| Resale customer support                              |     -     |    -    | &check; |

<Admonition type="note">
Pro plan users that submit support tickets through Neon's console can expect an initial response time of 2 business days, from 6am to 6pm Pacific Standard Time (UTC -8), Monday through Friday, excluding public holidays in the United States.

Free Tier users are not guaranteed a specific response time. For custom solutions, please contact [Sales](https://neon.tech/contact-sales).  
</Admonition>
