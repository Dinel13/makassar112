import { useState, useEffect } from "react";
import Marquee from "react-easy-marquee";
import { useDispatch } from "react-redux";

import { parseDateSQLtoStringDate } from "../lib/time";
import { showNotif } from "../store/notifSlice";

export default function MarqueLaporan() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const getData = async (page) => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/laporan/highlight/user`,
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
  };

  useEffect(() => {
    getData();
  }, []);

  if (data.length > 0) {
    return (
      <div className="m-0 dark-card w-full">
        <Marquee
          duration={25000}
          // background="#00DEFB"
          height="35px"
          width="100%"
          axis="X"
          align="center"
          pauseOnHover={true}
          reverse={true}
        >
          {data.map((item) => (
            <div key={item.id} className="whitespace-nowrap mx-3">
              {item.deskripsi}.
              <span className="mx-1">
                {" "}
                {parseDateSQLtoStringDate(item.updated_at)}
              </span>
              [{item.pelapor}]
            </div>
          ))}
        </Marquee>
      </div>
    );
  } else {
    return null;
  }
}
