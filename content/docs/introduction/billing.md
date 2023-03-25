---
title: Billing
enableTableOfContents: true
---

Neon offers the following plans: **Free Tier**, **Pro**, **Enterprise**, and **Platform Partnership**. The Pro plan is _usage-based_, ensuring you never over-provision and only pay for what you use. The **Enterprise** and **Platform Partnership** plans are custom volume-based plans that offer potential discounts. You can find out more about our [plans](#neon-plans) below.

## Neon billing metrics

Neon charges for usage based on the following metrics:

- **Compute time**: The amount of computing capacity used within a specified time period.
- **Project storage**: The size of the data and history stored for your project.
- **Written data**: The amount of data written from compute to storage.
- **Data transfer**: The amount of data transferred out of Neon.

See [Billing and usage metrics explained](#billing-and-usage-metrics-explained) for a detailed description of each metric and how Neon calculates costs.

## Neon plans

|                          | Free Tier                         | Pro (usage-based)             | Custom - Enterprise or Platform Partnership (volume-based)|
|:-------------------------|:----------------------------------|:-----------------|:--------------------------|
|**Best for**              | Prototyping and personal projects       | Small to medium teams, setups with 1 to 3 active databases  | Medium to large teams, Database fleets, Resale |
|**Projects**              | 1                                 | 20               | Unlimited                 |
|**Branches**              | 10                                 | Unlimited               | Unlimited                 |
|**Compute active time per month** | 100 hours*                 | Unlimited        | Unlimited                 |
|**Compute size**          | 1 Shared vCPU with 1 GB RAM   | Up to 7 vCPUs, each with 4 GB RAM     | Custom           |
|**Storage**               | 3 GB per branch                   | Unlimited*        | Unlimited                 |
|**Dedicated resources**   | -                            | -           | &check;                   |
|**Project sharing**       | -                            | &check;          | &check;                   |
|**Auto-suspend compute**  | &check;                           | &check;          | &check;                   |
|**Configurable auto-suspend compute (coming soon)**  | -                           | &check;          | &check;                   |
|**Autoscaling (coming soon)**     | -                            | &check;          | &check;                   |
|**Payment**               | Free                              | Credit Card, Pay As You Go with monthly invoicing | Prepaid, Custom Contract, Volume Discounts |
|**Support**               | Community, support tickets                 | Community, support tickets, video chat          | Community, support tickets, video chat, resale customer support                   |

**Notes:**

- The limits described above are plan defaults. If you want to adjust the limits to tailor a plan to your specific requirements, please contact [Sales](https://neon.tech/contact-sales).
- The Pro plan has a 200 GB safety limit on storage to protect your account from unintended usage but supports any data size. To increase the safety limit for your Pro account, simply submit a [Sales](https://neon.tech/contact-sales) request with the data storage size that you require.
- The Free Tier has a 100 hour _compute active time per month_ limit, but you are always able to connect to the compute endpoint assigned to the primary branch of your Neon project, which ensures that access to data on the primary branch of your project is never interrupted.

## Account billing page

A Neon account subscribed to a paid plan has access to a **Billing** page in the Neon Console, where you can:

- View your current billing total for the month-to-date, including a cost breakdown by [billing metric](#neon-billing-metrics).
- Update your payment details
- Download invoices

To access your **Billing** page:

1. Navigate to the Neon Console.
1. Select **Billing** from the sidebar.

## Neon invoices

A Neon invoice includes an **Amount due** for the billing period and a cost breakdown by [billing metric](#neon-billing-metrics).

### Download invoices

You can download invoices from the **Billing** page.

1. Navigate to the **Billing** page in the Neon Console.
1. Under **Latest invoices**, locate the invoice you want to download and click the PDF download icon.

## Cancel a subscription

To cancel a Pro plan subscription:

1. Navigate to the **Billing** page in the Neon Console.
1. Click **Request subscription cancellation** at the bottom of the page.
1. Enter your cancellation request into the **Unsubscribe** dialog and click **Send**.

The request is sent to the Neon Support team, who will respond to you with a request confirmation.

Canceling a subscription to the Pro plan downgrades your account to the Neon Free Tier. The Neon Support team will ask you to remove any projects or storage that exceed [Neon's Free Tier limits](/docs/introduction/technical-preview-free-tier). The subscription cancellation goes into effect at the beginning of the next billing period (the start of the month following the cancellation request).

If usage is not reduced in accordance with Neon's Free tier limits, Neon suspends projects and branches other than those it determines to be the most active. After 60 days, Neon reserves the right to remove any project or storage that exceeds Neon's Free Tier limits.

Cancellation of Enterprise, Platform Partnership, or other customized plans are handled in accordance with the Master Subscription Agreement (MSA) outlined in the customer agreement.

## Billing and usage metrics explained

This section provides a detailed explanation of Neon's billing and usage metrics and how they are calculated. Billing in Neon is account-based. For the billing rate for each metric, see [Billing rates](#billing-rates).

<Admonition type="note">
The **Project storage**, **Written data**, and **Data transfer** billing metrics are calculated in gibibytes (GiB), otherwise known as binary gigabytes. One gibibyte equals 2<sup>30</sup> or 1,073,741,824 bytes.
</Admonition>

### Compute time

The _Compute time_ metric measures the amount of computing capacity used within a given time period. Neon takes a measure of compute utilization every five seconds, which is averaged based on the observed computing capacity. Computing capacity is based on _Compute Units (CU)_. A CU in Neon is 1 vCPU and 4 GB of RAM. A Neon [compute endpoint](/docs/reference/glossary/#compute-endpoint) can have anywhere from .25 to 7 CUs. A connection from a client or application activates a compute endpoint and its CUs. Activity on the connection keeps the compute endpoint and its CUs in an `Active` state. A defined period of inactivity places the compute endpoint and its CUs into an `Idle` state.

Factors that affect the amount of compute time include:

- The number of active compute endpoints
- The number of CUs per compute endpoint
- Neon's _Auto-suspend compute_ feature, which suspends a compute endpoint (and its CUs) after a period of inactivity. The current default is five minutes.
- Neon's _Configurable auto-suspend compute_ feature, which allows you to disable or configure the timeout period for the _Auto-suspend compute_ feature (_coming soon_).
- Neon's _Autoscaling_ feature, which allows you to set a minimum and maximum number of CUs for each compute endpoint. The number of active CUs scale up and down based on workload (_coming soon_).

<Admonition type="note">
Neon uses a small amount of compute time, included in your billed amount, to perform a periodic check to ensure that your computes can start and read and write data.
</Admonition>

The cost calculation for _Compute time_ is as follows:

```text
compute units * active time (hours) * price per hour
```

### Project storage

The _Project storage_ metric measures the amount of data and history stored in your Neon projects. Project storage includes:

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

The _Written data_ metric measures the amount of data changes written from compute to storage to ensure the durability of your data.

The cost calculation for _Written data_ is as follows:

```text
written data (GiB) * price per GiB
```

### Data transfer

The _Data transfer_ metric counts the amount of data transferred out of Neon (egress). Neon charges for each GiB of data transfer at the egress cost set by the cloud provider. Contact [Sales](https://neon.tech/contact-sales) for custom solutions to minimize data transfer costs.

The cost calculation for _Data transfer_ is as follows:

```text
data transfer (GiB) * price per GiB
```

## Billing rates

| Cloud provider | Region      | Billing metric | Price | Unit |
|:---------------|:-----------|:--------------|:------|:-----|
| AWS            | US East (Ohio)     | Compute time  | $0.10200 | Compute-hour |
| AWS            | US East (Ohio)     | Project storage  | $0.000164 | GiB-Hour |
| AWS            | US East (Ohio)  | Written data  | $0.09600 | GiB |
| AWS            | US East (Ohio)| Data transfer  | $0.09000 | GiB |
|                |             |                |       |      |
| AWS            | US West (Oregon)     | Compute time  | $0.10200 | Compute-hour |
| AWS            | US West (Oregon)| Project storage | $0.000164 | GiB-hour |
| AWS            | US West (Oregon)     | Written data  | $0.09600 | GiB |
| AWS            | US West (Oregon)  | Data transfer  | $0.09000 | GiB |
|                |             |                |       |      |
| AWS            | Europe (Frankfurt)| Compute time| $0.11800 | Compute-hour |
| AWS            | Europe (Frankfurt)| Project storage  | $0.00018 | GiB-hour |
| AWS            | Europe (Frankfurt)     | Written data    | $0.09600 | GiB |
| AWS            | Europe (Frankfurt)     | Data transfer    | $0.09000 | GiB |
|                |             |                |       |      |
| AWS            | Asia Pacific (Singapore)| Compute time    | $0.12100 | Compute-hour |
| AWS            | Asia Pacific (Singapore)  | Project storage    | $0.00018 | GiB-hour |
| AWS            | Asia Pacific (Singapore)| Written data  | $0.09600 | GiB |
| AWS            | Asia Pacific (Singapore)| Data transfer  | $0.09000 | GiB |

## Support

Support channels for the Neon Free Tier and paid plans are outlined below.

| Support channels                           | Free Tier           | Pro           | Custom         |
| :----------------------------------------- | :------------------:| :-----------: | :------------: |
| [Neon Community Forum](https://community.neon.tech/) | &check;   | &check;       | &check;        |
| Ability to submit support tickets          | &check;             | &check;       | &check;        |
| Video chat                                 | -                   | &check;       | &check;        |
| Resale customer support                    | -                   | -             | &check;        |

<Admonition type="note">
Pro plan users that submit support tickets through Neon's console can expect an initial response time of 2 business days, from 6am to 6pm Pacific Standard Time (UTC -8), Monday through Friday, excluding public holidays in the United States.

Free Tier users are not guaranteed a specific response time. For custom solutions, please contact [Sales](https://neon.tech/contact-sales).  
</Admonition>
