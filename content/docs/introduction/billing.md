---
title: Billing metrics
enableTableOfContents: true
---

Neon [paid plans](../introduction/plans#neon-plans) bill for usage based on the following metrics:

- **Active time**: The amount of time that your computes have been active.
- **Compute time**: The amount of computing capacity used per hour.
- **Project storage**: The volume of data and history stored in your Neon project.
- **Written data**: The volume of data written from compute to storage.
- **Data transfer**: The volume of data transferred out of Neon.

The following sections provide a detailed explanation of each metric and the billing rates. Billing in Neon is account-based.

<Admonition type="note">
_Compute time_ is typically The largest contributor to cost. _Written data_ together with _Data transfer_ usually account for only about 5% of your monthly bill.

The **Project storage**, **Written data**, and **Data transfer** metrics are calculated in gibibytes (GiB), otherwise known as binary gigabytes. One gibibyte equals 2<sup>30</sup> or 1,073,741,824 bytes.
</Admonition>

## Active time

_Active time_ is the total amount of time, measured in hours, that your computes have been active within a given billing period. This includes all computes in your Neon project, but excludes time when computes are in an Idle state due to [auto-suspension](../reference/glossary#auto-suspend-compute) (scale-to-zero). _Active time_ is not a billed metric. It is a factor of the _Compute time_ metric.

## Compute time

_Compute time_ is a measure of computing capacity used within a given billing period, measured in Compute Unit (CU) hours. It is calculated by multiplying the computing capacity by _Active_time_ hours. Neon measures computing capacity at regular intervals and averages those values to calculate _Compute time_.

Computing capacity is measured in _Compute Units (CU)_. One CU has 1 vCPU and 4 GB of RAM. A Neon compute can have anywhere from .25 to 7 CUs, as outlined below:

| Compute Units | vCPU | RAM    |
|:--------------|:-----|:-------|
| .25           | .25  | 1 GB   |
| .5            | .5   | 2 GB   |
| 1             | 1    | 4 GB   |
| 2             | 2    | 8 GB   |
| 3             | 3    | 12 GB  |
| 4             | 4    | 16 GB  |
| 5             | 5    | 20 GB  |
| 6             | 6    | 24 GB  |
| 7             | 7    | 28 GB  |

A connection from a client or application activates a compute. Activity on the connection keeps the compute in an `Active` state. A defined period of inactivity (5 minutes by default) places the compute into an `Idle` state.

Factors that affect _Compute time_ include:

- The number of active computes
- The size of each compute
- The _Auto-suspend_ feature, which suspends a compute after five minutes of inactivity. Neon [Pro plan](../introduction/pro-plan) users can configure the `Auto-suspend` timeout timeout or disable _Auto-suspend_ entirely.
- The _Autoscaling_ feature, which allows you to set a minimum and maximum compute size. Computing capacity automatically scales up and down between these boundaries based on workload.

<Admonition type="note">
Neon uses a small amount of _Compute time_, included in your billed amount, to perform a periodic check to ensure that your computes can start and read and write data.
</Admonition>

The _Compute time_ cost calculation is as follows:

```text
Compute time cost = Compute Units * Active time * price per hour
```

### Compute time cost estimates

For an idea of _Compute time_ cost per month based on compute size and usage, refer to the following table:

| Compute Units (CU) | 730 hrs/mth (all hours) | 173 hrs/mth (working hours) | 87 hrs/mth (half of working hours) |
| :----------------- | :---------------------- | :-------------------------- | :--------------------------------- |
| 0.25               | $18.62                  | $4.41                       | $2.22                              |
| 0.5                | $37.23                  | $8.82                       | $4.44                              |
| 1                  | $74.46                  | $17.65                      | $8.87                              |

<Admonition type="note">
The prices in the table above are based on US East (Ohio) _Compute time_ rates.
</Admonition>

- Public-facing applications are assumed to be active for all hours in a month (730 hrs/mth).
- Internal applications with consistent usage are assumed to be active during working hours (173 hrs/mth).
- Internal applications with moderate usage are assumed to be active half of working hours (87 hrs/mth).

### Estimate your compute time cost

To estimate your own monthly _Compute time_ cost:

1. Determine the compute size you require, in Compute Units (CUs).
1. Estimate the amount of _Active time_ per month for your compute(s).
1. Find the _Compute-hour_ rate for your region. The [billing rates](#billing-rates) table shows _Compute-hour_ prices for a <sup>1</sup>&frasl;<sub>4</sub> Compute Unit (CU). The formula below multiplies that rate by 4 to get per hour cost for a full compute.
1. Input the values into the _Compute time_ cost formula:

   ```text
   Compute time cost = Compute Units * Active time * (Cost per hour for 1/4 compute * 4)
   ```

   For example, this is the calculation for .25 CU, 730 hours, and a _Compute time_ rate of $0.0255:

   ```text
   0.25 * 730 * (0.0255 * 4) = $18.62
   ```

<Admonition type="tip">
Neon also provides calculators to help with cost estimates. See [Pricing calculators](#pricing-calculators).
</Admonition>

## Project storage

_Project storage_ is the total volume of data and history stored in your Neon project, measured in gibibyte hours (GiB-hours). It includes the following:

- **Current data size**

  The size of all databases in your Neon projects. You can think of this as a _snapshot_ of your data at a point in time.

- **History**

  Neon retains a history if data changes to support _point-in-time restore_ and _database branching_.

  - _Point-in-time restore_ is the ability to restore data to an earlier point in time. Neon stores a 7-day history in the form of WAL records for a Neon project. WAL records that fall out of the 7-day window are evicted from storage and no longer count toward project storage.
  - A _database branch_ is a virtual snapshot of your data at the point of branch creation combined with WAL records that capture the branch's data change history from that point forward.
    When a branch is first created, it adds no storage. No data changes have been introduced yet, and the branch's virtual snapshot still exists in the parent branch's _history_, which means that it shares this data in common with the parent branch. A branch begins adding to storage when data changes are introduced or when the branch's virtual snapshot falls out of the parent branch's _history_, in which case the branch's data is no longer shared in common. In other words, branches add storage when you modify data or allow the branch to age out of the parent branch's _history_.

    Database branches can also share a _history_. For example, two branches created from the same parent at or around the same time share a _history_, which avoids additional storage. The same is true for a branch created from another branch. Wherever possible, Neon minimizes storage through shared history. Additionally, to keep storage to a minimum, Neon takes a new branch snapshot if the amount of data changes grows to the point that a new snapshot consumes less storage than retained WAL records.

The cost calculation for _Project storage_ is as follows:

```text
Project storage (GiB) * (seconds stored / 3600) * price per hour
```

## Written data

_Written data_ measures the total volume of data written from compute to storage within a given billing period, measured in gigibytes (GiBs). Writing data from compute to storage ensures the durability and integrity of your data, as it reflects the data changes made by your computes.

The cost calculation for _Written data_ is as follows:

```text
Written data (GiB) * price per GiB
```

## Data transfer

_Data transfer_ measures the total volume of data transferred out of Neon (known as "egress") during a given billing period, measured in gigibytes (GiBs). It includes data sent from your Neon project to external destinations. If your data transfer is high, contact [Sales](https://neon.tech/contact-sales) for custom solutions to minimize data transfer costs.

The cost calculation for _Data transfer_ is as follows:

```text
Data transfer (GiB) * price per GiB
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

\*The _Compute-hour_ price is for a <sup>1</sup>&frasl;<sub>4</sub> Compute Unit (CU), the smallest CU size offered by Neon. A <sup>1</sup>&frasl;<sub>4</sub> CU has .25 vCPU and 1 GB of RAM. Neon  supports computes with up to 7 CU (7 vCPU and 28 GB of RAM). If you require larger computes, contact [Sales](https://neon.tech/contact-sales).

## Pricing calculators

Neon provides pricing tools you can use to estimate monthly costs based on the billing metrics described above.

### Pricing calculator

The [Pricing](https://neon.tech/pricing) page on the Neon website provides a calculator that allows you to estimate monthly costs based on usage amounts that you provide.

![Pricing page calculator](/docs/introduction/pricing_page_calculator.png)

### Pro Plan Cost Estimator

The **Billing** page in the Neon Console provides a **Pro Plan Cost Estimation** tool, which estimates costs based on your current project usage. If you have ever wondered, "How much would my monthly cost be if I upgraded to the Neon Pro plan today?", this tool provides the answer. To access it, navigate to the **Billing** page via the sidebar of the Neon Console, and select **Estimate costs**.

![Pro Plan Cost Estimation tool](/docs/introduction/billing_page_calculator.png)
