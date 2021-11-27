import Script from "next/script";

export default function ExportPDF({ data }) {
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
            header: "Laporan makassar 112",
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
              {field: "lat", displayName : "Lattitude"},
              {field: "long", displayName : "Langitude"},
              {field: "sub1", displayName : "Subcategori 1"},
              {field: "sub2", displayName : "Subcategori 2"},
              {field: "sub3", displayName : "Subcategori 3"},
              {field: "dinas", displayName : "Dinas Terkait"},
              {field: "catatanl2", displayName : "Catatan L2"},
              {field: "catatanl3", displayName : "Catatan L3"},
            ],
            type: "json",
            gridHeaderStyle:
              "background-color: gray;  border: 2px solid #3971A5;",
            gridStyle: "border: 1px solid #3971A5;",
            font_size: "10pt",
            style : "table-layout: fixed;",
            header: true,
            footer: true,
            width: "100%",
            height: "100%",
            css: "",
            page_orientation: "landscape",
          })
        }
        className="btn-pri py-1.5 text-sm px-5 tracking-wider"
      >
        PDF
      </button>
    </>
  );
}
