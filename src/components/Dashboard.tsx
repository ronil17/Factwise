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
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
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

// Match AG Grid's look to the MUI theme.
const gridTheme = themeQuartz.withParams({
  accentColor: '#2563eb',
  borderColor: '#eaecf0',
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
        valueFormatter: (p) => (p.value as string[])?.join(', ') ?? '',
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
    <Box>
      <StatCards employees={rowData} />

      <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{
            p: 2,
            alignItems: { xs: 'stretch', md: 'center' },
            justifyContent: 'space-between',
          }}
        >
          <ToggleButtonGroup
            size="small"
            exclusive
            value={department}
            onChange={(_, val) => val && setDepartment(val)}
            sx={{ flexWrap: 'wrap' }}
          >
            {departments.map((dept) => (
              <ToggleButton key={dept} value={dept}>
                {dept}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Search employees…"
              value={quickFilter}
              onChange={(e) => setQuickFilter(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<FileDownloadOutlinedIcon />}
              onClick={exportCsv}
            >
              Export CSV
            </Button>
          </Stack>
        </Stack>

        <Divider />

        <Box>
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
        </Box>

        <Divider />

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', p: 1.5 }}>
          Showing {visibleCount} of {rowData.length} employees
        </Typography>
      </Paper>
    </Box>
  );
}
