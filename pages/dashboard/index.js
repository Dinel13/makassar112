import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react";
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

export default function Dashbord() {
  const router = useRouter();
  const [session, loading] = useSession();
  const [upload, setUpload] = useState(false);
  const [buatHgl, setBuatHgl] = useState(false);
  const [dataHg, setDataHg] = useState([]);
  const [dataHgFr, setDataHgFr] = useState([]); // higight front user
  const [mustRfrs, setMustRfrs] = useState(false);

  if (!loading && !session) {
    router.push("/masuk");
  }

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-2 py-8 min-h-screen">
      <div className="flex gap-x-3 gap-y-6 justify-between items-center">
        <h3 className="text-title font-medium">Dashboard</h3>
        <button onClick={() => setUpload(true)} className="btn-pri py-1 px-3">
          Perbaharui
        </button>
        <button onClick={() => setBuatHgl(true)} className="btn-pri py-1 px-3">
          Buat highlight
        </button>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-y-10 gap-x-6 xl:gap-y-8 my-10">
        <LaporanTerbaru dataHg={dataHg} mustRfrs={mustRfrs} />
        {dataHg.length === 0 && dataHgFr.length === 0 ? (
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
        <BuatHiglight setData={setDataHgFr} cancel={() => setBuatHgl(false)} />
      )}
    </div>
  );
}
