import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { showNotif } from "../../store/notifSlice";
import PendingButton from "../button/Pending";
import LoadingSmall from "../loading/LoadingSmall";

export default function UpdateExcel({ setMustRfrs, cancel }) {
  const [pending, setPending] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      dispatch(
        showNotif({
          status: "Error",
          message: "File masih kosong",
          action: null,
        })
      );
      return;
    }
    setPending(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/laporan/post`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa upload file");
      }
      dispatch(
        showNotif({
          status: "Success",
          message: data.message || "Data berhasil diperbaharui",
          action: null,
        })
      );
      if (data.data) {
        //cek if new data is exits in ols data
        //new data will hnya berisi data yang lama karena data baru nanti ditambah
        // data.data.map((item) => {
        //   const allData = []
        //   const newData =  dataOld.map((itemOld) => {
        //     console.log(itemOld, "lama");
        //     if(itemOld.id !== item.id){
        //       return itemOld
        //     } else {
        //       return item
        //     }
        //   });
        //   setData(newData)
        // });
        setMustRfrs((prev) => !prev);
      }
      cancel();
    } catch (error) {
      dispatch(
        showNotif({
          status: "Error",
          message: error.message,
          action: null,
        })
      );
    } finally {
      setPending(false);
    }
  };

  const terbaru = async () => {
    setPending(true);
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/laporan/perbaharui`,
        {
          method: "POST",
        }
      );

      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa memperbaharui");
      }
      dispatch(
        showNotif({
          status: "Success",
          message: data.message || "Data berhasil diperbaharui",
          action: null,
        })
      );
      if (data.data) {
        setMustRfrs((prev) => !prev);
      }
      cancel();
    } catch (error) {
      dispatch(
        showNotif({
          status: "Error",
          message: error.message,
          action: null,
        })
      );
    } finally {
      setPending(false);
    }
  };
  return (
    <>
      {/* <div className="opacity-20 fixed inset-0 z-40 bg-black"></div> */}
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none">
        <div className="dark-modal overflow-hidden w-80">
          <div className="flex items-center justify-between py-4 px-6 border-b-2 border-gray-400">
            <span className="text-xl font-semibold">Perbaharui Data</span>
          </div>
          {pending ? (
            <LoadingSmall />
          ) : (
            <div className="flex flex-col justify-center p-5 w-full">
              <div>
                <button onClick={terbaru} className="btn-pri py-2 w-full ">
                  Perbaharui secara otomatis
                </button>
              </div>
              <p className="text-center my-4 text-sm">
                Atau perbaharui data secara manual
              </p>
              <form onSubmit={handleSubmit} className="">
                <div className="flex text-center  gap-x-3">
                  <a
                    href="https://makassar.sakti112.id/dashboard/112/call/report"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-pri py-2 w-full"
                  >
                    Download
                  </a>
                  <label className="flex flex-wrap items-center justify-center btn-las py-2 w-full">
                    <p className="text-sm mr-2 text-center">Upload</p>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      name="file"
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      hidden
                      placeholder="dadas"
                    />
                  </label>
                </div>
                {file && <p className="text-xs pt-1">File : {file.name}</p>}

                <div className="flex text-center justify-end pt-4 gap-x-3">
                  <button onClick={cancel} className="btn-sec py-2 px-4">
                    batal
                  </button>
                  <button className="btn-pri py-2 px-3" type="submit">
                    Perbaharui
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen z-20 overflow-hidden bg-gray-800 opacity-60"></div>
    </>
  );
}
