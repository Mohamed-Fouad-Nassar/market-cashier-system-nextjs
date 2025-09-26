// import { createContext, useContext, ReactNode } from "react";

// type TableContextType = {
//   columns: string;
// };

// const TableContext = createContext<TableContextType | null>(null);

// export function GridTable({
//   columns,
//   children,
//   className = "",
// }: {
//   columns: string;
//   className?: string;
//   children: ReactNode;
// }) {
//   return (
//     <TableContext.Provider value={{ columns }}>
//       <div
//         role="table"
//         className={`border rounded-md text-sm *:text-center ${className}`}
//       >
//         {children}
//       </div>
//     </TableContext.Provider>
//   );
// }

// export function GridTableHeader({ children }: { children: ReactNode }) {
//   const ctx = useContext(TableContext)!;
//   return (
//     <div
//       role="row"
//       className="grid font-medium uppercase border-b"
//       style={{ gridTemplateColumns: ctx.columns }}
//     >
//       {children}
//     </div>
//   );
// }

// export function GridTableBody({
//   children,
//   height = "240px",
// }: {
//   children: ReactNode;
//   height?: string;
// }) {
//   return (
//     <div
//       role="rowgroup"
//       className="overflow-y-auto custom-scroll"
//       style={{ maxHeight: height }}
//     >
//       {children}
//     </div>
//   );
// }

// export function GridTableFooter({ children }: { children: ReactNode }) {
//   const ctx = useContext(TableContext)!;
//   return (
//     <div
//       role="row"
//       className="grid border-t font-medium"
//       style={{ gridTemplateColumns: ctx.columns }}
//     >
//       {children}
//     </div>
//   );
// }

// export function GridTableRow({
//   children,
//   className = "",
// }: {
//   className?: string;
//   children: ReactNode;
// }) {
//   const ctx = useContext(TableContext)!;
//   return (
//     <div
//       role="row"
//       className={`grid border-b last:border-0 ${className}`}
//       style={{ gridTemplateColumns: ctx.columns }}
//     >
//       {children}
//     </div>
//   );
// }

// export function GridTableHead({
//   children,
//   className = "",
// }: {
//   className?: string;
//   children: ReactNode | string;
// }) {
//   return (
//     <div
//       role="columnheader"
//       className={`p-2 last:border-0 capitalize ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

// export function GridTableCell({
//   children,
//   colSpan = 1,
//   className = "",
// }: {
//   colSpan?: number;
//   className?: string;
//   children: ReactNode;
// }) {
//   // const ctx = useContext(TableContext)!;
//   const span = `span ${colSpan} / span ${colSpan}`;

//   return (
//     <div
//       role="cell"
//       className={`p-2 last:border-0 flex items-center justify-center ${className}`}
//       style={{ gridColumn: span }}
//     >
//       {children}
//     </div>
//   );
// }

"use client";

import React, { createContext, useContext, ReactNode } from "react";

/**
 * Two ways to control columns:
 *  - colsClass: Tailwind grid classes (responsive), e.g. "grid-cols-1 sm:grid-cols-3 lg:grid-cols-[200px_1fr_1fr]"
 *  - columns: raw grid-template-columns style, e.g. "200px 1fr 1fr" (non-responsive)
 *
 * If colsClass is provided it is used. Otherwise columns inline style is used.
 */

type TableContextType = {
  colsClass?: string;
  columnsStyle?: string;
};

const TableContext = createContext<TableContextType | null>(null);

export function GridTable({
  columns,
  colsClass,
  children,
  className = "",
}: {
  columns?: string;
  colsClass?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <TableContext.Provider value={{ colsClass, columnsStyle: columns }}>
      <div
        role="table"
        className={`border rounded-md text-sm *:text-center ${className}`}
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function useGridProps() {
  const ctx = useContext(TableContext);
  if (!ctx) {
    // fallback if used outside provider
    return {
      className: "",
      style: undefined as React.CSSProperties | undefined,
    };
  }
  const className = ctx.colsClass ?? "";
  const style = ctx.columnsStyle
    ? ({ gridTemplateColumns: ctx.columnsStyle } as React.CSSProperties)
    : undefined;
  return { className, style };
}

export function GridTableHeader({ children }: { children: ReactNode }) {
  const { className, style } = useGridProps();
  return (
    <div
      role="row"
      className={`grid font-medium uppercase border-b ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function GridTableBody({
  children,
  height = "240px",
}: {
  children: ReactNode;
  height?: string;
}) {
  return (
    <div
      role="rowgroup"
      className="overflow-y-auto custom-scroll"
      style={{ maxHeight: height }}
    >
      {children}
    </div>
  );
}

export function GridTableFooter({ children }: { children: ReactNode }) {
  const { className, style } = useGridProps();
  return (
    <div
      role="row"
      className={`grid border-t font-medium ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function GridTableRow({
  children,
  className = "",
}: {
  className?: string;
  children: ReactNode;
}) {
  const { className: colsClass, style } = useGridProps();
  return (
    <div
      role="row"
      className={`grid border-b last:border-0 ${colsClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function GridTableHead({
  children,
  className = "",
}: {
  className?: string;
  children: ReactNode | string;
}) {
  return (
    <div
      role="columnheader"
      className={`p-2 last:border-0 capitalize ${className}`}
    >
      {children}
    </div>
  );
}

export function GridTableCell({
  children,
  colSpan = 1,
  className = "",
}: {
  colSpan?: number;
  className?: string;
  children: ReactNode;
}) {
  const span = `span ${colSpan} / span ${colSpan}`;

  return (
    <div
      role="cell"
      className={`p-2 last:border-0 flex items-center justify-center ${className}`}
      style={{ gridColumn: span }}
    >
      {children}
    </div>
  );
}

// // // ------------------ option two ------------------ // // //

// import { createContext, useContext, ReactNode, CSSProperties } from "react";

// type TableContextType = {
//   baseColumns: string;
//   responsiveColumns?: {
//     sm?: string;
//     md?: string;
//     lg?: string;
//     xl?: string;
//   };
// };

// const TableContext = createContext<TableContextType | null>(null);

// export function GridTable({
//   columns,
//   responsiveColumns,
//   children,
//   className = "",
// }: {
//   columns: string;
//   responsiveColumns?: { sm?: string; md?: string; lg?: string; xl?: string };
//   className?: string;
//   children: ReactNode;
// }) {
//   return (
//     <TableContext.Provider value={{ baseColumns: columns, responsiveColumns }}>
//       <div
//         role="table"
//         className={`border rounded-md text-sm *:text-center ${className}`}
//       >
//         {children}
//       </div>
//     </TableContext.Provider>
//   );
// }

// // Hook to compute responsive styles
// function useResponsiveColumns(ctx: TableContextType): CSSProperties {
//   const style: CSSProperties = { gridTemplateColumns: ctx.baseColumns };

//   // Generate CSS rules via media queries
//   if (ctx.responsiveColumns) {
//     const rules: string[] = [];
//     if (ctx.responsiveColumns.sm) {
//       rules.push(
//         `@media (min-width: 640px) { .grid-table { grid-template-columns: ${ctx.responsiveColumns.sm}; } }`
//       );
//     }
//     if (ctx.responsiveColumns.md) {
//       rules.push(
//         `@media (min-width: 768px) { .grid-table { grid-template-columns: ${ctx.responsiveColumns.md}; } }`
//       );
//     }
//     if (ctx.responsiveColumns.lg) {
//       rules.push(
//         `@media (min-width: 1024px) { .grid-table { grid-template-columns: ${ctx.responsiveColumns.lg}; } }`
//       );
//     }
//     if (ctx.responsiveColumns.xl) {
//       rules.push(
//         `@media (min-width: 1280px) { .grid-table { grid-template-columns: ${ctx.responsiveColumns.xl}; } }`
//       );
//     }

//     // Inject styles once
//     if (typeof document !== "undefined" && rules.length > 0) {
//       const styleTag = document.getElementById("grid-table-styles");
//       if (!styleTag) {
//         const tag = document.createElement("style");
//         tag.id = "grid-table-styles";
//         tag.innerHTML = rules.join("\n");
//         document.head.appendChild(tag);
//       }
//     }
//   }

//   return style;
// }

// export function GridTableHeader({ children }: { children: ReactNode }) {
//   const ctx = useContext(TableContext)!;
//   const style = useResponsiveColumns(ctx);

//   console.log("header table style: ", style);

//   return (
//     <div
//       role="row"
//       className="grid font-medium uppercase border-b grid-table"
//       style={style}
//     >
//       {children}
//     </div>
//   );
// }

// export function GridTableBody({
//   children,
//   height = "240px",
// }: {
//   children: ReactNode;
//   height?: string;
// }) {
//   return (
//     <div
//       role="rowgroup"
//       className="overflow-y-auto custom-scroll"
//       style={{ maxHeight: height }}
//     >
//       {children}
//     </div>
//   );
// }

// export function GridTableFooter({ children }: { children: ReactNode }) {
//   const ctx = useContext(TableContext)!;
//   const style = useResponsiveColumns(ctx);

//   console.log("footer table style: ", style);

//   return (
//     <div
//       role="row"
//       className="grid border-t font-medium grid-table"
//       style={style}
//     >
//       {children}
//     </div>
//   );
// }

// export function GridTableRow({
//   children,
//   className = "",
// }: {
//   className?: string;
//   children: ReactNode;
// }) {
//   const ctx = useContext(TableContext)!;
//   const style = useResponsiveColumns(ctx);

//   console.log("row table style: ", style);

//   return (
//     <div
//       role="row"
//       className={`grid border-b last:border-0 grid-table ${className}`}
//       style={style}
//     >
//       {children}
//     </div>
//   );
// }

// export function GridTableHead({
//   children,
//   className = "",
// }: {
//   className?: string;
//   children: ReactNode | string;
// }) {
//   return (
//     <div
//       role="columnheader"
//       className={`p-2 last:border-0 capitalize ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

// export function GridTableCell({
//   children,
//   colSpan = 1,
//   className = "",
// }: {
//   colSpan?: number;
//   className?: string;
//   children: ReactNode;
// }) {
//   const span = `span ${colSpan} / span ${colSpan}`;

//   return (
//     <div
//       role="cell"
//       className={`p-2 last:border-0 flex items-center justify-center ${className}`}
//       style={{ gridColumn: span }}
//     >
//       {children}
//     </div>
//   );
// }
