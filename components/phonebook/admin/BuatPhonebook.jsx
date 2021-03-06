import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import PendingButton from "../../button/Pending";
import { showNotif } from "../../../store/notifSlice";

export default function BuatPhoneBook({ cancel, kategoriList }) {
  const namaRef = useRef(null);
  const phoneRef = useRef(null);
  const kategoriRef = useRef(null);
  const wilayahRef = useRef(null);
  const alamatRef = useRef(null);
  const lokasiRef = useRef(null);
  const [status, setStatus] = useState(null);
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);

    try {
      const result = await fetch(
        `../api/phonebook/post`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama: namaRef.current.value,
            phone: phoneRef.current.value,
            kategori: kategoriRef.current.value,
            wilayah: wilayahRef.current.value,
            alamat: alamatRef.current.value,
            lokasi: lokasiRef.current.value,
            status,
          }),
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa buat nomor");
      }
      dispatch(
        showNotif({
          status: "Success",
          message: "Data berhasil disimpan",
          action: null,
        })
      );
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
        <div className="max-w-lg mx-auto dark-modal rounded-lg overflow-hidden my-auto mt-5">
          <div className="md:flex">
            <div className="w-full">
              <div className="p-4 border-b-2 border-gray-400">
                <span className="px-3 text-lg font-bold">
                  Tambah Nomor Baru
                </span>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-wrap items-center justify-between p-3"
              >
                <label className="flex flex-wrap w-full items-center pb-1.5 px-3">
                  <span className="">Nama</span>
                  <input
                    ref={namaRef}
                    className="input-field-sm w-full mt-1"
                    type="text"
                    maxLength="100"
                    required
                  />
                </label>
                <label className="flex flex-wrap w-full items-center py-1.5 px-3">
                  <span className="">Nomor</span>
                  <input
                    ref={phoneRef}
                    className="input-field-sm w-full mt-1"
                    type="text"
                    maxLength="45"
                    required
                  />
                </label>
                <label className="flex flex-wrap w-full items-center py-1.5 px-3">
                  <span className="">Kategori</span>
                  <select
                    ref={kategoriRef}
                    className="input-field-sm w-full mt-1"
                    required
                  >
                    <option value=""></option>
                    {kategoriList.map((item) => (
                      <option key={item.id} value={item.nama}>
                        {item.nama}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-wrap w-full items-center py-1.5 px-3">
                  <span className="">Wilayah</span>
                  <input
                    ref={wilayahRef}
                    className="input-field-sm w-full mt-1"
                    type="text"
                    maxLength="200"
                    required
                  />
                </label>
                <label className="flex flex-wrap w-full items-center py-1.5 px-3">
                  <span className="">Alamat</span>
                  <input
                    ref={alamatRef}
                    className="input-field-sm w-full mt-1"
                    type="text"
                    maxLength="200"
                    required
                  />
                </label>
                <label className="flex flex-wrap w-full items-center py-1.5 px-3">
                  <span className="">Lokasi di Peta</span>
                  <input
                    ref={lokasiRef}
                    className="input-field-sm w-full mt-1"
                    type="text"
                    maxLength="500"
                    required
                  />
                </label>
                <div
                  className="flex flex-wrap items-center py-1.5 px-3"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <span className="mr-4">Status</span>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="status"
                      required
                      value="publik"
                    />
                    <span className="text-sm ml-2">Publik</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="status"
                      value="private"
                    />
                    <span className="text-sm ml-2">Private</span>
                  </label>
                </div>
                <div className="flex justify-end w-full gap-2 p-3">
                  {pending ? (
                    <PendingButton />
                  ) : (
                    <>
                      <button onClick={cancel} className="btn-ter py-2 px-6">
                        Batal
                      </button>
                      <button className="btn-pri py-2 px-6" type="submit">
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
