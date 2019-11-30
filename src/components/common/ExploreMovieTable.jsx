import React from "react";
import { useTable, useFilters, useRowSelect, useSortBy } from "react-table";

import {
  DefaultColumnFilter
} from './UserTable';

import '../../css/common.css';

export default function ExploreMovieTable({ columns, data, cardNumber, user, viewMovie }) {
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );

  const filterTypes = React.useMemo(() => ({
    date: (rows, id, filterValue) => {
      return rows.filter(row => {
        const rowValue = row.values[id];

        if (rowValue === undefined) return true;
    
        const rowDate = new Date(rowValue);

        let min = filterValue[0] ? filterValue[0] : new Date(0);
        let max = filterValue[1] ? filterValue[1] : new Date(8640000000000000);

        return (rowDate >= min) && (rowDate <= max);
      })
    }
  }), [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes
    },
    useFilters,
    useSortBy,
    useRowSelect,
  );

  const firstPageRows = rows.slice(0, 10);

  let viewDisabled = true;
  if (
    selectedFlatRows.length &&
    selectedFlatRows.length === 1 &&
    selectedFlatRows[0].original &&
    cardNumber &&
    user
  ) {
    console.log(selectedFlatRows[0]);
    viewDisabled = false;
  }

  return (
    <>
      <button
        className={viewDisabled ? 'disabled' : ''}
        disabled={viewDisabled}
        onClick={() => {
          viewMovie(selectedFlatRows[0].original, cardNumber, user);
        }}
      >
        View
      </button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <span {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
    </>
  );
}