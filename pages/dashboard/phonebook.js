import { useRef, useState } from "react";
import {useDispatch} from "react-redux";
import dynamic from "next/dynamic";

import Hasil from "../../components/phonebook/admin/Hasil";
import Loading from "../../components/loading/Loading";
import { showNotif } from "../../store/notifSlice";

const BuatPhoneBook = dynamic(
  () => import("../../components/phonebook/admin/BuatPhonebook"),
  { loading: () => <p>Loading...</p> }
);
const BuatKategori = dynamic(
  () => import("../../components/phonebook/admin/BuatKategori"),
  { loading: () => <p>Loading...</p> }
);
const BuatWilayah = dynamic(
  () => import("../../components/phonebook/admin/BuatWilayah"),
  { loading: () => <p>Loading...</p> }
);

export default function Phonebook() {
  const [buatKategori, setBuatKategori] = useState(false);
  const [buatWilayah, setBuatWilayah] = useState(false);
  const [buatPB, setBuatPB] = useState(false);
  const [updatePB, setUpdatePB] = useState(false);
  const [status, setStatus] = useState({});
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  const submitSearch = async (e) => {
    e.preventDefault();
    setStatus({
      loading: true,
      hasil: null,
      search : true,
    });
    try {
      // const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/phonebook/search`, {
        const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/phonebook/kategori/get`, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchRef.current.value,
        }),
      });
      const data = await result.json();
      if (!result.ok) {
        console.log(data);
        throw new Error(data.error || "Tidak bisa mencari");
      }
      setStatus({
        loading: false,
        hasil: data,
        search : true,
      });
    } catch (error) {
      setStatus({
        loading: false,
        hasil: null,
        search : true,
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

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center justify-between">
          <h3 className="text-title font-medium">Phone Book</h3>
          <form
            onSubmit={submitSearch}
            className="dark-card flex justify-between items-center py-1 pl-3 pr-1.5 max-w-sm border border-gray-500 rounded-full"
          >
            <label className="">
              <input
                ref={searchRef}
                type="text"
                placeholder="Cari"
                required 
                maxLength="50"
                className="dark-nav bg-transparent focus:outline-none rounded-xl py-2 px-3 w-40"
              ></input>
            </label>
            <button className="btn-sec ml-2.5 py-2.5 px-3 rounded-full" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap -mx-4">
            <div className="p-4 ">
              <button
                onClick={() => setBuatPB(!buatPB)}
                className="flex items-center px-4 py-3 justify-center shadow-sm rounded-xl dark-card"
              >
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 28 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                    fill="currentColor"
                  ></path>
                </svg>

                <span className="ml-3">Buat Nomor baru</span>
              </button>
            </div>
            <div className="p-4 ">
              <button
                onClick={() => setBuatKategori(!buatKategori)}
                className="flex items-center px-4 py-3 justify-center shadow-sm rounded-xl dark-card"
              >
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 28 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                    fill="currentColor"
                  ></path>
                </svg>

                <span className="ml-3">Buat kategori baru</span>
              </button>
            </div>{" "}
            <div className="p-4 ">
              <button
                onClick={() => setBuatWilayah(!buatWilayah)}
                className="flex items-center px-4 py-3 justify-center shadow-sm rounded-xl dark-card"
              >
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 28 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                    fill="currentColor"
                  ></path>
                </svg>

                <span className="ml-3">Buat Wilayah baru</span>
              </button>
            </div>
          </div>
        </div>
        {buatKategori && (
          <BuatKategori cancel={() => setBuatKategori(!buatKategori)} />
        )}
        {buatWilayah && (
          <BuatWilayah cancel={() => setBuatWilayah(!buatWilayah)} />
        )}
        {buatPB && <BuatPhoneBook cancel={() => setBuatPB(!buatPB)} />}
        {status.hasil && !status.loading && (
          <div className="my-16">
            <Hasil />
          </div>
        )}
        {status.loading && (
          <div className="my-16">
            <h2 className="text-title mb-3 text-center">Hasil Pencarian</h2>{" "}
            <Loading />{" "}
          </div>
        )}
        {!status.hasil && !status.loading && status.search && (
          <div className="mb-16 text-center my-16">
            <h2 className="text-title mb-3 ">Hasil Pencarian</h2>
            <h className="text-subtitle my-10 font-normal">
              Tidak ada hasil
            </h>
            <p>Pebaiki keyword pencarian kamu</p>
          </div>
        )}
      </div>
    </main>
  );
}
