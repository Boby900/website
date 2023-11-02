## CALL

CALL — invoke a procedure

## Synopsis

```

CALL name ( [ argument ] [, ...] )
```

## Description

`CALL` executes a procedure.

If the procedure has any output parameters, then a result row will be returned, containing the values of those parameters.

## Parameters

* *`name`*

    The name (optionally schema-qualified) of the procedure.

* *`argument`*

    An argument expression for the procedure call.

    Arguments can include parameter names, using the syntax `name => value`. This works the same as in ordinary function calls; see [Section 4.3](sql-syntax-calling-funcs.html "4.3. Calling Functions") for details.

    Arguments must be supplied for all procedure parameters that lack defaults, including `OUT` parameters. However, arguments matching `OUT` parameters are not evaluated, so it's customary to just write `NULL` for them. (Writing something else for an `OUT` parameter might cause compatibility problems with future PostgreSQL versions.)

## Notes

The user must have `EXECUTE` privilege on the procedure in order to be allowed to invoke it.

To call a function (not a procedure), use `SELECT` instead.

If `CALL` is executed in a transaction block, then the called procedure cannot execute transaction control statements. Transaction control statements are only allowed if `CALL` is executed in its own transaction.

PL/pgSQL handles output parameters in `CALL` commands differently; see [Section 43.6.3](plpgsql-control-structures.html#PLPGSQL-STATEMENTS-CALLING-PROCEDURE "43.6.3. Calling a Procedure").

## Examples

```

CALL do_db_maintenance();
```

## Compatibility

`CALL` conforms to the SQL standard, except for the handling of output parameters. The standard says that users should write variables to receive the values of output parameters.

## See Also

[CREATE PROCEDURE](sql-createprocedure.html "CREATE PROCEDURE")