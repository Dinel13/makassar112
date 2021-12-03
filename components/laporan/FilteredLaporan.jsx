import DataTable, { createTheme } from "react-data-table-component";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

import { parseDateSQLtoString } from "../../lib/time";
import { selectIsDark } from "../../store/themeSlice";
import { NoData, SortIcon } from "../table/helper";
import ExpandebleTable from "./ExpandebleTable";
const ExportExcel = dynamic(() => import("../button/ExportExcel"), {
  loading: () => <p>Loading...</p>,
});
const ExportPDFF = dynamic(() => import("../button/ExportPDFF"), {
  loading: () => <p>Loading...</p>,
});

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
    selector: (row) => row.kategori.replace("/", " "),
    sortable: true,
    wrap: true,
    grow: 0,
  },
  {
    name: "Deskripsi",
    selector: (row) => row.deskripsi,
    sortable: true,
    wrap: true,
    grow: 2,
  },
  {
    name: "Alamat",
    selector: (row) => "KEC. " + row.kecamatan + " KEL. " + row.kelurahan,
    sortable: true,
    wrap: true,
    grow: 1,
  },
  {
    name: "Lokasi",
    selector: (row) => row.lokasi,
    sortable: true,
    wrap: true,
    grow: 2,
  },
  {
    name: "Pelapor",
    selector: (row) => row.pelapor,
    sortable: true,
    wrap: true,
    grow: 1,
  },
  {
    name: "No. Pelapor",
    selector: (row) => row.telp,
    sortable: true,
    wrap: true,
    grow: 1,
  },
  {
    name: "Waktu Lapor",
    selector: (row) => parseDateSQLtoString(row.created_at),
    sortable: true,
    wrap: true,
    grow: 0,
  },
  {
    name: "Agen L1",
    selector: (row) => row.agen1,
    wrap: true,
    sortable: true,
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

export default function FilteredLaporan({ data, keyword }) {
  const isDark = useSelector(selectIsDark);
  
  return (
    <div className="flex flex-col my-12">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h2 className="text-subtitle font-medium">
          Hasil pencarian
          {keyword &&
            keyword.map((item) => (
              <p className="text-sm font-extralight" key={item.key}>
                {item.key} : {item.value}
              </p>
            ))}
        </h2>

        {data && data.length > 0 && (
          <div className="flex justify-end items-center gap-2">
            <ExportExcel data={data} name="Filter-laporan"  />
            <ExportPDFF data={data} name="Filter-laporan" />
          </div>
        )}
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
          responsive={true}
          expandableRows
          expandableRowsComponent={ExpandebleTable}
          highlightOnHover
          customStyles={customStyles}
        ></DataTable>
      </div>
    </div>
  );
}
