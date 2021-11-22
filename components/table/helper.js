import { createTheme } from "react-data-table-component";

// createTheme(
//   "solarized",
//   {
//     text: {
//       primary: "#F9FAFB",
//       secondary: "#F3F4F6",
//     },
//     background: {
//       default: "#3E2C41",
//     },
//     context: {
//       background: "#cb4b16",
//       text: "#fff",
//     },
//     divider: {
//       default: "#6B7280",
//     },
//     action: {
//       button: "rgba(0,0,0,.54)",
//       hover: "rgba(29, 28, 28, 0.51)",
//       disabled: "rgba(0,0,0,.12)",
//     },
//   },
//   "dark"
// );

createTheme(
  "solarized",
  {
    text: {
      primary: "#F9FAFB",
      secondary: "#F3F4F6",
    },
    background: {
      default: "#3E2C41",
    },
    context: {
      background: "#cb4b16",
      text: "#fff",
    },
    divider: {
      default: "#6B7280",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(29, 28, 28, 0.51)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

export const SortIcon = () => {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   className="h-5 w-5"
    //   viewBox="0 0 20 20"
    //   fill="currentColor"
    // >
    //   <path
    //     fillRule="evenodd"
    //     d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
    //     clipRule="evenodd"
    //   />
    // </svg>
    <div className="p-0.5 flex justify-start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18 6"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M0.412893 2.60642L4.01989 6.55416C4.56303 7.14861 5.44041 7.14861 5.98354 6.55416L9.59054 2.60642C10.4679 1.64616 9.84122 0 8.60175 0H1.38776C0.148287 0 -0.464485 1.64616 0.412893 2.60642Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export const NoData = () => {
  return (
    <div className="text-center p-5">
      <h3 className="text-xl">Tidak ada data</h3>
    </div>
  );
};
