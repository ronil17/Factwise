// Small formatting helpers shared across the grid.

export const currency = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export const initials = (first: string, last: string): string =>
  `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase();

// Stable colour per department so the badges stay consistent.
const departmentColors: Record<string, string> = {
  Engineering: '#2563eb',
  Marketing: '#db2777',
  Sales: '#16a34a',
  HR: '#d97706',
  Finance: '#7c3aed',
};

export const departmentColor = (department: string): string =>
  departmentColors[department] ?? '#64748b';
