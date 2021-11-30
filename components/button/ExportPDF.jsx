import Script from "next/script";

export default function ExportPDF({ data, name }) {

  // filter data to only include the fields if they are not empty or null or 0 or -
  const filteredData = data.map(item => {
    // const newItem = {};
    // Object.keys(item).forEach(key => {
    //   console.log(item[key]);
    //   if (item[key] !== null && item[key] !== "0" && item[key] !== "-") {
    //     newItem[key] = item[key];
    //   }
    // });
    // return newItem;
  });
  const properties = []
 
  // push to properties as object with key field and displey name
  // Object.keys(filteredData[0]).forEach(key => {
  //   properties.push({
  //     field: key,
  //     displayName: key
  //   });
  // });

  return (
    <>
      <>
        <Script  src="https://printjs-4de6.kxcdn.com/print.min.js"/>
        <Script src="https://printjs-4de6.kxcdn.com/print.min.css"/>
      </>
      <button
        type="button"
        onClick={() =>
          printJS({
            printable: data,
            header: `Laporan ${name} makassar 112`,
            properties: [
              {field: "id", displayName : "Id"},
              {field: "id_laporan", displayName : "Id Laporan"},
              {field: "kategori", displayName : "Kategori"},
              {field: "deskripsi", displayName : "Deskripsi"},
              {field: "lokasi", displayName : "Lokasi Kejadian"},
              {field: "kecamatan", displayName : "Kecamatan"},
              {field: "kelurahan", displayName : "Kelurahan"},
              {field: "catatan", displayName : "Catatan"},
              {field: "created_at", displayName : "Waktu Lapor"},
              {field: "status", displayName : "Status"},
              {field: "updated_at", displayName : "Status Time"},
              {field: "nama", displayName : "Nama Pelapor "},
              {field: "telp", displayName : "No. Telp "},
              {field: "channel", displayName : "Channel"},
              {field: "tipe", displayName : "Tipe Panggilan"},
              {field: "agenl1", displayName : "Agen L1"},
              {field: "agenl2", displayName : "Agen L2"},
              {field: "agenl3", displayName : "Agen L3"},
              {field: "lat", displayName : "Lat"},
              {field: "long", displayName : "Long"},
              {field: "sub1", displayName : "SubC 1"},
              {field: "sub2", displayName : "SubC 2"},
              {field: "sub3", displayName : "SubC 3"},
              {field: "dinas", displayName : "Dinas Terkait"},
              {field: "catatanl2", displayName : "Cattn L2"},
              {field: "catatanl3", displayName : "Cattn L3"},
            ],
            type: "json",
            gridHeaderStyle:
              "background-color: #adb1b4; padding: 5px; border: 1px solid #3971A5;",
            gridStyle: "border: 1px solid #3971A5; padding: 5px; word-wrap: break-word; max-width: 30px" ,
            // style : "font-size: 0.7rem; table-layout: fixed; width: 100%; backgound-color: black",
          })
        }
        className="btn-pri py-1.5 text-sm px-5 tracking-wider"
      >
        PDF
      </button>
    </>
  );
}
