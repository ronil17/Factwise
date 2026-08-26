import type { CustomCellRendererProps } from 'ag-grid-react';
import type { Employee } from '../types';
import { departmentColor, formatDate, initials } from '../utils/format';

export function EmployeeCell({ data }: CustomCellRendererProps<Employee>) {
  if (!data) return null;
  return (
    <div className="employee-cell">
      <span className="avatar" style={{ background: departmentColor(data.department) }}>
        {initials(data.firstName, data.lastName)}
      </span>
      <div className="employee-cell__text">
        <span className="employee-cell__name">
          {data.firstName} {data.lastName}
        </span>
        <span className="employee-cell__email">{data.email}</span>
      </div>
    </div>
  );
}

export function DepartmentCell({ value }: CustomCellRendererProps<Employee, string>) {
  if (!value) return null;
  const color = departmentColor(value);
  return (
    <div className="cell-center">
      <span className="badge" style={{ color, background: `${color}1a` }}>
        {value}
      </span>
    </div>
  );
}

export function StatusCell({ value }: CustomCellRendererProps<Employee, boolean>) {
  return (
    <span className={`status ${value ? 'status--active' : 'status--inactive'}`}>
      <span className="status__dot" />
      {value ? 'Active' : 'Inactive'}
    </span>
  );
}

export function RatingCell({ value }: CustomCellRendererProps<Employee, number>) {
  if (value == null) return null;
  const pct = (value / 5) * 100;
  const tone = value >= 4.5 ? '#16a34a' : value >= 4 ? '#2563eb' : '#d97706';
  return (
    <div className="rating">
      <div className="rating__track">
        <div className="rating__fill" style={{ width: `${pct}%`, background: tone }} />
      </div>
      <span className="rating__value">{value.toFixed(1)}</span>
    </div>
  );
}

export function SkillsCell({ value }: CustomCellRendererProps<Employee, string[]>) {
  if (!value?.length) return null;
  return (
    <div className="skills">
      {value.map((skill) => (
        <span key={skill} className="skill-tag">
          {skill}
        </span>
      ))}
    </div>
  );
}

export function DateCell({ value }: CustomCellRendererProps<Employee, string>) {
  if (!value) return null;
  return <span>{formatDate(value)}</span>;
}
