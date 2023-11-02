## ALTER SUBSCRIPTION

ALTER SUBSCRIPTION — change the definition of a subscription

## Synopsis

```

ALTER SUBSCRIPTION name CONNECTION 'conninfo'
ALTER SUBSCRIPTION name SET PUBLICATION publication_name [, ...] [ WITH ( publication_option [= value] [, ... ] ) ]
ALTER SUBSCRIPTION name ADD PUBLICATION publication_name [, ...] [ WITH ( publication_option [= value] [, ... ] ) ]
ALTER SUBSCRIPTION name DROP PUBLICATION publication_name [, ...] [ WITH ( publication_option [= value] [, ... ] ) ]
ALTER SUBSCRIPTION name REFRESH PUBLICATION [ WITH ( refresh_option [= value] [, ... ] ) ]
ALTER SUBSCRIPTION name ENABLE
ALTER SUBSCRIPTION name DISABLE
ALTER SUBSCRIPTION name SET ( subscription_parameter [= value] [, ... ] )
ALTER SUBSCRIPTION name SKIP ( skip_option = value )
ALTER SUBSCRIPTION name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER SUBSCRIPTION name RENAME TO new_name
```

## Description

`ALTER SUBSCRIPTION` can change most of the subscription properties that can be specified in [CREATE SUBSCRIPTION](sql-createsubscription.html "CREATE SUBSCRIPTION").

You must own the subscription to use `ALTER SUBSCRIPTION`. To rename a subscription or alter the owner, you must have `CREATE` permission on the database. In addition, to alter the owner, you must be able to `SET ROLE` to the new owning role. If the subscription has `password_required=false`, only superusers can modify it.

When refreshing a publication we remove the relations that are no longer part of the publication and we also remove the table synchronization slots if there are any. It is necessary to remove these slots so that the resources allocated for the subscription on the remote host are released. If due to network breakdown or some other error, PostgreSQL is unable to remove the slots, an error will be reported. To proceed in this situation, the user either needs to retry the operation or disassociate the slot from the subscription and drop the subscription as explained in [DROP SUBSCRIPTION](sql-dropsubscription.html "DROP SUBSCRIPTION").

Commands `ALTER SUBSCRIPTION ... REFRESH PUBLICATION` and `ALTER SUBSCRIPTION ... {SET|ADD|DROP} PUBLICATION ...` with `refresh` option as `true` cannot be executed inside a transaction block. These commands also cannot be executed when the subscription has [`two_phase`](sql-createsubscription.html#SQL-CREATESUBSCRIPTION-WITH-TWO-PHASE) commit enabled, unless [`copy_data`](sql-createsubscription.html#SQL-CREATESUBSCRIPTION-WITH-COPY-DATA) is `false`. See column `subtwophasestate` of [`pg_subscription`](catalog-pg-subscription.html "53.54. pg_subscription") to know the actual two-phase state.

## Parameters

* *`name`* [#](#SQL-ALTERSUBSCRIPTION-PARAMS-NAME)

    The name of a subscription whose properties are to be altered.

* `CONNECTION 'conninfo'` [#](#SQL-ALTERSUBSCRIPTION-PARAMS-CONNECTION)

    This clause replaces the connection string originally set by [CREATE SUBSCRIPTION](sql-createsubscription.html "CREATE SUBSCRIPTION"). See there for more information.

* `SET PUBLICATION publication_name``ADD PUBLICATION publication_name``DROP PUBLICATION publication_name` [#](#SQL-ALTERSUBSCRIPTION-PARAMS-SETADDDROP-PUBLICATION)

    These forms change the list of subscribed publications. `SET` replaces the entire list of publications with a new list, `ADD` adds additional publications to the list of publications, and `DROP` removes the publications from the list of publications. We allow non-existent publications to be specified in `ADD` and `SET` variants so that users can add those later. See [CREATE SUBSCRIPTION](sql-createsubscription.html "CREATE SUBSCRIPTION") for more information. By default, this command will also act like `REFRESH PUBLICATION`.

    *`publication_option`* specifies additional options for this operation. The supported options are:

  * `refresh` (`boolean`)

        When false, the command will not try to refresh table information. `REFRESH PUBLICATION` should then be executed separately. The default is `true`.

    Additionally, the options described under `REFRESH PUBLICATION` may be specified, to control the implicit refresh operation.

* `REFRESH PUBLICATION` [#](#SQL-ALTERSUBSCRIPTION-PARAMS-REFRESH-PUBLICATION)

    Fetch missing table information from publisher. This will start replication of tables that were added to the subscribed-to publications since [`CREATE SUBSCRIPTION`](sql-createsubscription.html "CREATE SUBSCRIPTION") or the last invocation of `REFRESH PUBLICATION`.

    *`refresh_option`* specifies additional options for the refresh operation. The supported options are:

  * `copy_data` (`boolean`)

        Specifies whether to copy pre-existing data in the publications that are being subscribed to when the replication starts. The default is `true`.

        Previously subscribed tables are not copied, even if a table's row filter `WHERE` clause has since been modified.

        See [Notes](sql-createsubscription.html#SQL-CREATESUBSCRIPTION-NOTES "Notes") for details of how `copy_data = true` can interact with the [`origin`](sql-createsubscription.html#SQL-CREATESUBSCRIPTION-WITH-ORIGIN) parameter.

        See the [`binary`](sql-createsubscription.html#SQL-CREATESUBSCRIPTION-WITH-BINARY) parameter of `CREATE SUBSCRIPTION` for details about copying pre-existing data in binary format.

* `ENABLE` [#](#SQL-ALTERSUBSCRIPTION-PARAMS-ENABLE)

    Enables a previously disabled subscription, starting the logical replication worker at the end of the transaction.

* `DISABLE` [#](#SQL-ALTERSUBSCRIPTION-PARAMS-DISABLE)

    Disables a running subscription, stopping the logical replication worker at the end of the transaction.

* `SET ( subscription_parameter [= value] [, ... ] )` [#](#SQL-ALTERSUBSCRIPTION-PARAMS-SET)

    This clause alters parameters originally set by [CREATE SUBSCRIPTION](sql-createsubscription.html "CREATE SUBSCRIPTION"). See there for more information. The parameters that can be altered are [`slot_name`](sql-createsubscription.html#SQL-CREATESUBSCRIPTION-WITH-SLOT-NAME), [`synchronous_commit`](sql-createsubscription.html#SQL-CREATESUBSCRIPTION-WITH-SYNCHRONOUS-COMMIT), [`binary`](sql-createsubscription.html#SQL-CREATESUBSCRIPTION-WITH-BINARY), [`streaming`](sql-createsubscription.html#SQL-CREATESUBSCRIPTION-WITH-STREAMING), [`disable_on_error`](sql-createsubscription.html#SQL-CREATESUBSCRIPTION-WITH-DISABLE-ON-ERROR), [`password_required`](sql-createsubscription.html#SQL-CREATESUBSCRIPTION-WITH-PASSWORD-REQUIRED), [`run_as_owner`](sql-createsubscription.html#SQL-CREATESUBSCRIPTION-WITH-RUN-AS-OWNER), and [`origin`](sql-createsubscription.html#SQL-CREATESUBSCRIPTION-WITH-ORIGIN). Only a superuser can set `password_required = false`.

* `SKIP ( skip_option = value )` [#](#SQL-ALTERSUBSCRIPTION-PARAMS-SKIP)

    Skips applying all changes of the remote transaction. If incoming data violates any constraints, logical replication will stop until it is resolved. By using the `ALTER SUBSCRIPTION ... SKIP` command, the logical replication worker skips all data modification changes within the transaction. This option has no effect on the transactions that are already prepared by enabling [`two_phase`](sql-createsubscription.html#SQL-CREATESUBSCRIPTION-WITH-TWO-PHASE) on the subscriber. After the logical replication worker successfully skips the transaction or finishes a transaction, the LSN (stored in `pg_subscription`.`subskiplsn`) is cleared. See [Section 31.5](logical-replication-conflicts.html "31.5. Conflicts") for the details of logical replication conflicts.

    *`skip_option`* specifies options for this operation. The supported option is:

  * `lsn` (`pg_lsn`)

        Specifies the finish LSN of the remote transaction whose changes are to be skipped by the logical replication worker. The finish LSN is the LSN at which the transaction is either committed or prepared. Skipping individual subtransactions is not supported. Setting `NONE` resets the LSN.

* *`new_owner`* [#](#SQL-ALTERSUBSCRIPTION-PARAMS-NEW-OWNER)

    The user name of the new owner of the subscription.

* *`new_name`* [#](#SQL-ALTERSUBSCRIPTION-PARAMS-NEW-NAME)

    The new name for the subscription.

When specifying a parameter of type `boolean`, the `=` *`value`* part can be omitted, which is equivalent to specifying `TRUE`.

## Examples

Change the publication subscribed by a subscription to `insert_only`:

```

ALTER SUBSCRIPTION mysub SET PUBLICATION insert_only;
```

Disable (stop) the subscription:

```

ALTER SUBSCRIPTION mysub DISABLE;
```

## Compatibility

`ALTER SUBSCRIPTION` is a PostgreSQL extension.

## See Also

[CREATE SUBSCRIPTION](sql-createsubscription.html "CREATE SUBSCRIPTION"), [DROP SUBSCRIPTION](sql-dropsubscription.html "DROP SUBSCRIPTION"), [CREATE PUBLICATION](sql-createpublication.html "CREATE PUBLICATION"), [ALTER PUBLICATION](sql-alterpublication.html "ALTER PUBLICATION")