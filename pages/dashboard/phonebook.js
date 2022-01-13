import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/client";

import Hasil from "../../components/phonebook/admin/Hasil";
import Loading from "../../components/loading/Loading";
import { showNotif } from "../../store/notifSlice";
import PhoneBookList from "../../components/phonebook/admin/PhoneBookList";
import { kategori } from "../../data";

const BuatPhoneBook = dynamic(
  () => import("../../components/phonebook/admin/BuatPhonebook"),
  { loading: () => <p>Loading...</p> }
);
const EditPhoneBook = dynamic(
  () => import("../../components/phonebook/admin/EditPhonebook"),
  { loading: () => <p>Loading...</p> }
);
const BuatKategori = dynamic(
  () => import("../../components/phonebook/admin/BuatKategori"),
  { loading: () => <p>Loading...</p> }
);

export default function Phonebook() {
  const [kategoriList, setKategoriList] = useState(kategori);
  const [buatKategori, setBuatKategori] = useState(false);
  const [buatPB, setBuatPB] = useState(false);
  const [updatePB, setUpdatePB] = useState(false);
  const [statusData, setStatus] = useState({});
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const [session, loading] = useSession();
  const router = useRouter();

  if (!loading && !session) {
    router.push("/masuk");
  }

  const getKategori = async () => {
    try {
      const result = await fetch(
        `../api/phonebook/kategori/get`,
        {
          method: "GET",
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa mendapat kategori");
      }
      setKategoriList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getKategori(), []);

  if (loading) return <Loading />;

  const submitSearch = async (e) => {
    e.preventDefault();
    setStatus({
      loading: true,
      hasil: null,
      search: true,
    });
    try {
      const result = await fetch(
        `../api/phonebook/search`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: searchRef.current.value,
          }),
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa mencari");
      }
      setStatus({
        loading: false,
        hasil: data,
        search: true,
      });
      searchRef.current.value = "";
    } catch (error) {
      setStatus({
        loading: false,
        hasil: null,
        search: true,
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

  const lihatSemuaData = () => {
    setStatus({ hasil: null, loading: false, search: false });
  };

  const updateKategorilist = (data) => {
    const newKategori = [...kategoriList, data];
    setKategoriList(newKategori);
  };

  const updateResultSearch = (data) => {
    if (statusData.hasil && statusData.hasil.length > 0) {
      const newHasil = [];
      // update intem inside state if data.id match
      statusData.hasil.forEach((item, index) => {
        if (item.id === data.id) {
          newHasil.push(data);
        } else {
          newHasil.push(item);
        }
      });
      setStatus({
        ...statusData,
        hasil: newHasil,
      });
    }
  };

  return (
    <>
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center justify-between">
          <h3 className="text-title font-medium">Phone Book</h3>
          <form
            onSubmit={submitSearch}
            className="dark-card mt-2 sm:mt-0 flex justify-between items-center py-1 pl-3 pr-1.5 max-w-sm border border-gray-500 rounded-full"
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
            <button
              className="btn-sec ml-2.5 py-2 px-3 rounded-full"
              type="submit"
            >
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
            <div className="p-3">
              <button
                onClick={() => setBuatPB(!buatPB)}
                className="flex items-center px-4 text-sm py-3 justify-center shadow-sm rounded-xl dark-card"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <g fill="currentColor">
                    <path d="M22 9V7h-2v2h-2v2h2v2h2v-2h2V9zM8 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H2v-.99C2.2 16.29 5.3 15 8 15s5.8 1.29 6 2v1zM12.51 4.05C13.43 5.11 14 6.49 14 8s-.57 2.89-1.49 3.95C14.47 11.7 16 10.04 16 8s-1.53-3.7-3.49-3.95zm4.02 9.78C17.42 14.66 18 15.7 18 17v3h2v-3c0-1.45-1.59-2.51-3.47-3.17z" />
                  </g>
                </svg>

                <span className="ml-3">Tambah Nomor Baru</span>
              </button>
            </div>
            <div className="p-3">
              <button
                onClick={() => setBuatKategori(!buatKategori)}
                className="flex items-center text-sm px-4 py-3 justify-center shadow-sm rounded-xl dark-card"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <g fill="currentColor">
                    <path d="M17 19.22H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2v7.22z" />
                    <path d="M19 2h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V7h3V5h-3V2zM7 9h8v2H7zm0 3v2h8v-2h-3zm0 3h8v2H7z" />
                  </g>
                </svg>

                <span className="ml-3">Tambah Kategori Baru</span>
              </button>
            </div>{" "}
          </div>
        </div>
        {statusData.hasil &&
          !statusData.loading &&
          statusData.hasil.length > 0 && (
            <Hasil
              data={statusData.hasil}
              onUpdate={setUpdatePB}
              cancel={lihatSemuaData}
              needRefsh={updatePB}
            />
          )}

        {statusData.hasil &&
          statusData.hasil.length == 0 &&
          !statusData.loading &&
          statusData.search && (
            <div className="mb-16 text-center my-16">
              <h2 className="text-title mb-3 ">Hasil Pencarian</h2>
              <h className="text-subtitle my-10 font-normal">Tidak ada hasil</h>
              <p>
                Pebaiki keyword pencarian kamu atau{" "}
                <button
                  className="underline font-semibold"
                  onClick={lihatSemuaData}
                >
                  Lihat Semua Data
                </button>
              </p>
            </div>
          )}
        {!statusData.hasil && !statusData.loading && (
          <PhoneBookList
            onUpdate={setUpdatePB}
            needRefh={buatPB}
            needRefsh={updatePB}
          />
        )}
        {statusData.loading && (
          <div className="my-16">
            <h2 className="text-title mb-3 text-center">Hasil Pencarian</h2>{" "}
            <Loading />{" "}
          </div>
        )}
      </div>
      {buatKategori && (
        <BuatKategori
          cancel={() => setBuatKategori(!buatKategori)}
          updateKategorilist={updateKategorilist}
        />
      )}
      {buatPB && (
        <BuatPhoneBook
          kategoriList={kategoriList}
          cancel={() => setBuatPB(!buatPB)}
        />
      )}
      {updatePB && (
        <EditPhoneBook
          kategoriList={kategoriList}
          cancel={() => setUpdatePB(null)}
          data={updatePB}
          updateResultSearch={updateResultSearch}
        />
      )}
    </>
  );
}
