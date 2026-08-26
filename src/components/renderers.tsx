import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import CircleIcon from '@mui/icons-material/Circle';
import type { CustomCellRendererProps } from 'ag-grid-react';
import type { Employee } from '../types';
import { departmentColor, formatDate, initials } from '../utils/format';

export function EmployeeCell({ data }: CustomCellRendererProps<Employee>) {
  if (!data) return null;
  return (
    <Stack direction="row" spacing={1.5} sx={{ height: '100%', alignItems: 'center' }}>
      <Avatar
        sx={{
          width: 34,
          height: 34,
          fontSize: 12,
          fontWeight: 600,
          bgcolor: departmentColor(data.department),
        }}
      >
        {initials(data.firstName, data.lastName)}
      </Avatar>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body2" noWrap sx={{ fontWeight: 600, lineHeight: 1.3 }}>
          {data.firstName} {data.lastName}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap component="div">
          {data.email}
        </Typography>
      </Box>
    </Stack>
  );
}

export function DepartmentCell({ value }: CustomCellRendererProps<Employee, string>) {
  if (!value) return null;
  const color = departmentColor(value);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <Chip
        label={value}
        size="small"
        sx={{ fontWeight: 600, color, bgcolor: `${color}1a`, border: 'none' }}
      />
    </Box>
  );
}

export function StatusCell({ value }: CustomCellRendererProps<Employee, boolean>) {
  const color = value ? 'success.main' : 'error.main';
  return (
    <Stack direction="row" spacing={0.75} sx={{ height: '100%', alignItems: 'center' }}>
      <CircleIcon sx={{ fontSize: 9, color }} />
      <Typography variant="body2" color={color} sx={{ fontWeight: 500 }}>
        {value ? 'Active' : 'Inactive'}
      </Typography>
    </Stack>
  );
}

export function RatingCell({ value }: CustomCellRendererProps<Employee, number>) {
  if (value == null) return null;
  const pct = (value / 5) * 100;
  const color = value >= 4.5 ? '#16a34a' : value >= 4 ? '#2563eb' : '#d97706';
  return (
    <Stack direction="row" spacing={1} sx={{ height: '100%', alignItems: 'center' }}>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          width: 70,
          height: 6,
          borderRadius: 999,
          bgcolor: '#eef1f5',
          '& .MuiLinearProgress-bar': { bgcolor: color },
        }}
      />
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
        {value.toFixed(1)}
      </Typography>
    </Stack>
  );
}

export function SkillsCell({ value }: CustomCellRendererProps<Employee, string[]>) {
  if (!value?.length) return null;
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ height: '100%', overflow: 'hidden', alignItems: 'center' }}
    >
      {value.map((skill) => (
        <Chip
          key={skill}
          label={skill}
          size="small"
          sx={{ bgcolor: '#f2f4f7', color: '#475467', fontSize: 11, fontWeight: 500 }}
        />
      ))}
    </Stack>
  );
}

export function DateCell({ value }: CustomCellRendererProps<Employee, string>) {
  if (!value) return null;
  return <span>{formatDate(value)}</span>;
}
