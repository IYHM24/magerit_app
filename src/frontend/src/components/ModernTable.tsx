// ModernTable.tsx usando shadcn/ui Table
import React, { useState } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead, TableFooter } from "@/components/ui/table";

export type ColumnType = "text" | "checkbox" | "select" | "number" | "currency" | "textarea";

export interface TableColumn {
  key: string;
  label: string;
  type: ColumnType;
  fixed?: boolean;
  editable?: boolean;
  sortable?: boolean;
  width?: string;
  options?: { label: string; value: number }[]; // Para selects personalizados
  optionLabelKey?: string;
  optionValueKey?: string;
}

interface TableRowData {
  [key: string]: any;
}

interface ModernTableProps {
  title: string;
  columns: TableColumn[];
  data: TableRowData[];
  onChange?: (newData: any, key: string) => void;
  onCreate?: () => void;
  onDelete?: (id: number) => void;
}

const ModernTable: React.FC<ModernTableProps> = ({
  title = "Registros",
  columns,
  data,
  onChange,
  onCreate,
  onDelete,
}) => {
  const [tableData, setTableData] = useState<TableRowData[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  const sortedData = React.useMemo(() => {
    const withIdx = tableData && tableData?.map((row, idx) => ({ ...row, _originalIdx: idx })) as (TableRowData & { _originalIdx: number })[];
    if (!sortConfig) return withIdx;
    return withIdx.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [tableData, sortConfig]);

  const handleEdit = (rowIdx: number, key: string, value: any) => {
    
    /*  */
    const originalIdx = sortedData[rowIdx]._originalIdx;
    const newData = [...(tableData || [])];
    

    /*  */
    newData[originalIdx][key] = value;
    setTableData(newData);

    /*  */
    onChange?.(newData[originalIdx], key);
  };

  const handleDelete = (row: TableRowData & { _originalIdx: number }) => {
    
    const originalIdx = row._originalIdx;
    const newData = [...(tableData || [])];
    newData.splice(originalIdx, 1);
    setTableData(newData);
    onDelete?.(row.id);
  };

  const handleCreate = () => {
    onCreate?.();
  };

  return (
    <div className="w-full">
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4"
      >
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
        {/* Scroll SOLO en la tabla */}
        <div className="max-w-[1378px] max-h-[60vh]! min-h-40 overflow-x-auto overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 z-20">
              <TableRow>
                {columns.map((col, idx) => (
                    <TableHead
                      key={col.key + " idx:" + idx}
                      className={
                        `bg-lime-100 dark:bg-gray-800 text-black dark:text-lime-400 font-semibold text-center whitespace-nowrap ${idx === 1 ? `sticky left-0 z-10 ` : ""}`
                      }
                      style={{ minWidth: col.width || "80px" }}
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
                <TableHead className="bg-lime-100 dark:bg-gray-800 text-black dark:text-lime-400 font-semibold text-center whitespace-nowrap" style={{ minWidth: "80px" }}>
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row, rowIdx) => (
                <TableRow key={rowIdx} className="group hover:bg-lime-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900">
                  {columns.map((col, colIdx) => (
                    <TableCell
                      key={col.key + " idx:" + colIdx}
                      className={`group-hover:bg-lime-50 dark:group-hover:bg-gray-800 text-center align-middle whitespace-nowrap ${colIdx === 1 ? `sticky left-0 z-10 bg-white dark:bg-gray-900 group-hover:bg-lime-50` : ""}`}
                      style={{ minWidth: col.width || "80px" }}
                    >
                      {col.type === "checkbox" ? (
                        <input
                          type="checkbox"
                          checked={!!row[col.key]}
                          disabled={!col.editable}
                          onChange={(e) => {
                            if (!col.editable) return;
                            const originalIdx = sortedData[rowIdx]._originalIdx;
                            const newData = [...tableData];
                            newData[originalIdx][col.key] = e.target.checked;
                            setTableData(newData);
                            handleEdit(rowIdx, col.key, e.target.checked);
                          }}
                          className="form-checkbox h-5 w-5 text-lime-500"
                        />
                      ) : col.type === "select" && col.options ? (
                        <select
                          value={
                            typeof row[col.key] === "number"
                              ? row[col.key]
                              : typeof row[col.key] === "string"
                              ? col.options.find(opt => opt.label === row[col.key])?.value ?? ""
                              : row[col.key]?.value ?? ""
                          }
                          onChange={(e) => {
                            if (!col.editable) return;
                            const selected = col.options?.find(
                              (opt) => String(opt.value) === e.target.value
                            );
                            const originalIdx = sortedData[rowIdx]._originalIdx;
                            const newData = [...tableData];
                            newData[originalIdx][col.key] = selected ? selected.value : 0;
                            setTableData(newData);
                            handleEdit(rowIdx, col.key, selected ? selected.value : 0);
                          }}
                          disabled={!col.editable}
                          className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-2 py-1 rounded w-full"
                        >
                          {col.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : col.type === "select" && col.options && typeof row[col.key] === "number" ? (
                        <span>
                          {col.options.find((opt) => opt.value === row[col.key])?.label ?? ""}
                        </span>
                      ) : col.type === "number" && col.editable ? (
                        <input
                          type="number"
                          value={row[col.key]}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            handleEdit(rowIdx, col.key, value);
                          }}
                          className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-400 border border-transparent"
                        />
                      ) : col.type === "currency" && col.editable ? (
                        <input
                          type="number"
                          value={row[col.key]}
                          onChange={(e) => handleEdit(rowIdx, col.key, Number(e.target.value))}
                          className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-2 py-1 rounded w-full border border-transparent focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-400"
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
                    ) : col.type === "textarea" && col.editable ? (
                      <textarea
                        value={row[col.key] ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          const originalIdx = sortedData[rowIdx]._originalIdx;
                          const newData = [...tableData];
                          newData[originalIdx][col.key] = value;
                          setTableData(newData);
                          handleEdit(rowIdx, col.key, value);
                        }}
                        rows={3}
                        className="bg-gray-100! dark:bg-gray-800! text-black! dark:text-white! px-2 py-1 rounded w-full min-w-[360px] border border-transparent focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-400 resize-y"
                      />
                    ) : col.editable ? (
                      <input
                        type="text"
                        value={row[col.key] ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          const originalIdx = sortedData[rowIdx]._originalIdx;
                          const newData = [...tableData];
                          newData[originalIdx][col.key] = value;
                          setTableData(newData);
                          handleEdit(rowIdx, col.key, value);
                        }}
                        className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-2 py-1 rounded w-full border border-transparent focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-400"
                      />
                    ) : (
                      <span>{row[col.key] ?? ""}</span>
                    )}
                    </TableCell>
                  ))}
                  <TableCell className="text-center flex gap-2 align-middle! justify-center" style={{ minWidth: "80px" }}>
                    <button 
                      className="bg-red-500 my-auto hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-lg transition-all flex items-center justify-center"
                      title="Eliminar"
                      onClick={() => handleDelete(row)}
                    >
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
    </div>
  );
};

export default ModernTable;
