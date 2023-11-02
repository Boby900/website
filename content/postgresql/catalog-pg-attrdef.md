## 53.6. `pg_attrdef` [#](#CATALOG-PG-ATTRDEF)

The catalog `pg_attrdef` stores column default values. The main information about columns is stored in [`pg_attribute`](catalog-pg-attribute.html "53.7. pg_attribute"). Only columns for which a default value has been explicitly set will have an entry here.

**Table 53.6. `pg_attrdef` Columns**

| Column TypeDescription                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `oid` `oid`Row identifier                                                                                                                                 |
| `adrelid` `oid` (references [`pg_class`](catalog-pg-class.html "53.11. pg_class").`oid`)The table this column belongs to                                  |
| `adnum` `int2` (references [`pg_attribute`](catalog-pg-attribute.html "53.7. pg_attribute").`attnum`)The number of the column                             |
| `adbin` `pg_node_tree`The column default value, in `nodeToString()` representation. Use `pg_get_expr(adbin, adrelid)` to convert it to an SQL expression. |