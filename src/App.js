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
    id: 'NA',
    name: 'North America',
    revenue: 1500000,
    discount: 75000,
    profit: 375000,
    subRows: [
      {
        id: '2023-NA',
        name: '2023',
        revenue: 800000,
        discount: 40000,
        profit: 200000,
        subRows: [
          {
            id: '2023-Q1-NA',
            name: 'Q1',
            revenue: 200000,
            discount: 10000,
            profit: 50000,
            subRows: [
              { id: '2023-01-NA', name: 'January', revenue: 66000, discount: 3300, profit: 16500 },
              { id: '2023-02-NA', name: 'February', revenue: 67000, discount: 3350, profit: 16750 },
              { id: '2023-03-NA', name: 'March', revenue: 67000, discount: 3350, profit: 16750 },
            ],
          },
          {
            id: '2023-Q2-NA',
            name: 'Q2',
            revenue: 200000,
            discount: 10000,
            profit: 50000,
            subRows: [
              { id: '2023-04-NA', name: 'April', revenue: 66000, discount: 3300, profit: 16500 },
              { id: '2023-05-NA', name: 'May', revenue: 67000, discount: 3350, profit: 16750 },
              { id: '2023-06-NA', name: 'June', revenue: 67000, discount: 3350, profit: 16750 },
            ],
          },
          {
            id: '2023-Q3-NA',
            name: 'Q3',
            revenue: 200000,
            discount: 10000,
            profit: 50000,
            subRows: [
              { id: '2023-07-NA', name: 'July', revenue: 66000, discount: 3300, profit: 16500 },
              { id: '2023-08-NA', name: 'August', revenue: 67000, discount: 3350, profit: 16750 },
              { id: '2023-09-NA', name: 'September', revenue: 67000, discount: 3350, profit: 16750 },
            ],
          },
          {
            id: '2023-Q4-NA',
            name: 'Q4',
            revenue: 200000,
            discount: 10000,
            profit: 50000,
            subRows: [
              { id: '2023-10-NA', name: 'October', revenue: 66000, discount: 3300, profit: 16500 },
              { id: '2023-11-NA', name: 'November', revenue: 67000, discount: 3350, profit: 16750 },
              { id: '2023-12-NA', name: 'December', revenue: 67000, discount: 3350, profit: 16750 },
            ],
          },
        ],
      },
      {
        id: '2022-NA',
        name: '2022',
        revenue: 700000,
        discount: 35000,
        profit: 175000,
        subRows: [
          {
            id: '2022-Q1-NA',
            name: 'Q1',
            revenue: 175000,
            discount: 87500,
            profit: 87500,
            subRows: [
              { id: '2022-01-NA', name: 'January', revenue: 58000, discount: 29000, profit: 29000 },
              { id: '2022-02-NA', name: 'February', revenue: 59000, discount: 29500, profit: 29500 },
              { id: '2022-03-NA', name: 'March', revenue: 60000, discount: 30000, profit: 30000 },
            ],
          },
          {
            id: '2022-Q2-NA',
            name: 'Q2',
            revenue: 175000,
            discount: 87500,
            profit: 87500,
            subRows: [
              { id: '2022-04-NA', name: 'April', revenue: 58000, discount: 29000, profit: 29000 },
              { id: '2022-05-NA', name: 'May', revenue: 59000, discount: 29500, profit: 29500 },
              { id: '2022-06-NA', name: 'June', revenue: 60000, discount: 30000, profit: 30000 },
            ],
          },
          {
            id: '2022-Q3-NA',
            name: 'Q3',
            revenue: 175000,
            discount: 87500,
            profit: 87500,
            subRows: [
              { id: '2022-07-NA', name: 'July', revenue: 58000, discount: 29000, profit: 29000 },
              { id: '2022-08-NA', name: 'August', revenue: 59000, discount: 29500, profit: 29500 },
              { id: '2022-09-NA', name: 'September', revenue: 60000, discount: 30000, profit: 30000 },
            ],
          },
          {
            id: '2022-Q4-NA',
            name: 'Q4',
            revenue: 175000,
            discount: 87500,
            profit: 87500,
            subRows: [
              { id: '2022-10-NA', name: 'October', revenue: 58000, discount: 29000, profit: 29000 },
              { id: '2022-11-NA', name: 'November', revenue: 59000, discount: 29500, profit: 29500 },
              { id: '2022-12-NA', name: 'December', revenue: 60000, discount: 30000, profit: 30000 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'EU',
    name: 'Europe',
    revenue: 1300000,
    discount: 65000,
    profit: 325000,
    subRows: [
      {
        id: '2023-EU',
        name: '2023',
        revenue: 700000,
        discount: 35000,
        profit: 175000,
        subRows: [
          {
            id: '2023-Q1-EU',
            name: 'Q1',
            revenue: 175000,
            discount: 87500,
            profit: 87500,
            subRows: [
              { id: '2023-01-EU', name: 'January', revenue: 58000, discount: 29000, profit: 29000 },
              { id: '2023-02-EU', name: 'February', revenue: 59000, discount: 29500, profit: 29500 },
              { id: '2023-03-EU', name: 'March', revenue: 60000, discount: 30000, profit: 30000 },
            ],
          },
          {
            id: '2023-Q2-EU',
            name: 'Q2',
            revenue: 175000,
            discount: 87500,
            profit: 87500,
            subRows: [
              { id: '2023-04-EU', name: 'April', revenue: 58000, discount: 29000, profit: 29000 },
              { id: '2023-05-EU', name: 'May', revenue: 59000, discount: 29500, profit: 29500 },
              { id: '2023-06-EU', name: 'June', revenue: 60000, discount: 30000, profit: 30000 },
            ],
          },
          {
            id: '2023-Q3-EU',
            name: 'Q3',
            revenue: 175000,
            discount: 87500,
            profit: 87500,
            subRows: [
              { id: '2023-07-EU', name: 'July', revenue: 58000, discount: 29000, profit: 29000 },
              { id: '2023-08-EU', name: 'August', revenue: 59000, discount: 29500, profit: 29500 },
              { id: '2023-09-EU', name: 'September', revenue: 60000, discount: 30000, profit: 30000 },
            ],
          },
          {
            id: '2023-Q4-EU',
            name: 'Q4',
            revenue: 175000,
            discount: 87500,
            profit: 87500,
            subRows: [
              { id: '2023-10-EU', name: 'October', revenue: 58000, discount: 29000, profit: 29000 },
              { id: '2023-11-EU', name: 'November', revenue: 59000, discount: 29500, profit: 29500 },
              { id: '2023-12-EU', name: 'December', revenue: 60000, discount: 30000, profit: 30000 },
            ],
          },
        ],
      },
      {
        id: '2022-EU',
        name: '2022',
        revenue: 600000,
        discount: 30000,
        profit: 150000,
        subRows: [
          {
            id: '2022-Q1-EU',
            name: 'Q1',
            revenue: 150000,
            discount: 75000,
            profit: 75000,
            subRows: [
              { id: '2022-01-EU', name: 'January', revenue: 50000, discount: 25000, profit: 25000 },
              { id: '2022-02-EU', name: 'February', revenue: 51000, discount: 25500, profit: 25500 },
              { id: '2022-03-EU', name: 'March', revenue: 52000, discount: 26000, profit: 26000 },
            ],
          },
          {
            id: '2022-Q2-EU',
            name: 'Q2',
            revenue: 150000,
            discount: 75000,
            profit: 75000,
            subRows: [
              { id: '2022-04-EU', name: 'April', revenue: 50000, discount: 25000, profit: 25000 },
              { id: '2022-05-EU', name: 'May', revenue: 51000, discount: 25500, profit: 25500 },
              { id: '2022-06-EU', name: 'June', revenue: 52000, discount: 26000, profit: 26000 },
            ],
          },
          {
            id: '2022-Q3-EU',
            name: 'Q3',
            revenue: 150000,
            discount: 75000,
            profit: 75000,
            subRows: [
              { id: '2022-07-EU', name: 'July', revenue: 50000, discount: 25000, profit: 25000 },
              { id: '2022-08-EU', name: 'August', revenue: 51000, discount: 25500, profit: 25500 },
              { id: '2022-09-EU', name: 'September', revenue: 52000, discount: 26000, profit: 26000 },
            ],
          },
          {
            id: '2022-Q4-EU',
            name: 'Q4',
            revenue: 150000,
            discount: 75000,
            profit: 75000,
            subRows: [
              { id: '2022-10-EU', name: 'October', revenue: 50000, discount: 25000, profit: 25000 },
              { id: '2022-11-EU', name: 'November', revenue: 51000, discount: 25500, profit: 25500 },
              { id: '2022-12-EU', name: 'December', revenue: 52000, discount: 26000, profit: 26000 },
            ],
          },
        ],
      },
    ],
  },
  // You can add more regions here
];

const App = () => {
  const columnHelper = createColumnHelper();
  
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Region/Period',
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
      columnHelper.accessor('discount', {
        header: 'Discount',
        cell: ({ getValue }) => (
          <div className="text-right">
            ${getValue().toLocaleString()}
          </div>
        ),
      }),
      columnHelper.accessor('profit', {
        header: 'Profit',
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
