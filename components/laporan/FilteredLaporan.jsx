import DataTable, { createTheme } from "react-data-table-component";
import { useSelector } from "react-redux";

import { parseDateSQLtoString } from "../../lib/time";
import { selectIsDark } from "../../store/themeSlice";
import ExportExcel from "../button/ExportExcel";
import ExportPDF from "../button/ExportPDF";
import { NoData, SortIcon } from "../table/helper";

const columns = [
  {
    name: "Id",
    selector: (row) => row.id,
    sortable: true,
    grow: 0,
    omit: true,
 
  },
  {
    name: "Kategori",
    selector: (row) => row.kategori,
    sortable: true,
    grow: 1,
  },
  {
    name: "Deskripsi",
    selector: (row) => row.deskripsi,
    sortable: true,
    wrap: true,
    grow: 2,
  },
  { name: "Alamat", selector: (row) => row.alamat, sortable: true, grow: 1 },
  { name: "Pelapor", selector: (row) => row.pelapor, sortable: true, grow: 1 },
  { name: "No. Pelapor", selector: (row) => row.telp, sortable: true, grow: 1 },
  { name: "Catatan", selector: (row) => row.catatan, sortable: true, grow: 1 },
  { name: "Status", selector: (row) => row.status, sortable: true, grow: 1 },
  { name: "Tipe", selector: (row) => row.tipe, sortable: true, grow: 1 },
  { name: "Agen L1", selector: (row) => row.agen, sortable: true, grow: 1 },
  {
    name: "Dinas Terkait",
    selector: (row) => row.dinas,
    sortable: true,
    grow: 1,
    allowOverflow: true,
  },
  {
    name: "Diupdate",
    selector: (row) => parseDateSQLtoString(row.updated_at),
    sortable: true,
    wrap: true,
    grow: 1,
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

const customStyles = {
  table: {
		style: {
      paddingLeft: "6px", // override the cell padding for head cells
		},
	},
  headCells: {
    style: {
      paddingLeft: "4px", // override the cell padding for head cells
      paddingRight: "4px",
    },
  },
  cells: {
    style: {
      padding: "4px", // override the cell padding for data cells
    },
  },
};

export default function FilteredLaporan({ data }) {
  const isDark = useSelector(selectIsDark);

  return (
    <div className="flex flex-col my-12">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h2 className="text-subtitle font-medium  text-center">
          Hasil pencarian
        </h2>
        <div className="flex justify-end items-center gap-2">
          {/* show button if data.length > 0 */}
          {data && data.length > 0 && (
            <>
              <ExportExcel data={data} />
              <ExportPDF data={data} />
            </>
          )}
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
          noDataComponent={<NoData />}
          highlightOnHover
          customStyles={customStyles}
          ></DataTable>
      </div>
    </div>
  );
}
