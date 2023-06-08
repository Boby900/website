---
title: Import data from PostgreSQL
enableTableOfContents: true
redirectFrom:
  - /docs/cloud/tutorials
  - /docs/how-to-guides/import-an-existing-database
---

This topic describes how to import an existing PostgreSQL database to Neon. The following methods are described:

- [pg_dump with psql](#pg_dump-with-psql)
- [pg_dump with pg_restore](#pg_dump-with-pg_restore)

## Which import method should you use?

The primary determinant is the format of your dump file. The `psql` utility can only be used with plain SQL dumps, while `pg_restore` can be used with plain SQL or PostgreSQL custom format dumps.

If you prefer working with human-readable SQL scripts that can be inspected or edited using a text editor, the [pg_dump with psql](#pg_dump-with-psql) method may be your preferred option.

If you are importing a large or complex dataset, you might choose the [pg_dump with pg_restore](#pg_dump-with-pg_restore) method. The `pg_restore` utility has these advantages:

- It may be faster, particularly for large databases.
- It supports parallel restoration of data.
- It allows for greater flexibility during the restore process.

Before you begin, it is recommended that you familiarize yourself with the capabilities of the [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html), [psql](https://www.postgresql.org/docs/current/app-psql.html), and [pg_restore](https://www.postgresql.org/docs/current/app-pgrestore.html) utilities, and choose the import method that best meets your requirements.

## pg_dump with psql

This section describes using the `pg_dump` utility to dump data from an existing PostgreSQL database and import it into Neon using `psql`.

<Admonition type="note">
If you have multiple databases to import, each database must be imported separately.
</Admonition>

The example below uses the following command, which you can run from a terminal or command window where you have access to the `pg_dump` and `psql` utilities. The first connection string is for your existing PostgreSQL database. The second is for your Neon database.

```bash
pg_dump <old-connection-string> | psql <neon-connection-string>
```

A PostgreSQL connection string has the following format:

```bash
postgres://<user>:<password>@<hostname>:<port>/<dbname>
```

You must supply the connection string for your existing PostgreSQL database. You can obtain the connection string for your Neon database from the **Connection Details** widget on the Neon **Dashboard**. The connection string will look something like this:

<CodeBlock shouldWrap>

```bash
postgres://<user>:<password>@ep-polished-water-579720.us-east-2.aws.neon.tech/<dbname>
```

</CodeBlock>

where:

- `<user>` is the PostgreSQL role.
- `<password>` is the role's password.
- `ep-polished-water-579720.us-east-2.aws.neon.tech` is the hostname of the Neon PostgreSQL instance. Your hostname will differ.
- `<dbname>` is the name of the database. You can use the default `neondb` database or create your own. For instructions, see [Create a database](/docs/manage/databases#create-a-database).

<Admonition type="note">
Neon uses the default PostgreSQL port, `5432`, so it does not need to be specified explicitly in the Neon connection string.
</Admonition>

After you input the connection strings into your command, it will appear similar to the following:

<CodeBlock shouldWrap>

```bash
pg_dump postgres://<user>:<password>@<hostname>:5432/<dbname> | psql postgres://<user>:<password>@ep-polished-water-579720.us-east-2.aws.neon.tech/<dbname>
```

</CodeBlock>

Run the command in your terminal or command window to import your data.

## pg_dump with pg_restore

This section describes using the `pg_dump` utility to dump data from an existing PostgreSQL database and import it into your Neon database using `pg_restore` .

1. Start by retrieving the connection strings for the existing PostgreSQL database and your Neon database.

   You must supply the connection string for your existing PostgreSQL database. You can obtain the connection string for your Neon database from the **Connection Details** widget on the Neon **Dashboard**. The Neon connection string will look something like this:

   <CodeBlock shouldWrap>

   ```bash
   postgres://<user>:<password>@ep-polished-water-579720.us-east-2.aws.neon.tech/<dbname>
   ```

   </CodeBlock>

2. Dump the database from your existing PostgreSQL instance. You can use a `pg_dump` command similar to the following:

   <CodeBlock shouldWrap>

   ```bash
   pg_dump "postgres://<user>:<hostname>:<port>/<dbname>" --file=dumpfile.bak -Fc -Z 6 -v
   ```

   </CodeBlock>

   The example above includes some optional arguments. The `-Fc` option sends the output to a custom-format archive suitable for input into `pg_restore`. The `-Z 6` option specifies a compression level of 6 (the default). The `-v` option runs `pg_dump` in verbose mode, allowing you to monitor what happens during the dump.

   The `pg_dump` command provides many other options to modify your database dump. To learn more, refer to the [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html) documentation.

3. Load the database dump into Neon using `pg_restore`. For example:

     <CodeBlock shouldWrap>

   ```bash
   pg_restore -d postgres://[user]:[password]@[hostname]/<dbname> -Fc --single-transaction dumpfile.bak.gz -c -v
   ```

     </CodeBlock>

   The example above includes some optional arguments. The `-Fc` option sends the output a custom-format archive suitable for input into `pg_restore`. The `--single-transaction` option forces the operation to run as an atomic transaction, which ensures that no data is left behind when an import operation fails. (Retrying an import operation after a failed attempt that leaves data behind may result in "duplicate key value" errors.) The `-c` option tells the restore operation to run `clean`, meaning that it drops database objects before recreating them. The `-v` option runs `pg_dump` in verbose mode, allowing you to monitor what happens during the restore operation.

   <Admonition type="note">
   `pg_restore` also supports a `-j` option that specifies the number of concurrent jobs, which can make imports faster. This option is not used in the example above because multiple jobs cannot be used together with the `--single-transaction` option.
   </Admonition>

   The `pg_restore` command provides other options to modify your database import. To learn more, refer to the [pg_restore](https://www.postgresql.org/docs/current/app-pgrestore.html) documentation.

## Data import notes

When importing a database, be aware of the following:

- If you import a database from an archive using `pg_dump` that is not in plain-text format, you must use the `pg_restore` utility instead of `psql` to restore the database. The `psql` utility only supports plain SQL dumps.
- Currently, Neon only supports database creation via the Neon Console, so you cannot use `pg_dumpall` or `pg_dump` with the `-C` option.
- Because `pg_dump` dumps a single database, it does not include information about roles stored in the global `pg_authid` catalog. Also, Neon does not support creating roles using `psql`. You can only create roles using the Neon Console. If you do not create roles in Neon before importing a database that has roles, you will receive "role does not exist" errors during the import operation. You can ignore these errors if they occur. They do not prevent data from being imported.
- Some PostgreSQL features that require access to the local file system are not supported by Neon. For example, tablespaces and large objects are not supported. Please take this into account when importing a database into to Neon. When importing from a plain-text `.sql` script, you can specify the `--no-tablespaces` option to exclude commands that select tablespaces. The `--no-tablespaces` option is ignored when creating an archive (non-text) output file using `pg_dump`. For custom-format archive files, you can specify the `--no-tablespaces` option when you call `pg_restore`. To exclude large objects from your dump, use the `--no-blobs` option with `pg_dump`.
- You can import individual tables from a custom-format database dump using the `-t <table_name>` option with `pg_restore`. Individual tables can also be imported from a CSV file. See [Import from CSV](../import/import-from-csv).

For information about the commands referred to in this topic, refer to the following topics in the PostgreSQL documentation:

- [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html)
- [pg_restore](https://www.postgresql.org/docs/current/app-pgrestore.html)
- [psql](https://www.postgresql.org/docs/current/app-psql.html)

## Need help?

Send a request to [support@neon.tech](mailto:support@neon.tech), or join the [Neon community forum](https://community.neon.tech/).
