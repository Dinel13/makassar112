import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";

const BuatHiglight = dynamic(
  () => import("../../components/dashboard/BuatHiglight"),
  { loading: () => <p>Loading...</p> }
);
import HglLaporan from "../../components/dashboard/HglLaporan";
import LaporanTerbaru from "../../components/dashboard/LaporanTerbaru";
import UpdateExcel from "../../components/dashboard/UpdateExcel";
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
        <HglLaporan dataHg={dataHg} setDataHg={setDataHg} />
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
  );
}
