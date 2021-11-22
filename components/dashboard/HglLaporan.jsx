import React from "react";
import NewsTicker from "./Ticker";

export default function HglLaporan() {
  return (
    <NewsTicker>
      <div className="text-center h-24  flex-col flex items-center border p-4 dark-sidebar mx-3">
        <p>
          Terjadi Peperangan di daerah Gowa. Laporan telah diteruskan ke pihak
          kepolisian setempat
        </p>
        <p>11/21/2021</p>
        <p>3:26</p>
      </div>
      <div className="text-center h-24  flex-col flex items-center">
        <p>
          Terjadi kebakaran yang melahap 3 rumah di Sudiang. Lapora telah diteruskan kepada Damkar dan akan tiba dalam waktu 10 menit
        </p>
        <p>10/29/2021</p>
        <p>3:26</p>
      </div>
      <div className="text-center h-24 flex-col flex items-center ">
        <p>
          Terjadi tawuran di Gowa. laporan telah diteruskan ke pihak terkait.
        </p>
        <p>10/29/2021</p>
        <p>3:26</p>
      </div>
    </NewsTicker>
  );
}
