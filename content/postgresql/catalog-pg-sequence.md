## 53.47. `pg_sequence` [#](#CATALOG-PG-SEQUENCE)

The catalog `pg_sequence` contains information about sequences. Some of the information about sequences, such as the name and the schema, is in [`pg_class`](catalog-pg-class.html "53.11. pg_class")

**Table 53.47. `pg_sequence` Columns**

| Column TypeDescription                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `seqrelid` `oid` (references [`pg_class`](catalog-pg-class.html "53.11. pg_class").`oid`)The OID of the [`pg_class`](catalog-pg-class.html "53.11. pg_class") entry for this sequence |
| `seqtypid` `oid` (references [`pg_type`](catalog-pg-type.html "53.64. pg_type").`oid`)Data type of the sequence                                                                       |
| `seqstart` `int8`Start value of the sequence                                                                                                                                          |
| `seqincrement` `int8`Increment value of the sequence                                                                                                                                  |
| `seqmax` `int8`Maximum value of the sequence                                                                                                                                          |
| `seqmin` `int8`Minimum value of the sequence                                                                                                                                          |
| `seqcache` `int8`Cache size of the sequence                                                                                                                                           |
| `seqcycle` `bool`Whether the sequence cycles                                                                                                                                          |