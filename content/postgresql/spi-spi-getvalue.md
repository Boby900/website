## SPI\_getvalue

SPI\_getvalue — return the string value of the specified column

## Synopsis

```

char * SPI_getvalue(HeapTuple row, TupleDesc rowdesc, int colnumber)
```

## Description

`SPI_getvalue` returns the string representation of the value of the specified column.

The result is returned in memory allocated using `palloc`. (You can use `pfree` to release the memory when you don't need it anymore.)

## Arguments

* `HeapTuple row`

    input row to be examined

* `TupleDesc rowdesc`

    input row description

* `int colnumber`

    column number (count starts at 1)

## Return Value

Column value, or `NULL` if the column is null, *`colnumber`* is out of range (`SPI_result` is set to `SPI_ERROR_NOATTRIBUTE`), or no output function is available (`SPI_result` is set to `SPI_ERROR_NOOUTFUNC`).