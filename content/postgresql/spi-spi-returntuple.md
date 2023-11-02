## SPI\_returntuple

SPI\_returntuple — prepare to return a tuple as a Datum

## Synopsis

```

HeapTupleHeader SPI_returntuple(HeapTuple row, TupleDesc rowdesc)
```

## Description

`SPI_returntuple` makes a copy of a row in the upper executor context, returning it in the form of a row type `Datum`. The returned pointer need only be converted to `Datum` via `PointerGetDatum` before returning.

This function can only be used while connected to SPI. Otherwise, it returns NULL and sets `SPI_result` to `SPI_ERROR_UNCONNECTED`.

Note that this should be used for functions that are declared to return composite types. It is not used for triggers; use `SPI_copytuple` for returning a modified row in a trigger.

## Arguments

* `HeapTuple row`

    row to be copied

* `TupleDesc rowdesc`

    descriptor for row (pass the same descriptor each time for most effective caching)

## Return Value

`HeapTupleHeader` pointing to copied row, or `NULL` on error (see `SPI_result` for an error indication)