## Chapter 27. High Availability, Load Balancing, and Replication

**Table of Contents**

  * *   [27.1. Comparison of Different Solutions](different-replication-solutions.html)
  * [27.2. Log-Shipping Standby Servers](warm-standby.html)

    

  * *   [27.2.1. Planning](warm-standby.html#STANDBY-PLANNING)
    * [27.2.2. Standby Server Operation](warm-standby.html#STANDBY-SERVER-OPERATION)
    * [27.2.3. Preparing the Primary for Standby Servers](warm-standby.html#PREPARING-PRIMARY-FOR-STANDBY)
    * [27.2.4. Setting Up a Standby Server](warm-standby.html#STANDBY-SERVER-SETUP)
    * [27.2.5. Streaming Replication](warm-standby.html#STREAMING-REPLICATION)
    * [27.2.6. Replication Slots](warm-standby.html#STREAMING-REPLICATION-SLOTS)
    * [27.2.7. Cascading Replication](warm-standby.html#CASCADING-REPLICATION)
    * [27.2.8. Synchronous Replication](warm-standby.html#SYNCHRONOUS-REPLICATION)
    * [27.2.9. Continuous Archiving in Standby](warm-standby.html#CONTINUOUS-ARCHIVING-IN-STANDBY)

  * *   [27.3. Failover](warm-standby-failover.html)
  * [27.4. Hot Standby](hot-standby.html)

    

  * *   [27.4.1. User's Overview](hot-standby.html#HOT-STANDBY-USERS)
    * [27.4.2. Handling Query Conflicts](hot-standby.html#HOT-STANDBY-CONFLICT)
    * [27.4.3. Administrator's Overview](hot-standby.html#HOT-STANDBY-ADMIN)
    * [27.4.4. Hot Standby Parameter Reference](hot-standby.html#HOT-STANDBY-PARAMETERS)
    * [27.4.5. Caveats](hot-standby.html#HOT-STANDBY-CAVEATS)

Database servers can work together to allow a second server to take over quickly if the primary server fails (high availability), or to allow several computers to serve the same data (load balancing). Ideally, database servers could work together seamlessly. Web servers serving static web pages can be combined quite easily by merely load-balancing web requests to multiple machines. In fact, read-only database servers can be combined relatively easily too. Unfortunately, most database servers have a read/write mix of requests, and read/write servers are much harder to combine. This is because though read-only data needs to be placed on each server only once, a write to any server has to be propagated to all servers so that future read requests to those servers return consistent results.

This synchronization problem is the fundamental difficulty for servers working together. Because there is no single solution that eliminates the impact of the sync problem for all use cases, there are multiple solutions. Each solution addresses this problem in a different way, and minimizes its impact for a specific workload.

Some solutions deal with synchronization by allowing only one server to modify the data. Servers that can modify data are called read/write, *master* or *primary* servers. Servers that track changes in the primary are called *standby* or *secondary* servers. A standby server that cannot be connected to until it is promoted to a primary server is called a *warm standby* server, and one that can accept connections and serves read-only queries is called a *hot standby* server.

Some solutions are synchronous, meaning that a data-modifying transaction is not considered committed until all servers have committed the transaction. This guarantees that a failover will not lose any data and that all load-balanced servers will return consistent results no matter which server is queried. In contrast, asynchronous solutions allow some delay between the time of a commit and its propagation to the other servers, opening the possibility that some transactions might be lost in the switch to a backup server, and that load balanced servers might return slightly stale results. Asynchronous communication is used when synchronous would be too slow.

Solutions can also be categorized by their granularity. Some solutions can deal only with an entire database server, while others allow control at the per-table or per-database level.

Performance must be considered in any choice. There is usually a trade-off between functionality and performance. For example, a fully synchronous solution over a slow network might cut performance by more than half, while an asynchronous one might have a minimal performance impact.

The remainder of this section outlines various failover, replication, and load balancing solutions.