import React, { useMemo } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { useTable, useFilters, useRowSelect, useSortBy } from "react-table";

import {
  DefaultColumnFilter
} from './UserTable';

import '../../css/common.css';

export default function CompanyTable({ columns, data }) {
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );

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
    },
    useFilters,
    useSortBy,
    useRowSelect,
  );

  const firstPageRows = rows.slice(0, 10);
  const location = useLocation();

  let detailDisabled = true;

  const history = useHistory();

  if (
    selectedFlatRows.length &&
    selectedFlatRows.length === 1 &&
    selectedFlatRows[0].original &&
    selectedFlatRows[0].original.comName
  ) {
    detailDisabled = false;
  }

  return (
    <>
      <button
        className={detailDisabled ? 'disabled' : ''}
        disabled={detailDisabled}
        onClick={() => {
          history.push({
            pathname: location.pathname + '/company-detail',
            state: { comName: selectedFlatRows[0].original.comName }
          });
        }}
      >
        Detail
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