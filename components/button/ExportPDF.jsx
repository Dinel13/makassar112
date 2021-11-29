import Script from "next/script";

export default function ExportPDF({ data, name }) {
  return (
    <>
      <>
        <Script  src=" https://printjs-4de6.kxcdn.com/print.min.js" />
        <Script src=" https://printjs-4de6.kxcdn.com/print.min.css" />
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
            css: "font-size: 10ps; word-wrap: break-word;",
            style : "font-size: 10px; table-layout: fixed; width: 100%",
          })
        }
        className="btn-pri py-1.5 text-sm px-5 tracking-wider"
      >
        PDF
      </button>
    </>
  );
}
