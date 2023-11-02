## 53.31. `pg_largeobject_metadata` [#](#CATALOG-PG-LARGEOBJECT-METADATA)

The catalog `pg_largeobject_metadata` holds metadata associated with large objects. The actual large object data is stored in [`pg_largeobject`](catalog-pg-largeobject.html "53.30. pg_largeobject").

**Table 53.31. `pg_largeobject_metadata` Columns**

| Column TypeDescription                                                                                               |
| -------------------------------------------------------------------------------------------------------------------- |
| `oid` `oid`Row identifier                                                                                            |
| `lomowner` `oid` (references [`pg_authid`](catalog-pg-authid.html "53.8. pg_authid").`oid`)Owner of the large object |
| `lomacl` `aclitem[]`Access privileges; see [Section 5.7](ddl-priv.html "5.7. Privileges") for details                |