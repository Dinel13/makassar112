import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { kategori } from "../../data";
import { showNotif } from "../../store/notifSlice";
import { makeRFHglUser } from "../../store/rfSlice";

import PendingButton from "../button/Pending";

export default function EditHiglight({ cancel, data }) {
  const kategoriRef = useRef(data.kategori);
  const lokasiRef = useRef(data.lokasi);
  const deskripsiRef = useRef(data.deskripsi);
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const id = data.id;
    try {
      const result = await fetch(
        `../api/highlight/update`,
        {
          method: "PUT",
          body: JSON.stringify({
            kategori: kategoriRef.current.value,
            lokasi: lokasiRef.current.value,
            deskripsi: deskripsiRef.current.value,
            id,
          }),
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa buat highlight");
      }
      dispatch(makeRFHglUser());
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
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-lg mx-auto dark-modal rounded-lg overflow-hidden my-auto mt-10">
          <div className="md:flex">
            <div className="w-full">
              <div className="p-4 border-b-2 border-gray-400">
                <span className="px-3 text-lg font-bold">Edit Higlight</span>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-wrap items-center justify-between p-3"
              >
                <label className="flex flex-wrap w-full items-center pb-1.5 px-3">
                  <span className="">Kategori</span>
                  <select
                    ref={kategoriRef}
                    defaultValue={data.kategori}
                    required
                    className="input-field-sm w-full mt-1"
                    placeholder="Kategori"
                  >
                    <option value=""></option>
                    {kategori.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-wrap w-full items-center py-1.5 px-3">
                  <span className="">Lokasi</span>
                  <input
                    ref={lokasiRef}
                    defaultValue={data.lokasi}
                    className="input-field-sm w-full mt-1"
                    type="text"
                    maxLength="425"
                    required
                  />
                </label>
                <label className="flex flex-wrap w-full items-center py-1.5 px-3">
                  <span className="">Deskripsi</span>
                  <textarea
                    className="input-field-sm w-full mt-1"
                    rows="3"
                    placeholder=""
                    defaultValue={data.deskripsi}
                    ref={deskripsiRef}
                    maxLength="1025"
                  />
                </label>
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
    </>
  );
}
