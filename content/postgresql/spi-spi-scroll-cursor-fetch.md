## SPI\_scroll\_cursor\_fetch

SPI\_scroll\_cursor\_fetch — fetch some rows from a cursor

## Synopsis

```

void SPI_scroll_cursor_fetch(Portal portal, FetchDirection direction,
                             long count)
```

## Description

`SPI_scroll_cursor_fetch` fetches some rows from a cursor. This is equivalent to the SQL command `FETCH`.

## Arguments

* `Portal portal`

    portal containing the cursor

* `FetchDirection direction`

    one of `FETCH_FORWARD`, `FETCH_BACKWARD`, `FETCH_ABSOLUTE` or `FETCH_RELATIVE`

* `long count`

    number of rows to fetch for `FETCH_FORWARD` or `FETCH_BACKWARD`; absolute row number to fetch for `FETCH_ABSOLUTE`; or relative row number to fetch for `FETCH_RELATIVE`

## Return Value

`SPI_processed` and `SPI_tuptable` are set as in `SPI_execute` if successful.

## Notes

See the SQL [FETCH](sql-fetch.html "FETCH") command for details of the interpretation of the *`direction`* and *`count`* parameters.

Direction values other than `FETCH_FORWARD` may fail if the cursor's plan was not created with the `CURSOR_OPT_SCROLL` option.