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
    id: 'Electronics',
    name: 'Electronics',
    subRows: [
      {
        id: 'Computers',
        name: 'Computers',
        subRows: [
          {
            id: 'Laptops',
            name: 'Laptops',
            '2022': {
              Q1: { revenue: 175000, discount: 8750, profit: 43750 },
              Q2: { revenue: 175000, discount: 8750, profit: 43750 },
              Q3: { revenue: 175000, discount: 8750, profit: 43750 },
              Q4: { revenue: 175000, discount: 8750, profit: 43750 },
            },
            '2023': {
              Q1: { revenue: 200000, discount: 10000, profit: 50000 },
              Q2: { revenue: 200000, discount: 10000, profit: 50000 },
              Q3: { revenue: 200000, discount: 10000, profit: 50000 },
              Q4: { revenue: 200000, discount: 10000, profit: 50000 },
            },
          },
          {
            id: 'Desktops',
            name: 'Desktops',
            '2022': {
              Q1: { revenue: 175000, discount: 8750, profit: 43750 },
              Q2: { revenue: 175000, discount: 8750, profit: 43750 },
              Q3: { revenue: 175000, discount: 8750, profit: 43750 },
              Q4: { revenue: 175000, discount: 8750, profit: 43750 },
            },
            '2023': {
              Q1: { revenue: 200000, discount: 10000, profit: 50000 },
              Q2: { revenue: 200000, discount: 10000, profit: 50000 },
              Q3: { revenue: 200000, discount: 10000, profit: 50000 },
              Q4: { revenue: 200000, discount: 10000, profit: 50000 },
            },
          },
        ],
      },
      {
        id: 'Smartphones',
        name: 'Smartphones',
        subRows: [
          {
            id: 'iPhones',
            name: 'iPhones',
            '2022': {
              Q1: { revenue: 450000, discount: 22500, profit: 112500 },
              Q2: { revenue: 450000, discount: 22500, profit: 112500 },
              Q3: { revenue: 450000, discount: 22500, profit: 112500 },
              Q4: { revenue: 450000, discount: 22500, profit: 112500 },
            },
            '2023': {
              Q1: { revenue: 500000, discount: 25000, profit: 125000 },
              Q2: { revenue: 500000, discount: 25000, profit: 125000 },
              Q3: { revenue: 500000, discount: 25000, profit: 125000 },
              Q4: { revenue: 500000, discount: 25000, profit: 125000 },
            },
          },
          {
            id: 'Android',
            name: 'Android',
            '2022': {
              Q1: { revenue: 250000, discount: 12500, profit: 62500 },
              Q2: { revenue: 250000, discount: 12500, profit: 62500 },
              Q3: { revenue: 250000, discount: 12500, profit: 62500 },
              Q4: { revenue: 250000, discount: 12500, profit: 62500 },
            },
            '2023': {
              Q1: { revenue: 300000, discount: 15000, profit: 75000 },
              Q2: { revenue: 300000, discount: 15000, profit: 75000 },
              Q3: { revenue: 300000, discount: 15000, profit: 75000 },
              Q4: { revenue: 300000, discount: 15000, profit: 75000 },
            },
          },
        ],
      },
    ],
  },
  // ... You can add more categories here
];

const App = () => {
  const columnHelper = createColumnHelper();
  
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Category/Product',
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
      columnHelper.group({
        id: '2022',
        header: ({ column }) => (
          <button
            className="flex items-center gap-2"
            onClick={() => column.toggleVisibility()}
          >
            {column.getIsVisible() ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            2022
          </button>
        ),
        columns: ['Q1', 'Q2', 'Q3', 'Q4'].flatMap(quarter => [
          columnHelper.accessor(`2022.${quarter}.revenue`, {
            header: `${quarter} Revenue`,
            cell: ({ getValue }) => getValue()?.toLocaleString() ?? '-',
          }),
          columnHelper.accessor(`2022.${quarter}.discount`, {
            header: `${quarter} Discount`,
            cell: ({ getValue }) => getValue()?.toLocaleString() ?? '-',
          }),
          columnHelper.accessor(`2022.${quarter}.profit`, {
            header: `${quarter} Profit`,
            cell: ({ getValue }) => getValue()?.toLocaleString() ?? '-',
          }),
        ]),
      }),
      columnHelper.group({
        id: '2023',
        header: ({ column }) => (
          <button
            className="flex items-center gap-2"
            onClick={() => column.toggleVisibility()}
          >
            {column.getIsVisible() ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            2023
          </button>
        ),
        columns: ['Q1', 'Q2', 'Q3', 'Q4'].flatMap(quarter => [
          columnHelper.accessor(`2023.${quarter}.revenue`, {
            header: `${quarter} Revenue`,
            cell: ({ getValue }) => getValue()?.toLocaleString() ?? '-',
          }),
          columnHelper.accessor(`2023.${quarter}.discount`, {
            header: `${quarter} Discount`,
            cell: ({ getValue }) => getValue()?.toLocaleString() ?? '-',
          }),
          columnHelper.accessor(`2023.${quarter}.profit`, {
            header: `${quarter} Profit`,
            cell: ({ getValue }) => getValue()?.toLocaleString() ?? '-',
          }),
        ]),
      }),
    ],
    []
  );

  const [expanded, setExpanded] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data: initialData,
    columns,
    state: {
      expanded,
      columnVisibility,
    },
    onExpandedChange: setExpanded,
    onColumnVisibilityChange: setColumnVisibility,
    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="w-full max-w-full mx-auto overflow-x-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="p-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
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
