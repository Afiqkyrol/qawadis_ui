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
import { useState, useEffect } from "react";
import classes from "./smartTableList.module.css";

export default function SmartTableList({
  primaryKey = "id",
  dataList = [],
  columnList = [],
  tableType = "Default",
  rowsPerPage = 5,
  onClickRow = () => {},
  isLoading = false,
  noDataText = "No data available",
  theme = "primary",
}) {
  const [activePage, setActivePage] = useState(1);
  const [activeRow, setActiveRow] = useState(null);

  const extendedColumns = [{ field: "__index", name: "#" }, ...columnList];
  const totalPages = Math.max(1, Math.ceil(dataList.length / rowsPerPage));

  useEffect(() => {
    if (activePage > totalPages) {
      setActivePage(1);
    }
  }, [dataList, rowsPerPage, activePage, totalPages]);

  const start = (activePage - 1) * rowsPerPage;
  const paginatedData = dataList.slice(start, start + rowsPerPage);
  const emptyRows = rowsPerPage - paginatedData.length;

  return (
    <Card
      style={{
        marginBottom: "1rem",
        ...(theme === "primary"
          ? { backgroundColor: "white" }
          : theme === "secondary"
          ? { backgroundColor: "var(--mantine-color-blue-0)" }
          : { backgroundColor: "white" }),
      }}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <ScrollArea>
        <Table
          highlightOnHover
          striped="odd"
          className={
            theme === "primary"
              ? classes.tablePrimary
              : theme === "secondary"
              ? classes.tableSecondary
              : classes.tablePrimary
          }
          withRowBorders={false}
        >
          <TableThead className={classes.headerRow}>
            <TableTr>
              {extendedColumns.map((column) => (
                <TableTh
                  key={column.field}
                  className={
                    theme === "primary"
                      ? classes.headerCellPrimary
                      : theme === "secondary"
                      ? classes.headerCellSecondary
                      : classes.headerCellPrimary
                  }
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

          <TableTbody>
            {isLoading ? (
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
                    key={item[primaryKey] ?? start + rowIndex}
                    className={`
                      ${
                        theme === "primary"
                          ? classes.rowPrimary
                          : classes.rowSecondary
                      }
                      ${
                        activeRow === item[primaryKey] && theme === "primary"
                          ? classes.activeRowPrimary
                          : ""
                      }
                      ${
                        activeRow === item[primaryKey] && theme === "secondary"
                          ? classes.activeRowSecondary
                          : ""
                      }
                    `}
                    style={tableType === "Details" ? {} : { cursor: "default" }}
                    onClick={() => {
                      if (tableType === "Details") {
                        setActiveRow(item[primaryKey]);
                        onClickRow(item[primaryKey]);
                      }
                    }}
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

                      if (column.field === "statusDesc") {
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
                  <TableTr
                    key={`empty-${idx}`}
                    className={
                      theme === "primary"
                        ? classes.emptyRowPrimary
                        : theme === "secondary"
                        ? classes.emptyRowSecondary
                        : classes.emptyRowPrimary
                    }
                  >
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
              Array.from({ length: rowsPerPage }).map((_, idx) => (
                <TableTr
                  key={`no-data-${idx}`}
                  className={
                    theme === "primary"
                      ? classes.emptyRowPrimary
                      : theme === "secondary"
                      ? classes.emptyRowSecondary
                      : classes.emptyRowPrimary
                  }
                >
                  {idx === 0 ? (
                    <TableTd
                      colSpan={extendedColumns.length}
                      style={{
                        textAlign: "center",
                        padding: "24.5px",
                        color: "var(--mantine-color-gray-6)",
                      }}
                    >
                      {noDataText}
                    </TableTd>
                  ) : (
                    extendedColumns.map((column) => (
                      <TableTd
                        key={`${column.field}-no-data-${idx}`}
                        className={classes.emptyCell}
                      >
                        &nbsp;
                      </TableTd>
                    ))
                  )}
                </TableTr>
              ))
            )}
          </TableTbody>
        </Table>
      </ScrollArea>

      <div style={{ marginTop: "6px" }} className="flex justify-center mt-4">
        {isLoading || dataList == null ? (
          <Skeleton height={21} width={200} radius="md" />
        ) : dataList.length > 0 ? (
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={setActivePage}
            size="xs"
          />
        ) : null}
      </div>
    </Card>
  );
}
