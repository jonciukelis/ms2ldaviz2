//React imports
import React from 'react';

//Style import
import './App.css';

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'

//React Table
import { useTable, usePagination, useSortBy } from 'react-table'

export default function MyTable({ columns, data, onClick }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    // eslint-disable-next-line
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // eslint-disable-next-line
    setPageSize,
    // eslint-disable-next-line
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  )

  // Render Data Table UI
  return (
    <div className="table-container">
      <Table {...getTableProps()} striped bordered hover size="sm">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} onClick={ () => {onClick(row.cells[0].value)}}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}><p className="table-cell">{cell.render('Cell')}</p></td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>


      <div className="pagination">
        <Pagination>
          <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
          <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
          
          <input
            value={String(pageIndex + 1) + " (" + String(pageCount) + ") "}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
          <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
          <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
        </Pagination>
      </div>
    </div>

  )
}
// export default function TableExample() {
//   const data = [
//     {
//       name: 'Leanne Graham',
//       email: 'Sincere@april.biz',
//       age: 28,
//       status: 'Active'
//     },
//     {
//       name: 'Ervin Howell',
//       email: 'Shanna@melissa.tv',
//       age: 35,
//       status: 'Active'
//     },
//   ]

//   const columns = [
//     {
//       Header: 'Name',
//       accessor: 'name'
//     }, {
//       Header: 'Email',
//       accessor: 'email'
//     }, {
//       Header: 'Age',
//       accessor: 'age'
//     }, {
//       Header: 'Status',
//       accessor: 'status'
//     }
//   ]

//   return (
//     <MyTable data={data} columns={columns} onClick={(thing) => console.log(thing)} />
//   )
// }