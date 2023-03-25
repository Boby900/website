---
title: Supported PostgreSQL Extensions
enableTableOfContents: true
---

Neon supports the PostgreSQL extensions shown in the following table. For extension documentation, select the extension version.

<a id="default-extensions/"></a>

| Extension                | Extension Version (PostgreSQL 14)                               | Extension Version (PostgreSQL 15)                                |Note                                                                                                                |
| :------------------------| --------------------------------------------------------------: | ----------------------------------------------------------------:| :------------------------------------------------------------------------------------------------------------------|
| address_standardizer     | [3.3.2](https://postgis.net/docs/Extras.html#Address_Standardizer)  | [3.3.2](https://postgis.net/docs/Extras.html#Address_Standardizer)  |                                                                                                             |
| address_standardizer_data_us     | [3.3.2](https://postgis.net/docs/Extras.html#Address_Standardizer)        | [3.3.2](https://postgis.net/docs/Extras.html#Address_Standardizer) |                                                                                                |
| bloom                    | [1.0](https://www.postgresql.org/docs/14/bloom.html)            | [1.0](https://www.postgresql.org/docs/15/bloom.html)             |                                                                                                                    |
| autoinc (spi)            | [1.0](https://www.postgresql.org/docs/current/contrib-spi.html) | [1.0](https://www.postgresql.org/docs/current/contrib-spi.html)  |                                                                                                                    |
| btree_gin                | [1.3](https://www.postgresql.org/docs/14/btree-gin.html)        | [1.3](https://www.postgresql.org/docs/15/btree-gin.html)         |                                                                                                                    |
| btree_gist               | [1.6](https://www.postgresql.org/docs/14/btree-gist.html)       | [1.7](https://www.postgresql.org/docs/15/btree-gist.html)        |                                                                                                                    |
| citext                   | [1.6](https://www.postgresql.org/docs/14/citext.html)           | [1.6](https://www.postgresql.org/docs/15/citext.html)            |                                                                                                                    |
| cube                     | [1.5](https://www.postgresql.org/docs/14/cube.html)             | [1.5](https://www.postgresql.org/docs/15/cube.html)              |                                                                                                                    |
| dict_int                 | [1.0](https://www.postgresql.org/docs/14/dict-int.html)         | [1.0](https://www.postgresql.org/docs/15/dict-int.html)          |                                                                                                                    |
| earthdistance            | [1.1](https://www.postgresql.org/docs/14/earthdistance.html)    | [1.1](https://www.postgresql.org/docs/15/earthdistance.html)     |                                                                                                                    |
| fuzzystrmatch            | [1.1](https://www.postgresql.org/docs/14/fuzzystrmatch.html)    | [1.1](https://www.postgresql.org/docs/15/fuzzystrmatch.html)     |                                                                                                                    |
| h3_pg                    | [4.1.2](https://github.com/zachasme/h3-pg/blob/main/docs/api.md)| [4.1.2](https://github.com/zachasme/h3-pg/blob/main/docs/api.md) |                                                                                                                    |
| hll                      | [2.16](https://github.com/citusdata/postgresql-hll)             | [2.16](https://github.com/citusdata/postgresql-hll)              |                                                                                                                    |
| hstore                   | [1.8](https://www.postgresql.org/docs/14/hstore.html)           | [1.8](https://www.postgresql.org/docs/15/hstore.html)            |                                                                                                                    |
| hypopg                   | [1.3.1](https://hypopg.readthedocs.io/en/rel1_stable/)          | [1.3.1](https://hypopg.readthedocs.io/en/rel1_stable/)           |                                                                                                                    |
| insert_username (spi)    | [1.0](https://www.postgresql.org/docs/current/contrib-spi.html) | [1.0](https://www.postgresql.org/docs/current/contrib-spi.html)  |                                                                                                                    |
| intagg                   | [1.1](https://www.postgresql.org/docs/14/intagg.html)           | [1.1](https://www.postgresql.org/docs/15/intagg.html)            |                                                                                                                    |
| intarray                 | [1.5](https://www.postgresql.org/docs/14/intarray.html)         | [1.5](https://www.postgresql.org/docs/15/intarray.html)          |                                                                                                                    |
| isn                      | [1.2](https://www.postgresql.org/docs/14/isn.html)              | [1.2](https://www.postgresql.org/docs/15/isn.html)               |                                                                                                                    |
| lo                       | [1.1](https://www.postgresql.org/docs/14/lo.html)               | [1.1](https://www.postgresql.org/docs/15/lo.html)                |                                                                                                                    |
| ltree                    | [1.2](https://www.postgresql.org/docs/14/ltree.html)            | [1.2](https://www.postgresql.org/docs/15/ltree.html)             |                                                                                                                    |
| moddattime (spi)         | [1.0](https://www.postgresql.org/docs/current/contrib-spi.html) | [1.0](https://www.postgresql.org/docs/current/contrib-spi.html)  |                                                                                                                    |
| pg_graphql               | [1.1.0](https://github.com/supabase/pg_graphql)                 | [1.1.0](https://github.com/supabase/pg_graphql)                  |                                                                                                                    |
| pg_jsonschema            | [1.1.0](https://github.com/supabase/pg_jsonschema)              | [1.1.0](https://github.com/supabase/pg_jsonschema)               |                                                                                                                    |
| pg_hashids               | [1.2.1](https://github.com/iCyberon/pg_hashids)                 | [1.2.1](https://github.com/iCyberon/pg_hashids)                  |                                                                                                                    |
| pg_prewarm               | [1.2](https://www.postgresql.org/docs/14/pgprewarm.html)        | [1.2](https://www.postgresql.org/docs/15/pgprewarm.html)         |                                                                                                                    |
| pg_tiktoken              | [0.0.1](https://github.com/kelvich/pg_tiktoken)                 | [0.0.1](https://github.com/kelvich/pg_tiktoken)         |                                                                                                                    |
| pg_trgm                  | [1.6](https://www.postgresql.org/docs/14/pgtrgm.html)           | [1.6](https://www.postgresql.org/docs/15/pgtrgm.html)            |                                                                                                                    |
| pgcrypto                 | [1.3](https://www.postgresql.org/docs/14/pgcrypto.html)         | [1.3](https://www.postgresql.org/docs/15/pgcrypto.html)          |                                                                                                                    |
| pgjwt                    | [0.2.0](https://github.com/michelp/pgjwt)                       | [0.2.0](https://github.com/michelp/pgjwt)                        |                                                                                                                    |
| pgrouting                | [3.1.4](https://docs.pgrouting.org/3.1/en/index.html)           | [3.1.4](https://docs.pgrouting.org/3.1/en/index.html)            | The PostGIS extension must be installed first.
| pgrowlocks               | [1.2](https://www.postgresql.org/docs/14/pgrowlocks.html)       | [1.2](https://www.postgresql.org/docs/15/pgrowlocks.html)        |                                                                                                                    |
| pgstattuple              | [1.5](https://www.postgresql.org/docs/14/pgstattuple.html)      | [1.5](https://www.postgresql.org/docs/15/pgstattuple.html)       |                                                                                                                    |
| pgTAP                    | [1.2.1](https://pgtap.org/documentation.html)                   | [1.2.1](https://pgtap.org/documentation.html)       |                                                                                                                    |
| pgvector                 | [0.4.0](https://github.com/pgvector/pgvector)                   | [0.4.0](https://github.com/pgvector/pgvector)                    |                                                                                                                    |
| plcoffee                 | [3.1.5](https://github.com/plv8/plv8/)                          | [3.1.5](https://github.com/plv8/plv8/)                           |                                                                                                                    |
| plls                     | [3.1.5](https://github.com/plv8/plv8/)                          | [3.1.5](https://github.com/plv8/plv8/)                           |                                                                                                                    |  
| plpgsql                  | [1.0](https://www.postgresql.org/docs/14/plpgsql.html)          | [1.0](https://www.postgresql.org/docs/15/plpgsql.html)           | Pre-installed with PostgreSQL.                                                                                     |
| plpgsql_check            | [2.3](https://pgxn.org/dist/plpgsql_check/)                     | [2.3](https://pgxn.org/dist/plpgsql_check/)                      |                                                                                      |
| plv8                     | [3.1.5](https://plv8.github.io/)                                | [3.1.5](https://plv8.github.io/)                                 |                                                                                                                    |
| postgis                  | [3.3.2](https://postgis.net/)                                   | [3.3.2](https://postgis.net/)                                    |                                                                                                                    |
| postgis_raster           | [3.3.2](https://postgis.net/docs/RT_reference.html)             | [3.3.2](https://postgis.net/docs/RT_reference.html)              |                                                                                                                    |
| postgis_tiger_geocoder   | [3.3.2](https://postgis.net/docs/Extras.html#Tiger_Geocoder)    | [3.3.2](https://postgis.net/docs/Extras.html#Tiger_Geocoder)     | Cannot be installed using the Neon SQL Editor. Use your `psql` user credentials to install this extension.         |
| postgis_topology         | [3.3.2](https://www.postgis.net/docs/Topology.html)             | [3.3.2](https://www.postgis.net/docs/Topology.html)              |                                                                                                                    |
| postgis_sfcgal           | [1.3.10](https://oslandia.gitlab.io/SFCGAL/)                    | [1.3.10](https://oslandia.gitlab.io/SFCGAL/)                     |                                                                                                                    |
| prefix                   | [1.2.0](https://github.com/dimitri/prefix)                      | [1.2.0](https://github.com/dimitri/prefix)                       |                                                                                                                    |
| refint (spi)             | [1.0](https://www.postgresql.org/docs/current/contrib-spi.html) | [1.0](https://www.postgresql.org/docs/current/contrib-spi.html)  |                                                                                                                    |
| rum                      | [9.6](https://postgrespro.com/docs/enterprise/9.6/rum)          | [9.6](https://postgrespro.com/docs/enterprise/9.6/rum)           |                                                                                                                    |
| seg                      | [1.4](https://www.postgresql.org/docs/14/seg.html)              | [1.4](https://www.postgresql.org/docs/15/seg.html)               |                                                                                                                    |
| tablefunc                | [1.0](https://www.postgresql.org/docs/14/tablefunc.html)        | [1.0](https://www.postgresql.org/docs/15/tablefunc.html)         |                                                                                                                    |
| tcn                      | [1.0](https://www.postgresql.org/docs/14/tcn.html)              | [1.0](https://www.postgresql.org/docs/15/tcn.html)               |                                                                                                                    |
| tsm_system_rows          | [1.0](https://www.postgresql.org/docs/14/tsm-system-rows.html)  | [1.0](https://www.postgresql.org/docs/15/tsm-system-rows.html)   |                                                                                                                    |
| tsm_system_time          | [1.0](https://www.postgresql.org/docs/14/tsm-system-time.html)  | [1.0](https://www.postgresql.org/docs/15/tsm-system-time.html)   |                                                                                                                    |
| unaccent                 | [1.1](https://www.postgresql.org/docs/14/unaccent.html)         | [1.1](https://www.postgresql.org/docs/15/unaccent.html)          |                                                                                                                    |
| unit                     | [7.7](https://github.com/df7cb/postgresql-unit)                 | [7.7](https://github.com/df7cb/postgresql-unit)                  |                                                                                                                    |
| uuid-ossp                | [1.1](https://www.postgresql.org/docs/14/uuid-ossp.html)        | [1.1](https://www.postgresql.org/docs/15/uuid-ossp.html)         | Double-quote the extension name when installing: `CREATE EXTENSION "uuid-ossp"`                                    |
| xml2                     | [1.1](https://www.postgresql.org/docs/current/xml2.html)        | [1.1](https://www.postgresql.org/docs/current/xml2.html)         |                                                                                                                    |

## Install an extension

Unless otherwise noted, supported extensions can be installed using [CREATE EXTENSION](https://www.postgresql.org/docs/14/sql-createextension.html) syntax.

```sql
CREATE EXTENSION <extension_name>
```

You can install extensions from the Neon SQL Editor or from a client such as `psql` that permits running SQL queries. For information about using the Neon SQL Editor, see [Query with Neon's SQL Editor](/docs/get-started-with-neon/query-with-neon-sql-editor). For information about using the `psql` client with Neon, see [Connect with psql](https://neon.tech/docs/connect/query-with-psql-editor).

## Update an extension version

Neon updates supported extensions as new versions become available. Version updates are communicated in the [Release notes](/docs/release-notes). To check the current version of extensions you have installed, query the `pg_extension` table:

```bash
SELECT * FROM pg_extension;
```

You can update an extension to the latest version using `ALTER EXTENSION <extension_name> UPDATE TO <new_version>` syntax. For example:

  ```sql
  ALTER EXTENSION postgis_topology UPDATE TO '3.3.2';
  ```

## Extension support notes

- Neon supports the `uuid-ossp` extension for generating UUIDs rather than the `uuid` extension.
- The `sslinfo` extension is not supported, as Neon handles connections via a proxy that checks SSL.
- The `pg_cron` extension is not supported. Neon scales to zero when it is not being used, which means that a scheduler that runs inside the database cannot be implemented. Consider using an scheduler that runs externally instead.
- The `file_fdw` extension is not supported. Files would not remain accessible when Neon scales to zero.

## Request extension support

To request support for additional extensions, please contact us at [support@neon.tech](mailto:support@neon.tech) or post your request to the [Neon community forum](https://community.neon.tech/).

## Need help?

Send a request to [support@neon.tech](mailto:support@neon.tech), or join the [Neon community forum](https://community.neon.tech/).
