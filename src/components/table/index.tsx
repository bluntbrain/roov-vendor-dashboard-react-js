import React from "react";
import {
  MRT_ColumnDef,
  MRT_RowData,
  MRT_TableOptions,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import styles from "./styles.module.css";

interface Props<T extends MRT_RowData> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  tableOptions?: MRT_TableOptions<T>;
}
export const MaterialTable = <T extends MRT_RowData>({
  columns,
  data,
}: Props<T>) => {
  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enablePagination: true,
    // enableRowActions: false,
    // enableRowSelection: false,
    // enableFullScreenToggle: false,
    // enableDensityToggle: false,
    // enableColumnActions: false,
    // enableColumnFilters: false,
    enableHiding: false,
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [5, 10, 20],
      shape: "rounded",
      variant: "outlined",
    },
  });

  return <MaterialReactTable table={table} />;
};
