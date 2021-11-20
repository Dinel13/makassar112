export default function ItemForAdmin({ data }) {
  return (
    <tr >
      <td className="px-6 py-4 whitespace-nowrap text-sm ">{data.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm ">{data.kategori}</td>
      <td className="px-6 py-4 text-sm">{data.deskripsi}</td>
      <td className="px-6 py-4 text-sm">{data.alamat}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm ">
        <a target="_blank" rel="noreferrer" href={data.lokasi}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        </a>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm ">{parseDateSQLtoString(data.updated_at)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm ">{data.status}</td>
    </tr>
  );
}

const parseDateSQLtoString = (date) => {
  const dateObj = new Date(date);
  return `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}