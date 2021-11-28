import { useEffect } from "react";

export default function PDFFile({ data, name, keyword }) {
  useEffect(() => {
    // set all page disply to none
    document.body.style.visibility = "hidden";

    // set display for page id to block
    document.getElementById("page").style.visibility = "visible";
    window.print();

    // return display all elemnt
    document.body.style.visibility = "visible";
  }, []);

  return (
    <div id="page" className="text-gray-800 bg-white text-xs fixed inset-0">
      <div className="relative">
        <div className="mb-6">
          <h3 className="text-xl text-gray-900 mb-1">Laporan {name}</h3>
          {keyword &&
            keyword.map((item) => (
              <p className="text-sm font-extralight" key={item.key}>
                {item.key} : {item.value}
              </p>
            ))}
        </div>

        <table
          className="m-0 w-full text-gray-700 table-fixed border border-gray-600 border-collapse"
          style={{ fontSize: "0.5rem" }}
        >
          <thead className="bg-gray-300 text-gray-800 break-words">
            <tr className="">
              <th className="border border-collapse border-gray-500 p1 w-1/12">
                Id
              </th>
              <th className="border border-collapse border-gray-500 p1 w-2/12">
                {" "}
                Id Laporan
              </th>
              <th className="border border-collapse border-gray-500 p1 w-2/12">
                Kategori
              </th>
              <th className="border border-collapse border-gray-500 p1 w-3/12">
                Deskripsi
              </th>
              <th className="border border-collapse border-gray-500 p1 w-3/12">
                Lokasi Kejadian
              </th>
              <th className="border border-collapse border-gray-500 p1 w-2/12">
                Kecamatan
              </th>
              <th className="border border-collapse border-gray-500 p1 w-2/12">
                Kelurahan
              </th>
              <th className="border border-collapse border-gray-500 p1 w-3/12">
                Catatan
              </th>
              <th className="border border-collapse border-gray-500 p1 w-2/12">
                Waktu Lapor
              </th>
              <th className="border border-collapse border-gray-500 p1 w-1/12">
                Sataus
              </th>
              <th className="border border-collapse border-gray-500 p1 w-2/12">
                Waktu Status
              </th>
              <th className="border border-collapse border-gray-500 p1 w-1/12">
                Nama Pelapor
              </th>
              <th className="border border-collapse border-gray-500 p1 w-2/12">
                NO Telpon
              </th>
              <th className="border border-collapse border-gray-500 p1 w-1/12">
                Channel
              </th>
              <th className="border border-collapse border-gray-500 p1 w-1/12">
                Tipe Panggilan
              </th>
              <th className="border border-collapse border-gray-500 p1 w-1/12">
                Agen L1
              </th>
              <th className="border border-collapse border-gray-500 p1 w-1/12">
                Agen L2
              </th>
              <th className="border border-collapse border-gray-500 p1 w-1/12">
                Agen L3
              </th>
              <th className="border border-collapse border-gray-500 p1 w-1/12">
                LAT
              </th>
              <th className="border border-collapse border-gray-500 p1 w-1/12">
                LONG
              </th>
              <th className="border border-collapse border-gray-500 p1 w-1/12">
                SubC 1
              </th>
              <th className="border border-collapse border-gray-500 p1 w-1/12">
                SubC 2
              </th>
              <th className="border border-collapse border-gray-500 p1 w-1/12">
                SubC 3
              </th>
              <th className="border border-collapse border-gray-500 p1 w-2/12">
                Dinas Terkait
              </th>
              <th className="border border-collapse border-gray-500 p1 w-1/12">
                Cattn L2
              </th>
              <th className="border border-collapse border-gray-500 p1 w-1/12">
                Cattn L3
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border border-collapse border-gray-500">
                  {item.id}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.id_laporan}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.kategori}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.deskripsi}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.lokasi}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.kecamatan}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.kelurahan}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.catatan}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.created_at}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.status}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.updated_at}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.pelapor}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.telp}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.channel}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.tipe}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.agenl1}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.agenl2}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.agenl3}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.lat}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.long}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.subc1}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.subc2}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.subc3}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.dinas}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.catatanl2}
                </td>
                <td className="border border-collapse border-gray-500">
                  {item.catatanl3}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
