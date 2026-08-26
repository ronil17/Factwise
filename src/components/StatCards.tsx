import { useMemo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { Employee } from '../types';
import { currency } from '../utils/format';

interface StatCardsProps {
  employees: Employee[];
}

export function StatCards({ employees }: StatCardsProps) {
  const cards = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.isActive).length;
    const avgSalary = total
      ? Math.round(employees.reduce((sum, e) => sum + e.salary, 0) / total)
      : 0;
    const avgRating = total
      ? employees.reduce((sum, e) => sum + e.performanceRating, 0) / total
      : 0;
    const departments = new Set(employees.map((e) => e.department)).size;

    return [
      { label: 'Employees', value: String(total), hint: `${active} active` },
      { label: 'Departments', value: String(departments), hint: 'across the org' },
      { label: 'Avg. Salary', value: currency(avgSalary), hint: 'per employee' },
      { label: 'Avg. Rating', value: avgRating.toFixed(2), hint: 'out of 5.0' },
    ];
  }, [employees]);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 2,
        mb: 2.5,
      }}
    >
      {cards.map((card) => (
        <Card key={card.label} variant="outlined">
          <CardContent>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 600 }}
            >
              {card.label}
            </Typography>
            <Typography variant="h4" sx={{ my: 0.5, fontWeight: 700 }}>
              {card.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.hint}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
