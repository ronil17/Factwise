import { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  type ColDef,
  type GridReadyEvent,
  type GridApi,
} from 'ag-grid-community';
import type { Employee } from '../types';
import { employees as employeeData } from '../data/employees';
import { currency } from '../utils/format';
import { StatCards } from './StatCards';
import {
  DateCell,
  DepartmentCell,
  EmployeeCell,
  RatingCell,
  SkillsCell,
  StatusCell,
} from './renderers';

ModuleRegistry.registerModules([AllCommunityModule]);

// Match AG Grid's look to the rest of the dashboard.
const gridTheme = themeQuartz.withParams({
  accentColor: '#2563eb',
  borderColor: '#e9ecef',
  headerBackgroundColor: '#f8f9fb',
  headerTextColor: '#475467',
  headerFontWeight: 600,
  fontFamily: 'inherit',
  fontSize: 13,
  rowHeight: 56,
  headerHeight: 46,
});

export function Dashboard() {
  const gridApiRef = useRef<GridApi<Employee> | null>(null);
  const [quickFilter, setQuickFilter] = useState('');
  const [department, setDepartment] = useState('All');
  const [visibleCount, setVisibleCount] = useState(employeeData.length);

  const departments = useMemo(
    () => ['All', ...Array.from(new Set(employeeData.map((e) => e.department))).sort()],
    [],
  );

  const rowData = useMemo(
    () =>
      department === 'All'
        ? employeeData
        : employeeData.filter((e) => e.department === department),
    [department],
  );

  const columnDefs = useMemo<ColDef<Employee>[]>(
    () => [
      {
        headerName: 'Employee',
        field: 'firstName',
        cellRenderer: EmployeeCell,
        valueGetter: (p) => `${p.data?.firstName} ${p.data?.lastName}`,
        minWidth: 240,
        flex: 2,
        pinned: 'left',
      },
      {
        headerName: 'Department',
        field: 'department',
        cellRenderer: DepartmentCell,
        minWidth: 140,
      },
      { headerName: 'Position', field: 'position', minWidth: 190, flex: 1 },
      {
        headerName: 'Salary',
        field: 'salary',
        valueFormatter: (p) => currency(p.value),
        type: 'numericColumn',
        minWidth: 120,
      },
      {
        headerName: 'Performance',
        field: 'performanceRating',
        cellRenderer: RatingCell,
        minWidth: 150,
      },
      {
        headerName: 'Projects',
        field: 'projectsCompleted',
        type: 'numericColumn',
        minWidth: 110,
      },
      {
        headerName: 'Status',
        field: 'isActive',
        cellRenderer: StatusCell,
        minWidth: 120,
        filterValueGetter: (p) => (p.data?.isActive ? 'Active' : 'Inactive'),
      },
      { headerName: 'Location', field: 'location', minWidth: 130 },
      {
        headerName: 'Hire Date',
        field: 'hireDate',
        cellRenderer: DateCell,
        minWidth: 130,
      },
      { headerName: 'Age', field: 'age', type: 'numericColumn', minWidth: 90 },
      {
        headerName: 'Skills',
        field: 'skills',
        cellRenderer: SkillsCell,
        minWidth: 220,
        flex: 1,
        sortable: false,
      },
      {
        headerName: 'Manager',
        field: 'manager',
        minWidth: 150,
        valueFormatter: (p) => p.value ?? '—',
      },
    ],
    [],
  );

  const defaultColDef = useMemo<ColDef<Employee>>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      suppressHeaderMenuButton: true,
    }),
    [],
  );

  const onGridReady = useCallback((event: GridReadyEvent<Employee>) => {
    gridApiRef.current = event.api;
  }, []);

  const updateVisibleCount = useCallback(() => {
    setVisibleCount(gridApiRef.current?.getDisplayedRowCount() ?? 0);
  }, []);

  const exportCsv = useCallback(() => {
    gridApiRef.current?.exportDataAsCsv({ fileName: 'factwise-employees.csv' });
  }, []);

  return (
    <div className="dashboard">
      <StatCards employees={rowData} />

      <div className="panel">
        <div className="toolbar">
          <div className="chips">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                className={`chip ${department === dept ? 'chip--active' : ''}`}
                onClick={() => setDepartment(dept)}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="toolbar__right">
            <div className="search">
              <SearchIcon />
              <input
                type="search"
                placeholder="Search employees…"
                value={quickFilter}
                onChange={(e) => setQuickFilter(e.target.value)}
                aria-label="Search employees"
              />
            </div>
            <button type="button" className="btn" onClick={exportCsv}>
              Export CSV
            </button>
          </div>
        </div>

        <div className="grid-wrap">
          <AgGridReact<Employee>
            theme={gridTheme}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            quickFilterText={quickFilter}
            onGridReady={onGridReady}
            onModelUpdated={updateVisibleCount}
            domLayout="autoHeight"
            pagination
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50]}
            animateRows
            enableCellTextSelection
          />
        </div>

        <div className="panel__footer">
          Showing {visibleCount} of {rowData.length} employees
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
