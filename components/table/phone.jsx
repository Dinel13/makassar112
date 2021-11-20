import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";


const columns = [
  {
    name: "Nama Kontak",
    selector: (row) => row.nama,
    sortable: true,
  },
  {
    name: "Nomor Kontak",
    selector: (row) => row.phone,
    sortable: true,
  },
  {
    name: "Nomor Kontak",
    selector: (row) => row.phone,
    sortable: true,
  },
];

createTheme(
  "solarized",
  {
    text: {
      primary: "#268bd2",
      secondary: "#2aa198",
    },
    background: {
      default: "#002b36",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

export default function Phone({data}) {
//   const [isDark, setDark] = useState(false);

//   // change theme if dark mode is enabled
//   useEffect(() => {
//     if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//       //  if (localStorage.getItem("darkMode") === "true") {
//       setDark(true);
//     } else {
//       setDark(false);
//     }
//   }, [document.documentElement.classList]);

//   console.log(isDark);

//   if (isDark) {
    return (
      <DataTable
        columns={columns}
        data={data}
        theme="solarized"
      ></DataTable>
    );
//   } else {
//     return (
//       <DataTable
//         title="YourBlogCoach"
//         columns={columns}
//         data={data}
//         theme="light"
//       ></DataTable>
//     );
//   }
}
