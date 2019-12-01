import * as React from 'react';

import { useTable, useFilters, useSortBy, useRowSelect } from 'react-table';
import { DefaultColumnFilter } from './UserTable';

import '../../css/common.css';

export default function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )}
        )}
      </tbody>
    </table>
  )
}

export function ExploreTheaterTable({ columns, data, logVisit, user, visitDate }) {
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
    
        const rowDate = new Date(rowValue + ' ');

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

  let logVisitDisabled = true;

  if (
    selectedFlatRows.length &&
    selectedFlatRows.length === 1 &&
    selectedFlatRows[0].original &&
    user &&
    visitDate
  ) {
    logVisitDisabled = false;
  }

  return (
    <>
      <button
        className={logVisitDisabled ? 'disabled' : ''}
        disabled={logVisitDisabled}
        onClick={() => {
          const val = selectedFlatRows[0].original;
          const { thName, comName } = val;
          logVisit({
            thName,
            comName,
            user,
            visitDate
          })
        }}
      >
        Log Visit
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

export function TableWithFilters({ columns, data }) {
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
    
        const rowDate = new Date(rowValue + ' ');

        let min = filterValue[0] ? filterValue[0] : new Date(0);
        let max = filterValue[1] ? filterValue[1] : new Date(8640000000000000);

        return (rowDate >= min) && (rowDate <= max);
      })
    }
  }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
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

  return (
    <>
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