import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { ChevronRight, ChevronDown } from 'lucide-react';

const initialData = [
  {
    id: '1',
    name: 'Category A',
    revenue: 50000,
    subRows: [
      {
        id: '1-1',
        name: 'Subcategory A1',
        revenue: 20000,
        subRows: [
          { id: '1-1-1', name: 'Product A1.1', revenue: 10000 },
          { id: '1-1-2', name: 'Product A1.2', revenue: 10000 }
        ]
      },
      {
        id: '1-2',
        name: 'Subcategory A2',
        revenue: 30000,
        subRows: [
          { id: '1-2-1', name: 'Product A2.1', revenue: 15000 },
          { id: '1-2-2', name: 'Product A2.2', revenue: 15000 }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Category B',
    revenue: 40000,
    subRows: [
      {
        id: '2-1',
        name: 'Subcategory B1',
        revenue: 40000,
        subRows: [
          { id: '2-1-1', name: 'Product B1.1', revenue: 20000 },
          { id: '2-1-2', name: 'Product B1.2', revenue: 20000 }
        ]
      }
    ]
  }
];

const App = () => {
  const columnHelper = createColumnHelper();
  
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ row, getValue }) => (
          <div
            className="flex items-center gap-2"
            style={{
              paddingLeft: `${row.depth * 24}px`,
            }}
          >
            {row.getCanExpand() ? (
              <button
                className="p-1 hover:bg-gray-200 rounded"
                onClick={row.getToggleExpandedHandler()}
              >
                {row.getIsExpanded() ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            ) : (
              <span className="w-6" />
            )}
            {getValue()}
          </div>
        ),
      }),
      columnHelper.accessor('revenue', {
        header: 'Revenue',
        cell: ({ getValue }) => (
          <div className="text-right">
            ${getValue().toLocaleString()}
          </div>
        ),
      }),
    ],
    []
  );

  const [expanded, setExpanded] = useState({});

  const table = useReactTable({
    data: initialData,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="p-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className="hover:bg-gray-50"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-4">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;