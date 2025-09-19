// ModernTable.tsx usando shadcn/ui Table
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead, TableFooter } from "@/components/ui/table";

export type ColumnType = "text" | "checkbox" | "select" | "number" | "currency";

export interface TableColumn {
  key: string;
  label: string;
  type: ColumnType;
  fixed?: boolean;
  editable?: boolean;
  sortable?: boolean;
  width?: string;
  options?: string[];
}

interface TableRowData {
  [key: string]: any;
}

interface ModernTableProps {
  title: string;
  columns: TableColumn[];
  data: TableRowData[];
  onChange?: (newData: TableRowData[]) => void;
  onCreate?: () => void;
}

const ModernTable: React.FC<ModernTableProps> = ({
  title = "Registros",
  columns,
  data,
  onChange,
  onCreate,
}) => {
  const [tableData, setTableData] = useState<TableRowData[]>(data);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const sortedData = React.useMemo(() => {
    const withIdx = tableData.map((row, idx) => ({ ...row, _originalIdx: idx })) as (TableRowData & { _originalIdx: number })[];
    if (!sortConfig) return withIdx;
    return withIdx.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [tableData, sortConfig]);

  const handleEdit = (rowIdx: number, key: string, value: any) => {
    const originalIdx = sortedData[rowIdx]._originalIdx;
    const newData = [...tableData];
    newData[originalIdx][key] = value;
    setTableData(newData);
    onChange?.(newData);
  };

  const handleCreate = () => {
    onCreate?.();
  };

  return (
    <div className="w-full" style={{ overflowY: "visible" }}>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-black dark:text-white">{title}</h2>
          <button
            className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-2"
            onClick={handleCreate}
          >
            <FiPlus className="text-xl" />
            Crear nuevo
          </button>
        </div>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead
                  key={col.key + " idx:" + idx}
                  className={`bg-lime-100 dark:bg-gray-800 text-black dark:text-lime-400 font-semibold text-center whitespace-nowrap`}
                  style={{ width: col.width || "auto", minWidth: "120px" }}
                >
                  <div className="flex items-center justify-center gap-2">
                    {col.label}
                    {col.sortable && (
                      <button
                        className="ml-1 text-xs text-lime-500 dark:text-lime-400"
                        onClick={() =>
                          setSortConfig({
                            key: col.key,
                            direction:
                              sortConfig?.key === col.key && sortConfig.direction === "asc"
                                ? "desc"
                                : "asc",
                          })
                        }
                      >
                        {sortConfig?.key === col.key
                          ? sortConfig.direction === "asc"
                            ? "▲"
                            : "▼"
                          : "⇅"}
                      </button>
                    )}
                  </div>
                </TableHead>
              ))}
              <TableHead className="bg-lime-100 dark:bg-gray-800 text-black dark:text-lime-400 font-semibold text-center whitespace-nowrap">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, rowIdx) => (
              <TableRow key={rowIdx} className="hover:bg-lime-50 dark:hover:bg-gray-800">
                {columns.map((col, colIdx) => (
                  <TableCell
                    key={col.key + " idx:" + colIdx}
                    className="text-center align-middle whitespace-nowrap"
                    style={{ width: col.width || "auto", minWidth: "120px" }}
                  >
                    {col.type === "checkbox" ? (
                      <input
                        type="checkbox"
                        checked={!!row[col.key]}
                        disabled={!col.editable}
                        onChange={(e) =>
                          col.editable && handleEdit(rowIdx, col.key, e.target.checked)
                        }
                        className="form-checkbox h-5 w-5 text-lime-500"
                      />
                    ) : col.type === "select" && col.options ? (
                      <select
                        value={row[col.key]}
                        onChange={(e) => handleEdit(rowIdx, col.key, e.target.value)}
                        disabled={!col.editable}
                        className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-2 py-1 rounded w-full"
                      >
                        {col.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : col.type === "number" && col.editable ? (
                      <input
                        type="number"
                        value={row[col.key]}
                        onChange={(e) => handleEdit(rowIdx, col.key, Number(e.target.value))}
                        className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-2 py-1 rounded w-full"
                      />
                    ) : col.type === "currency" && col.editable ? (
                      <input
                        type="number"
                        value={row[col.key]}
                        onChange={(e) => handleEdit(rowIdx, col.key, Number(e.target.value))}
                        className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-2 py-1 rounded w-full"
                        step="0.01"
                      />
                    ) : col.type === "currency" ? (
                      <span>
                        {row[col.key].toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    ) : col.editable ? (
                      <input
                        type="text"
                        value={row[col.key] ?? ""}
                        onChange={(e) => handleEdit(rowIdx, col.key, e.target.value)}
                        className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <span>{row[col.key] ?? ""}</span>
                    )}
                  </TableCell>
                ))}
                <TableCell className="text-center flex gap-2 justify-center">
                  <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-lg transition-all flex items-center justify-center" title="Eliminar">
                    <FiTrash2 className="text-lg" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter />
        </Table>
      </div>
    </div>
  );
};

export default ModernTable;
