import { useState, useEffect, useCallback } from "react";
import Marquee from "react-easy-marquee";
import { useDispatch } from "react-redux";

import { parseDateSQLtoString, parseDateSQLtoStringDate } from "../lib/time";
import { showNotif } from "../store/notifSlice";

export default function MarqueLaporan() {
  const [data, setData] = useState([]);
  const [dataKh, setDataKh] = useState([]);
  const dispatch = useDispatch();

  const getData = useCallback(async (page) => {
      try {
        const result = await fetch(
          `api/laporan/highlight/user`,
          {
            method: "GET",
          }
        );
        const data = await result.json();
        if (!result.ok) {
          throw new Error(data.error || "Tidak bisa mendapat data");
        }

        setData(data);
      } catch (error) {
        dispatch(
          showNotif({
            status: "Error",
            message: error.message,
            action: null,
          })
        );
      }
    },
    [dispatch]
  );

  const getDataKhusus = useCallback(async (page) => {
      try {
        const result = await fetch(
          `api/highlight/get`,
          {
            method: "GET",
          }
        );
        const data = await result.json();
        if (!result.ok) {
          throw new Error(data.error || "Tidak bisa mendapat data");
        }
        setDataKh(data);
      } catch (error) {
        dispatch(
          showNotif({
            status: "Error",
            message: error.message,
            action: null,
          })
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getData();
    getDataKhusus();
  },[getData, getDataKhusus]);

  if (data.length > 0 || dataKh.length > 0) {
    const fast = (data.length * 40000) + (dataKh.length * 25000 )
    return (
      <div className="m-0 dark-card w-full">
        <Marquee
          duration={fast}
          // background="#00DEFB"
          height="35px"
          width="100%"
          axis="X"
          align="center"
          pauseOnHover={true}
          reverse={true}
        >
          {data.map((item) => (
            <div key={item.id} className="text-base whitespace-nowrap mx-6">
              [{item.pelapor},
              <span className="ml-1 mr-2">
                {parseDateSQLtoString(item.updated_at)}]
              </span>
              {item.deskripsi} Lokasi {item.lokasi}
            </div>
          ))}
           {dataKh.map((item) => (
            <div key={item.id} className="text-base whitespace-nowrap mx-6">
              [{item.kategori}]
              <span className="mx-1">
               {item.deskripsi}.
              </span>Lokasi {item.lokasi}
            </div>
          ))}
        </Marquee>
      </div>
    );
  } else {
    return null;
  }
}
