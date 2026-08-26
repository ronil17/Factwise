import { useMemo } from 'react';
import type { Employee } from '../types';
import { currency } from '../utils/format';

interface StatCardsProps {
  employees: Employee[];
}

export function StatCards({ employees }: StatCardsProps) {
  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.isActive).length;
    const avgSalary = total
      ? Math.round(employees.reduce((sum, e) => sum + e.salary, 0) / total)
      : 0;
    const avgRating = total
      ? employees.reduce((sum, e) => sum + e.performanceRating, 0) / total
      : 0;
    const departments = new Set(employees.map((e) => e.department)).size;

    return { total, active, avgSalary, avgRating, departments };
  }, [employees]);

  const cards = [
    { label: 'Employees', value: String(stats.total), hint: `${stats.active} active` },
    { label: 'Departments', value: String(stats.departments), hint: 'across the org' },
    { label: 'Avg. Salary', value: currency(stats.avgSalary), hint: 'per employee' },
    { label: 'Avg. Rating', value: stats.avgRating.toFixed(2), hint: 'out of 5.0' },
  ];

  return (
    <div className="stat-cards">
      {cards.map((card) => (
        <div key={card.label} className="stat-card">
          <span className="stat-card__label">{card.label}</span>
          <span className="stat-card__value">{card.value}</span>
          <span className="stat-card__hint">{card.hint}</span>
        </div>
      ))}
    </div>
  );
}
