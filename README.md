# FactWise — Employee Dashboard

A client-side employee dashboard built with **React**, **TypeScript**, **Vite**, and **AG Grid**.
It renders the sample HR dataset (20 employees) in a clean, sortable, and filterable grid,
with summary metrics at the top.

## Features

- **AG Grid (client-side rendering)** — sorting, per-column filtering, resizing, and reordering
- **Summary cards** — headcount, department count, average salary, and average rating
  (these recalculate when a department is selected)
- **Quick search** across all columns
- **Department filter** chips
- **Pagination** with a selectable page size
- **CSV export** of the current view
- **Custom cell renderers** — employee avatar/email, department badges, status pills,
  a performance bar, formatted salary, and formatted dates
- Pinned employee column and responsive layout

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    Dashboard.tsx     # grid, toolbar, column definitions
    StatCards.tsx     # summary metric cards
    renderers.tsx     # custom AG Grid cell renderers
  data/employees.ts   # sample dataset (typed)
  utils/format.ts     # currency/date/colour helpers
  types.ts            # Employee type
```

## Notes

The dataset is the one provided with the assignment. Column colours are mapped per
department so badges and avatars stay consistent across the grid.
