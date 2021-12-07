import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const BuatHiglight = dynamic(
  () => import("../../components/dashboard/BuatHiglight"),
  { loading: () => <p>Loading...</p> }
);
const HglUser = dynamic(() => import("../../components/dashboard/HglUser"), {
  loading: () => <p>Loading...</p>,
});
const HglLaporan = dynamic(
  () => import("../../components/dashboard/HglLaporan"),
  { loading: () => <p>Loading...</p> }
);
const LaporanTerbaru = dynamic(
  () => import("../../components/dashboard/LaporanTerbaru"),
  { loading: () => <p>Loading...</p> }
);
const UpdateExcel = dynamic(
  () => import("../../components/dashboard/UpdateExcel"),
  { loading: () => <p>Loading...</p> }
);
import Loading from "../../components/loading/Loading";
import { showNotif } from "../../store/notifSlice";
import { useDispatch } from "react-redux";

export default function Dashbord() {
  const router = useRouter();
  const [session, loading] = useSession();
  const [upload, setUpload] = useState(false);
  const [buatHgl, setBuatHgl] = useState(false);
  const [dataHg, setDataHg] = useState([]);
  const [dataHgFr, setDataHgFr] = useState([]); // higight front user
  const [mustRfrs, setMustRfrs] = useState(false);
  const [dataCard, setDataCard] = useState(null);
  const dispatch = useDispatch();

  if (!loading && !session) {
    router.push("/masuk");
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/laporan/summary`,
          {
            method: "GET",
          }
        );
        const dataRes = await result.json();
        if (!result.ok) {
          throw new Error(dataRes.error || "Tidak bisa mendapat data");
        }
        console.log(dataRes);
        setDataCard(dataRes);
      } catch (error) {
        dispatch(
          showNotif({
            status: "Error",
            message: error.message,
            action: null,
          })
        );
      }
    };
    getData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <div className="container mx-auto px-2 py-8 min-h-screen">
        <div className="flex gap-x-3 gap-y-6 justify-between items-center">
          <h3 className="text-title font-medium">Dashboard</h3>
          <button onClick={() => setUpload(true)} className="btn-pri py-1 px-3">
            Perbaharui
          </button>
        </div>

        <div className="flex gap-5">
          <div class="flex items-center justify-around p-6  w-64 rounded-xl space-x-2 mt-10 shadow-lg dark-card">
            <div>
              <span class="text-sm font-semibold ">HOMECARE</span>
              <h1 class="text-xl "></h1>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                aria-hidden="true"
                role="img"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 2H9c-1.103 0-2 .897-2 2v5.586l-4.707 4.707A1 1 0 0 0 3 16v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2zm-8 18H5v-5.586l3-3l3 3V20zm8 0h-6v-4a.999.999 0 0 0 .707-1.707L9 9.586V4h10v16z"
                  fill="currentColor"
                />
                <path
                  d="M11 6h2v2h-2zm4 0h2v2h-2zm0 4.031h2V12h-2zM15 14h2v2h-2zm-8 1h2v2H7z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <div class="flex items-center justify-around p-6 bg-white w-64 rounded-xl space-x-2 mt-10 shadow-lg dark-card">
            <div>
              <span class="text-sm font-semibold ">COVID-19</span>
              <h1 class="text-xl ">20 Kasus</h1>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 "
                aria-hidden="true"
                role="img"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.5 12c0 .55-.45 1-1 1s-1-.45-1-1s.45-1 1-1s1 .45 1 1zm4.25-2c.55 0 1-.45 1-1s-.45-1-1-1s-1 .45-1 1s.45 1 1 1zm-3.5 0c.55 0 1-.45 1-1s-.45-1-1-1s-1 .45-1 1s.45 1 1 1zm0 4c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1zM22 11.25v1.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75h-1.54a6.978 6.978 0 0 1-1.52 3.65l1.09 1.09l.01-.01c.29-.29.77-.29 1.06 0c.29.29.29.77 0 1.06l-1.06 1.06c-.29.29-.77.29-1.06 0a.752.752 0 0 1-.01-1.05l-1.09-1.09a7.015 7.015 0 0 1-3.64 1.51v1.54h.01c.41 0 .75.34.75.75s-.34.75-.75.75h-1.5c-.41 0-.75-.34-.75-.75s.33-.74.74-.75v-1.55a6.948 6.948 0 0 1-3.63-1.51l-1.09 1.09l.01.01c.29.29.29.77 0 1.06c-.29.29-.77.29-1.06 0L4.4 18.54a.754.754 0 0 1 0-1.06c.29-.29.76-.29 1.05-.01l1.09-1.09a6.89 6.89 0 0 1-1.5-3.63H3.5c0 .41-.34.75-.75.75S2 13.16 2 12.75v-1.5c0-.41.34-.75.75-.75s.75.34.75.75h1.54c.15-1.37.69-2.61 1.5-3.63L5.45 6.53c-.29.28-.76.28-1.05-.01a.754.754 0 0 1 0-1.06L5.46 4.4c.29-.29.77-.29 1.06 0c.29.29.29.77 0 1.06l-.01.01L7.6 6.56a6.982 6.982 0 0 1 3.63-1.51V3.5a.753.753 0 0 1-.74-.75a.77.77 0 0 1 .76-.75h1.5c.41 0 .75.34.75.75s-.34.75-.75.75h-.01v1.54c1.37.14 2.62.69 3.64 1.51l1.09-1.09a.742.742 0 0 1 .01-1.05c.29-.29.77-.29 1.06 0l1.06 1.06c.29.29.29.77 0 1.06s-.77.29-1.06 0l-.01-.01l-1.09 1.08a7.025 7.025 0 0 1 1.52 3.65h1.54c0-.41.34-.75.75-.75s.75.34.75.75zM17 12c0-2.76-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5zm-5-1c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1zm3.5 0c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1zm-1.75 3c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <div class="flex items-center justify-around p-6 bg-white w-64 rounded-xl space-x-2 mt-10 shadow-lg dark-card">
            <div>
              <span class="text-sm font-semibold ">LAMPU JALAN</span>
              <h1 class="text-xl">20 Kasus</h1>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 "
                aria-hidden="true"
                role="img"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13 6.06V3h-2v3.06c-4.5.5-8 4.31-8 8.93C3 16.1 3.9 17 5.01 17H8c0 2.21 1.79 4 4 4s4-1.79 4-4h2.99c1.11 0 2.01-.9 2.01-2.01c0-4.62-3.5-8.43-8-8.93zM12 15H5c0-3.86 3.14-7 7-7s7 3.14 7 7h-7z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <div class="flex items-center justify-around p-6 bg-white w-64 rounded-xl space-x-2 mt-10 shadow-lg dark-card">
            <div>
              <span class="text-sm font-semibold ">KRIMINAL</span>
              <h1 class="text-xl ">20 Kasus</h1>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 "
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91c4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83c-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25l6 2.25v4.7zM9.91 8.5L8.5 9.91L10.59 12L8.5 14.09l1.41 1.41L12 13.42l2.09 2.08l1.41-1.41L13.42 12l2.08-2.09l-1.41-1.41L12 10.59L9.91 8.5z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <div class="flex items-center justify-around p-6 bg-white w-64 rounded-xl space-x-2 mt-10 shadow-lg dark-card">
            <div>
              <span class="text-sm font-semibold ">KEBAKARAN</span>
              <h1 class="text-xl ">20 Kasus</h1>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 "
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 17c0 .55-.45 1-1 1h-1v-1c0-.55-.45-1-1-1h-1.15c.71-.85 1.15-1.89 1.15-3c0-1.89-1.09-2.84-1.85-3.36c-1.86-1.27-2.23-2.78-2.25-3.72a.507.507 0 0 0-.77-.43c-5.8 3.43-5.15 7-5.13 7.51c.03.96.49 2.07 1.24 3H7c-.55 0-1 .45-1 1v1H5c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v14zm-6.8-5.26c-.08-.46-.07-.85.08-1.28c.54 1.21 2.15 1.64 1.98 3.18c-.19 1.69-2.11 2.37-3.39 1.32c.76-.24 1.4-1.04 1.53-1.63c.12-.55-.11-1.04-.2-1.59z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-y-10 gap-x-6 xl:gap-y-8 my-10">
          <LaporanTerbaru dataHg={dataHg} mustRfrs={mustRfrs} />
          {dataHg &&
          dataHg.length === 0 &&
          dataHgFr &&
          dataHgFr.length === 0 ? (
            <div className="lg:w-3/12 lg:-mt-206">
              <HglLaporan dataHg={dataHg} setDataHg={setDataHg} />
              <HglUser dataHg={dataHgFr} setDataHg={setDataHgFr} />
            </div>
          ) : (
            <div className="lg:w-1/2 lg:-mt-206 ">
              <HglLaporan dataHg={dataHg} setDataHg={setDataHg} />
              <HglUser dataHg={dataHgFr} setDataHg={setDataHgFr} />
            </div>
          )}
        </div>
        {upload && (
          <UpdateExcel
            setMustRfrs={setMustRfrs}
            cancel={() => setUpload(false)}
          />
        )}
        {buatHgl && (
          <BuatHiglight
            setData={setDataHgFr}
            cancel={() => setBuatHgl(false)}
          />
        )}
      </div>

      <div className="fixed right-8 bottom-4">
        <button
          onClick={() => setBuatHgl(true)}
          className="btn-pri py-1 px-3 flex flex-col items-center justify-center text-sm rounded-lg shadow-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Highlight
        </button>
      </div>
    </>
  );
}
