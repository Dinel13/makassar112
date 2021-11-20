import Item from "./Item";

export default function Hasil({ data }) {
  return (
    <div className="flex flex-col my-12">
      <h2 className="text-title mb-3 text-center">Hasil pencarian phone book</h2>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className=" shadow overflow-hidden border-b border-gray-600 sm:rounded-lg dark-card">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-opacity-70">
                <tr>
                  <th
                    scope="col"
                    className=" px-6  py-4 text-left text-xs font-medium uppercase tracking-wider "
                  >
                    Nama Kontak
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider  "
                  >
                    Nomor Kontak
                  </th>
                  <th
                    scope="col"
                    className="  px-6  py-3  text-left text-xs  font-medium    uppercase  tracking-wider "
                  >
                    Kategori
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Wilayah
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Lokasi
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Diupdet
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                {data &&
                  data.map((item) => (
                    <Item
                      key={item.id}
                      data={item}
                    />
                  ))}
              </tbody>
            </table>
           
          </div>
        </div>
      </div>
    </div>
  );
}
