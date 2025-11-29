import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Table Container
 */
interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export function Table({ className, children, ...props }: TableProps) {
  return (
    <div className="w-full overflow-auto">
      <table
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

/**
 * Table Header
 */
interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export function TableHeader({ className, children, ...props }: TableHeaderProps) {
  return (
    <thead className={cn('border-b bg-gray-50', className)} {...props}>
      {children}
    </thead>
  );
}

/**
 * Table Body
 */
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export function TableBody({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody className={cn('divide-y divide-gray-200', className)} {...props}>
      {children}
    </tbody>
  );
}

/**
 * Table Row
 */
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export function TableRow({ className, children, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        'border-b transition-colors hover:bg-gray-50',
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

/**
 * Table Head Cell
 */
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export function TableHead({ className, children, ...props }: TableHeadProps) {
  return (
    <th
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

/**
 * Table Cell
 */
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export function TableCell({ className, children, ...props }: TableCellProps) {
  return (
    <td
      className={cn('p-4 align-middle', className)}
      {...props}
    >
      {children}
    </td>
  );
}