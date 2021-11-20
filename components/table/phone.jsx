import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];

const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row) => row.year,
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

export default function Phone() {
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
