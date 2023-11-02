## pg\_controldata

pg\_controldata — display control information of a PostgreSQL database cluster

## Synopsis

`pg_controldata` \[*`option`*] \[\[ `-D` | `--pgdata` ]*`datadir`*]

## Description

`pg_controldata` prints information initialized during `initdb`, such as the catalog version. It also shows information about write-ahead logging and checkpoint processing. This information is cluster-wide, and not specific to any one database.

This utility can only be run by the user who initialized the cluster because it requires read access to the data directory. You can specify the data directory on the command line, or use the environment variable `PGDATA`. This utility supports the options `-V` and `--version`, which print the pg\_controldata version and exit. It also supports options `-?` and `--help`, which output the supported arguments.

## Environment

* `PGDATA`

    Default data directory location

* `PG_COLOR`

    Specifies whether to use color in diagnostic messages. Possible values are `always`, `auto` and `never`.