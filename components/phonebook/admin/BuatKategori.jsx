import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import PendingButton from "../../button/Pending";
import { showNotif } from "../../../store/notifSlice";

export default function BuatKategori({ cancel, updateKategorilist }) {
  const namaRef = useRef(null);
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/phonebook/kategori/post`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama: namaRef.current.value,
          }),
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa buat kategori");
      }
      dispatch(
        showNotif({
          status: "Success",
          message: "Data berhasil disimpan",
          action: null,
        })
      );
      updateKategorilist(data);
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
      <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-md mx-auto dark-modal rounded-lg overflow-hidden md:max-w-lg ">
          <div className="md:flex">
            <div className="w-full">
              <div className="p-4 border-b-2 border-gray-400">
                <span className="px-3 text-lg font-bold">
                  Buat Kategori Baru
                </span>
              </div>
              <form onSubmit={handleSubmit} className="p-4 mt-2">
                <label className="flex flex-wrap items-center  w-full py-2 px-3">
                  <span className="text-sm mr-2">Nama kategori</span>

                  <input
                    ref={namaRef}
                    className="input-field-sm"
                    type="text"
                    maxLength="50"
                    required
                  />
                </label>

                <div className="flex text-center p-3 pt-4 gap-x-3">
                  {pending ? (
                    <PendingButton />
                  ) : (
                    <>
                      <button
                        onClick={cancel}
                        className="w-full btn-ter py-2 px-6"
                      >
                        Batal
                      </button>
                      <button
                        className="w-full btn-pri py-2 px-6"
                        type="submit"
                      >
                        Upload
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen z-10 overflow-hidden bg-gray-800 opacity-50"></div>
    </>
  );
}
