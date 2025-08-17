import {
  Table,
  TableThead,
  TableTbody,
  TableTr,
  TableTh,
  TableTd,
} from "@mantine/core";

export default function SmartTableList({ dataList, columnList }) {
  return (
    <Table>
      <TableThead>
        <TableTr>
          {columnList.map((column) => (
            <TableTh key={column.field}>{column.name}</TableTh>
          ))}
        </TableTr>
      </TableThead>

      <TableTbody>
        {dataList.map((item) => (
          <TableTr key={item.matchId}>
            {columnList.map((column) => (
              <TableTd key={column.field}>{item[column.field]}</TableTd>
            ))}
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
}
