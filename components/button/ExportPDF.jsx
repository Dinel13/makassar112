import Script from "next/script";

export default function ExportPDF({ data, name }) {
  // filter data to only include the fields if they are not empty or null or 0 or -
  const filteredData = data.map((item) => {
    const newItem = {};
    Object.keys(item).forEach((key) => {
      if (item[key] !== null && item[key] !== "0" && item[key] !== "-") {
        newItem[key] = item[key];
      }
    });
    return newItem;
  });
  const properties = [];

  // push to properties as object with key field and displey name
  Object.keys(filteredData[0]).forEach((key) => {
    properties.push({
      field: key,
      displayName: key,
    });
  });

  return (
    <>
      <>
        <Script src="https://printjs-4de6.kxcdn.com/print.min.js" />
        <Script src="https://printjs-4de6.kxcdn.com/print.min.css" />
      </>
      <button
        type="button"
        onClick={() =>
          printJS({
            printable: data,
            header: `Laporan ${name} makassar 112`,
            properties: [
              { field: "id", displayName: "ID" },
              { field: "id_laporan", displayName: "ID Laporan" },
              { field: "kategori", displayName: "Kategori" },
              { field: "deskripsi", displayName: "Deskripsi Kejadian" },
              { field: "lokasi", displayName: "Lokasi Kejadian" },
              { field: "kecamatan", displayName: "Kecamatan" },
              { field: "kelurahan", displayName: "Kelurahan" },
              { field: "catatan", displayName: "Catatan" },
              { field: "created_at", displayName: "Waktu Lapor" },
              { field: "nama", displayName: "Nama Pelapor " },
              { field: "telp", displayName: "No. Telp " },
              { field: "tipe", displayName: "Tipe Panggilan" },
              { field: "agenl1", displayName: "Agen L1" },
              { field: "dinas", displayName: "Dinas Terkait" },
            ],
            type: "json",
            gridHeaderStyle:
              "background-color: #adb1b4; padding: 5px; border: 1px solid #3971A5;",
            gridStyle:
              "border: 1px solid #3971A5; padding: 5px; word-wrap: break-word; max-width: 100px; text-align: center; text-justify: inter-word ",

            // style:
            //   "font-size: 5rem; table-layout: fixed; width: 100%; backgound-color: black",
          })
        }
        className="btn-pri py-1.5 text-sm px-5 tracking-wider"
      >
        PDF
      </button>
    </>
  );
}
