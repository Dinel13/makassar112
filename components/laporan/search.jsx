import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";
import { showNotif } from "../../store/notifSlice";
import PendingInline from "../button/PendingInline";
import { parseDateSQLtoStringDate } from "../../lib/time";
import { kategori, kecamatan as kecamatanList } from "../../data";

export default function Search({ setStatus, setKeyword }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const kategoriRef = useRef("semua");
  const kelurahanRef = useRef("semua");
  const [loading, setLoading] = useState(false);
  const [kecamatan, setKecamatan] = useState("semua");
  const [kelurahan, setKelurahan] = useState(null);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({
      loading: true,
      hasil: null,
      search: true,
    });
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/laporan/search`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kategori: kategoriRef.current.value.toLowerCase(),
            kecamatan: kecamatan ? kecamatan : "semua",
            kelurahan: kelurahanRef.current.value,
            startDate: startDate,
            endDate: endDate,
          }),
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa mencari");
      }
      setLoading(false);
      setStatus({
        loading: false,
        hasil: data,
        search: true,
      });
      setKeyword([
        { key: "kategori", value: kategoriRef.current.value.toLowerCase() },
        { key: "kecamatan", value: kecamatan.toLowerCase() },
        { key: "kelurahan", value: kelurahanRef.current.value },
        {
          key: "Waktu",
          value:
            parseDateSQLtoStringDate(startDate) +
            " s/d " +
            parseDateSQLtoStringDate(endDate),
        },
      ]);
    } catch (error) {
      setLoading(false);
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

  // onChange kecamatan set kelurahan data inside kecamatan if kecamatan is selected
  const onChangeKecamatan = (v) => {
    setKecamatan(v);
    kecamatanList.map((kecamatan) => {
      if (kecamatan.nama === v) {
        setKelurahan(kecamatan.kelurahan);
      } else if (v === "semua") {
        setKelurahan(null);
      }
    });
  };
  return (
    <form
      onSubmit={submitHandler}
      className="dark-card inline-flex relative flex-wrap items-center justify-start py-1.5 px-3 gap-x-2 gap-y-5 borderr border-gray-600 rounded-xl"
    >
      <label className="inline-flex items-center">
        {/* <span>Kategori</span> */}
        <select
          ref={kategoriRef}
          required
          className="dark-card shadow-none focus:outline-none rounded-xl text-sm py-2 px-2 ml-2 w-44"
          placeholder="Kategori"
        >
          <option value="semua">KATEGORI</option>
          <option value="semua">SEMUA</option>
          {kategori.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <label className="inline-flex items-center">
        {/* <span>Kecamatan</span> */}
        <select
          onChange={(e) => onChangeKecamatan(e.target.value)}
          value={kecamatan}
          className="dark-card shadow-none focus:outline-none rounded-xl text-sm py-2 px-2 ml-2 w-44"
          placeholder="KECAMATAN"
        >
          <option value="semua">KECAMATAN</option>
          <option value="">SEMUA</option>
          {kecamatanList.map((item) => (
            <option key={item.id} value={item.nama}>
              {item.nama}
            </option>
          ))}
        </select>
      </label>

      <label className="inline-flex items-center">
        {/* <span>KELURAHAN</span> */}
        <select
          ref={kelurahanRef}
          select
          className="dark-card shadow-none focus:outline-none rounded-xl text-sm py-2 px-2 ml-2 w-44"
          placeholder="KELURAHAN"
        >
          <option value="semua">KELURAHAN</option>
          <option value="semua">SEMUA</option>
          {kelurahan &&
            kelurahan.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
      </label>

      {/* <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-l pl-3 border-gray-400"> */}
      <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 ">
        {" "}
        <label className="flex items-center">
          {/* <span>Waktu</span> */}
          {/* // for range date */}
          <div className="flex dark-card shadow-none gap-x-2 items-center rounded-xl ml-2 h-2">
            <div className="bg-transparent focus:outline-none rounded-xl py px-3 w-32 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <g fill="currentColor">
                    <path d="M12 22H5a2 2 0 0 1-2-2l.01-14c0-1.1.88-2 1.99-2h1V3c0-.55.45-1 1-1s1 .45 1 1v1h8V3c0-.55.45-1 1-1s1 .45 1 1v1h1c1.1 0 2 .9 2 2v6h-2v-2H5v10h7v2zm10.13-5.01l.71-.71a.996.996 0 0 0 0-1.41l-.71-.71a.996.996 0 0 0-1.41 0l-.71.71l2.12 2.12zm-.71.71l-5.01 5.01c-.18.18-.44.29-.7.29H14.5c-.28 0-.5-.22-.5-.5v-1.21c0-.27.11-.52.29-.71l5.01-5.01l2.12 2.13z" />
                  </g>
                </svg>
              </div>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="pl-7 bg-transparent text-sm focus:outline-none py px-3"
                selectsStart
                startDate={startDate}
                endDate={endDate}
                //  isClearable
                placeholderText="Awal"
              ></DatePicker>
            </div>
            -
            <div className=" bg-transparent focus:outline-none rounded-xl py-2 px-3 w-32 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <g fill="currentColor">
                    <path d="M12 22H5a2 2 0 0 1-2-2l.01-14c0-1.1.88-2 1.99-2h1V3c0-.55.45-1 1-1s1 .45 1 1v1h8V3c0-.55.45-1 1-1s1 .45 1 1v1h1c1.1 0 2 .9 2 2v6h-2v-2H5v10h7v2zm10.13-5.01l.71-.71a.996.996 0 0 0 0-1.41l-.71-.71a.996.996 0 0 0-1.41 0l-.71.71l2.12 2.12zm-.71.71l-5.01 5.01c-.18.18-.44.29-.7.29H14.5c-.28 0-.5-.22-.5-.5v-1.21c0-.27.11-.52.29-.71l5.01-5.01l2.12 2.13z" />
                  </g>
                </svg>
              </div>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                className="pl-7 bg-transparent text-sm  focus:outline-none py-2 px-3"
                endDate={endDate}
                minDate={startDate}
                //  isClearable
                placeholderText="Akhir"
              />
            </div>
          </div>
        </label>
      </div>
      <div className="inline-flex w-full xs:w-auto justify-center relative">
        {loading ? (
          <PendingInline />
        ) : (
          <button className="btn-sec py-2 px-3 z-0" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
        )}
      </div>
    </form>
  );
}
