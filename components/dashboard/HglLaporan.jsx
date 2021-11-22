import React from "react";
import NewsTicker from "./Ticker";

export default function HglLaporan() {
  return (
    <NewsTicker>
      <div className="text-center h-24  flex-col flex items-center border p-4 dark-sidebar mx-3">
        <p>
          Terjadi Peperangan di daerah Gowa. Laporan telah diteruskan ke pihak
          kepolisisan setempat
        </p>
        <p>11/21/2021</p>
        <p>3:26</p>
      </div>
      <div className="text-center h-24  flex-col flex items-center">
        <p>
          fdsfds fsd fas asdasa sadsad sad sad. fasfafasf asdasd asdasd asdasd
          asdasd asd
        </p>
        <p>10/29/2021</p>
        <p>3:26</p>
      </div>
      <div className="text-center h-24 flex-col flex items-center ">
        <p>
          Tdasdsadasdsa sadsadas sadasda. fasdsaddsad asdasd ada asdasd awdsadasdsafda fa.
          sdfsfsfs sdfsdfsdfsdfsfds sdf dsfsdf fa
        </p>
        <p>1/2y1/2021</p>
        <p>3:26</p>
      </div>
    </NewsTicker>
  );
}
