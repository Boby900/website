## DISCARD

DISCARD — discard session state

## Synopsis

```

DISCARD { ALL | PLANS | SEQUENCES | TEMPORARY | TEMP }
```

## Description

`DISCARD` releases internal resources associated with a database session. This command is useful for partially or fully resetting the session's state. There are several subcommands to release different types of resources; the `DISCARD ALL` variant subsumes all the others, and also resets additional state.

## Parameters

* `PLANS`

    Releases all cached query plans, forcing re-planning to occur the next time the associated prepared statement is used.

* `SEQUENCES`

    Discards all cached sequence-related state, including `currval()`/`lastval()` information and any preallocated sequence values that have not yet been returned by `nextval()`. (See [CREATE SEQUENCE](sql-createsequence.html "CREATE SEQUENCE") for a description of preallocated sequence values.)

* `TEMPORARY` or `TEMP`

    Drops all temporary tables created in the current session.

* `ALL`

    Releases all temporary resources associated with the current session and resets the session to its initial state. Currently, this has the same effect as executing the following sequence of statements:

    ```

    CLOSE ALL;
    SET SESSION AUTHORIZATION DEFAULT;
    RESET ALL;
    DEALLOCATE ALL;
    UNLISTEN *;
    SELECT pg_advisory_unlock_all();
    DISCARD PLANS;
    DISCARD TEMP;
    DISCARD SEQUENCES;
    ```

## Notes

`DISCARD ALL` cannot be executed inside a transaction block.

## Compatibility

`DISCARD` is a PostgreSQL extension.