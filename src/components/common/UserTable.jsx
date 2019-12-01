import React from "react";
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import { useTable, useFilters, useRowSelect, useSortBy } from "react-table";

import { UserStatus } from '../../redux/state/UserState';

export const TableStyles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

// Define a default UI for filtering
export function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function DateRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id }
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length && preFilteredRows[0].values[id] ?
      new Date(preFilteredRows[0].values[id] + ' ') : new Date(0);
    let max = preFilteredRows.length && preFilteredRows[0].values[id] ?
      new Date(preFilteredRows[0].values[id] + ' ') : new Date(8640000000000000);
    preFilteredRows.forEach(row => {
      const currVal = new Date(row.values[id] + ' ');
      min = currVal < min ? currVal : min;
      max = currVal > max ? currVal : max;
    });
    return [min, max];
  }, [id, preFilteredRows]);


  return (
    <div
      style={{
        display: "flex"
      }}
    >
      <DatePicker
        value={filterValue[0] || min}
        selected={filterValue[0] || min}
        onChange={date => {
          setFilter((old = []) => [
            date,
            old[1]
          ]);
        }}
      />
      to
      <DatePicker
        value={filterValue[1] || max}
        selected={filterValue[1] || max}
        onChange={date => {
          setFilter((old = []) => [
            old[0],
            date,
          ]);
        }}
      />
    </div>
  );
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
export function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id }
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: "flex"
      }}
    >
      <input
        value={filterValue[0] || ""}
        type="number"
        onChange={e => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1]
          ]);
          console.log(filterValue);
        }}
        placeholder={`Min (${min})`}
        style={{
          width: "70px",
          marginRight: "0.5rem"
        }}
      />
      to
      <input
        value={filterValue[1] || ""}
        type="number"
        onChange={e => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined
          ]);
        }}
        placeholder={`Max (${max})`}
        style={{
          width: "70px",
          marginLeft: "0.5rem"
        }}
      />
    </div>
  );
}

export default function UserTable({ columns, data, updateUserStatus }) {
  const defaultColumn = React.useMemo(
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

  let approveDisabled = true;
  let declineDisabled = true;
  if (
    selectedFlatRows.length &&
    selectedFlatRows.length === 1 &&
    selectedFlatRows[0].original &&
    selectedFlatRows[0].original.userStatus
  ) {
    const status = selectedFlatRows[0].original.userStatus;
    if (status === UserStatus.pending) {
      approveDisabled = false;
      declineDisabled = false;
    } else if (status === UserStatus.declined) {
      approveDisabled = false;
    }
  }

  return (
    <>
      <button
        className={approveDisabled ? 'disabled' : ''}
        disabled={approveDisabled}
        onClick={() => {
          const user = selectedFlatRows[0].original;
          updateUserStatus(user.username, UserStatus.approved);
        }}
      >
        Approve
      </button>
      <button
        className={declineDisabled ? 'disabled' : ''}
        disabled={declineDisabled}
        onClick={() => {
          const user = selectedFlatRows[0].original;
          updateUserStatus(user.username, UserStatus.declined);
        }}
      >
        Decline
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
          {rows.map((row, i) => {
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
      <div>Total rows: {rows.length} rows</div>
    </>
  );
}
