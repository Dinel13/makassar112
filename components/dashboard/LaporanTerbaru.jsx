import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

import { parseDateSQLtoString } from "../../lib/time";
import { showNotif } from "../../store/notifSlice";
import { selectIsDark } from "../../store/themeSlice";
import ExportExcel from "../button/ExportExcel";
import ExportPDF from "../button/ExportPDF";
import { SortIcon, NoData } from "../table/helper";

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

export default function LaporanTerbaru({ data }) {
  const [statusData, setStatus] = useState({});
  const isDark = useSelector(selectIsDark);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   (async function () {
  //     setStatus({
  //       loading: true,
  //       hasil: null,
  //     });
  //     try {
  //       const result = await fetch(
  //         `${process.env.NEXT_PUBLIC_URL}/laporan/all`,
  //         {
  //           method: "POST",
  //           headers: {
  //             // "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
              
  //           }),
  //         }
  //       );
  //       const data = await result.json();
  //       if (!result.ok) {
  //         throw new Error(data.error || "Tidak bisa mendapat data");
  //       }
  //       setStatus({
  //         loading: false,
  //         hasil: data,
  //       });
  //     } catch (error) {
  //       setStatus({
  //         loading: false,
  //         hasil: null,
  //       });
  //       dispatch(
  //         showNotif({
  //           status: "Error",
  //           message: error.message,
  //           action: null,
  //         })
  //       );
  //     }
  //   })();
  // });

  return (
    <div className="flex flex-col my-12">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h2 className="text-subtitle font-medium  text-center">
          Laporoan terbaru
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
