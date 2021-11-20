import DataTable, { createTheme } from "react-data-table-component";
import { useSelector } from "react-redux";

import { parseDateSQLtoString } from "../../lib/time";
import { selectIsDark } from "../../store/themeSlice";
import ExportExcel from "../button/ExportExcel";
import ExportPDF from "../button/ExportPDF";

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

const SortIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const NoData = () => {
  return (
    <div className="text-center p-5">
      <h3 className="text-xl">Tidak ada data</h3>
    </div>
  );
}

export default function FilteredLaporan({ data }) {
  const isDark = useSelector(selectIsDark);
  return (
    <div className="flex flex-col my-12">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h2 className="text-subtitle font-medium  text-center">
          Semua Data Laporan
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
