import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import HglLaporan from "../../components/dashboard/HglLaporan";
import LaporanTerbaru from "../../components/dashboard/LaporanTerbaru";
import Loading from "../../components/loading/Loading";

export default function Dashbord() {
  const router = useRouter();
  const [session, loading] = useSession();

  if (!loading && !session) {
    router.push("/masuk");
  }

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-2 py-8 min-h-screen">
      <h3 className="text-title font-medium">Dashboard</h3>
      <div className="flex flex-col-reverse lg:flex-row gap-y-10 gap-x-6 xl:gap-y-8 my-10">
        <LaporanTerbaru />
        <HglLaporan />
      </div>
    </div>
  );
}
