"use client";
import {
  Table,
  TableThead,
  TableTbody,
  TableTr,
  TableTh,
  TableTd,
  ScrollArea,
  Badge,
  Group,
  Text,
  Pagination,
  Card,
  Skeleton,
} from "@mantine/core";
import { useState } from "react";
import classes from "./smartTableList.module.css";

export default function SmartTableList({
  dataList = [],
  columnList = [],
  rowsPerPage = 5,
  isLoading = false,
}) {
  const [activePage, setActivePage] = useState(1);

  const extendedColumns = [{ field: "__index", name: "#" }, ...columnList];
  const start = (activePage - 1) * rowsPerPage;
  const paginatedData = dataList.slice(start, start + rowsPerPage);
  const emptyRows = rowsPerPage - paginatedData.length;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <ScrollArea>
        <Table
          highlightOnHover
          striped="odd"
          className={classes.table}
          withRowBorders={false}
        >
          {/* Table Header */}
          <TableThead className={classes.headerRow}>
            <TableTr>
              {extendedColumns.map((column) => (
                <TableTh
                  key={column.field}
                  className={classes.headerCell}
                  style={{
                    width: column.field === "__index" ? "60px" : "auto",
                    minWidth: column.field === "__index" ? "60px" : "120px",
                  }}
                >
                  {column.name}
                </TableTh>
              ))}
            </TableTr>
          </TableThead>

          {/* Table Body */}
          <TableTbody>
            {isLoading ? (
              // ✅ Show skeleton rows
              Array.from({ length: rowsPerPage }).map((_, rowIdx) => (
                <TableTr key={`skeleton-row-${rowIdx}`}>
                  {extendedColumns.map((column, colIdx) => (
                    <TableTd
                      key={`skeleton-${rowIdx}-${colIdx}`}
                      className={classes.cell}
                    >
                      <Skeleton height={27} width="70%" radius="sm" />
                    </TableTd>
                  ))}
                </TableTr>
              ))
            ) : paginatedData.length > 0 ? (
              <>
                {paginatedData.map((item, rowIndex) => (
                  <TableTr
                    key={item.matchId ?? start + rowIndex}
                    className={classes.row}
                  >
                    {extendedColumns.map((column) => {
                      if (column.field === "__index") {
                        return (
                          <TableTd
                            key="__index"
                            className={classes.cell}
                            style={{
                              width: "60px",
                              minWidth: "60px",
                              textAlign: "center",
                            }}
                          >
                            {start + rowIndex + 1}
                          </TableTd>
                        );
                      }

                      const value = item[column.field];
                      const Icon = column.icon;

                      if (column.field === "status") {
                        return (
                          <TableTd key={column.field} className={classes.cell}>
                            <Badge
                              color={value === "Active" ? "green" : "red"}
                              radius="sm"
                              variant="filled"
                            >
                              {value}
                            </Badge>
                          </TableTd>
                        );
                      }

                      if (Icon) {
                        return (
                          <TableTd key={column.field} className={classes.cell}>
                            <Group>
                              <Icon
                                size={18}
                                stroke={1.5}
                                color={
                                  column.iconColor
                                    ? `var(--mantine-color-${column.iconColor}-6)`
                                    : "white"
                                }
                              />
                              <Text fw={500}>{value}</Text>
                            </Group>
                          </TableTd>
                        );
                      }

                      return (
                        <TableTd key={column.field} className={classes.cell}>
                          {value}
                        </TableTd>
                      );
                    })}
                  </TableTr>
                ))}

                {/* Filler empty rows */}
                {Array.from({ length: emptyRows }).map((_, idx) => (
                  <TableTr key={`empty-${idx}`} className={classes.emptyRow}>
                    {extendedColumns.map((column) => (
                      <TableTd
                        key={`${column.field}-empty-${idx}`}
                        className={classes.emptyCell}
                      >
                        &nbsp;
                      </TableTd>
                    ))}
                  </TableTr>
                ))}
              </>
            ) : (
              <TableTr>
                <TableTd
                  colSpan={extendedColumns.length}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "var(--mantine-color-gray-6)",
                  }}
                >
                  No data available
                </TableTd>
              </TableTr>
            )}
          </TableTbody>
        </Table>
      </ScrollArea>

      <div style={{ marginTop: "6px" }} className="flex justify-center mt-4">
        {isLoading ? (
          <Skeleton height={32} width={200} radius="md" />
        ) : dataList.length > 0 ? (
          <Pagination
            total={Math.ceil(dataList.length / rowsPerPage)}
            value={activePage}
            onChange={setActivePage}
          />
        ) : null}
      </div>
    </Card>
  );
}
