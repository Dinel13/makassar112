import DataTable, { createTheme } from "react-data-table-component";
import { useSelector } from "react-redux";

import { parseDateSQLtoString } from "../../lib/time";
import { selectIsDark } from "../../store/themeSlice";
import ExportExcel from "../button/ExportExcel";
import ExportPDF from "../button/ExportPDF";
import { NoData, SortIcon } from "../table/helper";

const columns = [
  {
    name: "Nama Kontak",
    selector: (row) => row.alamat,
    sortable: true,
  },
  {
    name: "Nomor Kontak",
    selector: (row) => row.deskripsi,
    sortable: true,
  },
  {
    name: "Nomor Kontak",
    selector: (row) => row.kategori,
    sortable: true,
  },
  {
    name: "Diupdate",
    selector: (row) => parseDateSQLtoString(row.updated_at),
    sortable: true,
  },
];

createTheme(
  "solarized",
  {
    text: {
      primary: "#F9FAFB",
      secondary: "#F3F4F6",
    },
    background: {
      default: "#3E2C41",
    },
    context: {
      background: "#cb4b16",
      text: "#fff",
    },
    divider: {
      default: "#6B7280",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(29, 28, 28, 0.51)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

export default function FilteredLaporan({ data }) {
  const isDark = useSelector(selectIsDark);

  return (
    <div className="flex flex-col my-12">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h2 className="text-subtitle font-medium  text-center">
          Hasil pencarian
        </h2>
        <div className="flex justify-end items-center gap-2">
          <ExportPDF data={data} />
          <ExportExcel data={data} />
        </div>
      </div>
      <div className="dark-card rounded-xl py-2">
        <DataTable
          sort
          className="dark-card"
          pagination
          defaultSortFieldId={1}
          columns={columns}
          data={data}
          theme={isDark ? "solarized" : "light"}
          sortIcon={<SortIcon />}
          // striped
          noDataComponent={<NoData />}
          highlightOnHover
        ></DataTable>
      </div>
    </div>
  );
}
