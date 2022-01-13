import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";

import { showNotif } from "../../store/notifSlice";
import { selectIsDark } from "../../store/themeSlice";
import Pagination from "../button/Pagination";
import Loading from "../loading/Loading";
import { NoData } from "../table/helper";
import ExpandebleTable from "./ExpandebleTable";
import HiglightButton from "./HiglightButton";
const ExportExcel = dynamic(() => import("../button/ExportExcel"), {
  loading: () => <p>Loading...</p>,
});
const ExportPDFF = dynamic(() => import("../button/ExportPDFF"), {
  loading: () => <p>Loading...</p>,
});

createTheme(
  "solarize",
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

const columns = [
  {
    name: "Kategori",
    selector: (row) => row.kategori && row.kategori.replace("/", " "),
    sortable: true,
    wrap: true,
    grow: 1,
    // maxWidth: "10%",
  },
  {
    name: "Deskripsi",
    selector: (row) => row.deskripsi,
    sortable: true,
    wrap: true,
    grow: 3,
    // maxWidth: "250px",
  },
  {
    name: "Alamat",
    selector: (row) => "KEC. " + row.kecamatan + " KEL. " + row.kelurahan,
    sortable: true,
    wrap: true,
    grow: 2,
    // maxWidth: "120px",
  },
  {
    name: "Nama Pelapor",
    selector: (row) => row.pelapor,
    sortable: true,
    wrap: true,
    grow: 1,
    // maxWidth: "100px",
  },
  {
    name: "Aksi",
    selector: (row) => HiglightButton(row),
    sortable: false,
    grow: 0,
    // maxWidth: "50px",
  },
];

const customStyles = {
  rows: {
    style: {
      // minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "4px", // override the cell padding for head cells
      paddingRight: "4px",
      whiteSpace: "normal",
    },
  },
  cells: {
    style: {
      padding: "4px",
    },
  },
};

let timer;

export default function LaporanTerbaru({ dataHg, mustRfrs }) {
  const [total, setTotal] = useState({ loading: true, data: null });
  const [loading, setLoading] = useState(false);
  const isDark = useSelector(selectIsDark);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const getData = async (page) => {
    if (page === undefined) {
      page = 1;
    }
    try {
      const result = await fetch(
        `../api/laporan/all/${page}`,
        {
          method: "GET",
        }
      );
      const dataRes = await result.json();
      if (!result.ok) {
        throw new Error(dataRes.error || "Tidak bisa mendapat data");
      }

      setData(dataRes);
    } catch (error) {
      dispatch(
        showNotif({
          status: "Error",
          message: error.message,
          action: null,
        })
      );
    }
  };

  const getTotal = async () => {
    setTotal((s) => ({ ...s, loading: true }));
    try {
      const result = await fetch(
        `../api/laporan/total`,
        {
          method: "GET",
        }
      );
      const dataRes = await result.json();
      if (!result.ok) {
        throw new Error(dataRes.error || "Tidak bisa mendapat data");
      }
      setTotal({
        loading: false,
        data: dataRes.count,
      });
    } catch (error) {
      setTotal({
        loading: false,
        data: null,
      });
      dispatch(
        showNotif({
          status: "Error",
          message: error.message,
          action: null,
        })
      );
    }
  };

  const getDataAgain = async (page) => {
    if (page === undefined) {
      page = 1;
    }
    try {
      const result = await fetch(
        `../api/laporan/all/${page}`,
        {
          method: "GET",
        }
      );
      const dataRes = await result.json();
      if (!result.ok) {
        throw new Error("Tidak bisa");
      }
      setData(dataRes);
    } catch (error) {
      clearInterval(timer);
      dispatch(
        showNotif({
          status: "Error",
          message:
            "Tidak bisa mendapat data higlight terbaru, pastikan koneksi kamu baik",
          action: null,
        })
      );
    }
  };

  const getTotalAgain = async () => {
    try {
      const result = await fetch(
        `../api/laporan/total`,
        {
          method: "GET",
        }
      );
      const dataRes = await result.json();
      if (!result.ok) {
        throw new Error("Tidak bisa");
      }
      setTotal({
        loading: false,
        data: dataRes.count,
      });
    } catch (error) {
      clearInterval(timer);
      dispatch(
        showNotif({
          status: "Error",
          message:
            "Tidak bisa mendapat data higlight terbaru, pastikan koneksi kamu baik",
          action: null,
        })
      );
    }
  };

  useEffect(() => {
    getTotal();
    getData(1);
    timer = setInterval(() => {
      getTotalAgain();
      getDataAgain();
    }, 5 * 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, [mustRfrs]);

  const prevHandler = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      getData(page);
    } else {
      dispatch(
        showNotif({
          status: "Error",
          message: "Kamu sudah di halaman awal",
          action: null,
        })
      );
      return;
    }
  };

  const nextHandler = () => {
    if (total.data < page * 20) {
      dispatch(
        showNotif({
          status: "Error",
          message: "Semua data sudah ditampilkan",
          action: null,
        })
      );
      return;
    } else {
      setPage((prev) => prev + 1);
      getData(page);
    }
  };

  const fileName = `Laporan-${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;

  return (
    <div
      className={
        dataHg && dataHg.length == 0 ? "w-full lg:w-8/12" : "w-full lg:w-6/12"
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h2 className="text-subtitle font-medium  text-center">
          Laporan Terbaru
        </h2>
        {data && !loading && (
          <div className="flex justify-end items-center gap-2">
            <ExportExcel data={data} name={fileName} />
            <ExportPDFF data={data} name={fileName} />
          </div>
        )}
      </div>
      {!loading && data ? (
        <>
          <div className="dark-card rounded-xl pt-2">
            <DataTable
              sort
              className="dark-card p-0"
              defaultSortFieldId={0}
              columns={columns}
              data={data}
              expandableRows
              expandableRowsComponent={ExpandebleTable}
              theme={isDark ? "solarize" : "light"}
              noDataComponent={<NoData />}
              highlightOnHover
              customStyles={customStyles}
            ></DataTable>
          </div>
          {!total.loading && (
            <Pagination
              page={page}
              total={total.data}
              lanjut={nextHandler}
              belum={prevHandler}
            />
          )}
        </>
      ) : (
        <div className="dark-card rounded-xl py-2">
          <Loading />
        </div>
      )}
    </div>
  );
}
