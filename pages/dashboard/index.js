import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import CardMain from "../../components/dashboard/CardMain";
import HglLaporan from "../../components/dashboard/HglLaporan";
import HgLaporan from "../../components/dashboard/HgLaporan";
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
    <div className="container mx-auto px-6 py-8 min-h-screen">
      <h3 className="text-title font-medium">Dashboard</h3>

      <div className="my-8 flex justify-center py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="md:w-3/4 lg:w-2/3 xl:w-1/2 inline-block rounded-lg border-2 shadow-xl bg-white dark:bg-dark1 border-gray-600 dark:border-white">
          <h3 className="text-subtitle text-center font-medium my-4">
            Highlight Reports
          </h3>
          <div className="flex justify-center text-center overflow-y-auto px-2 pb-6">
            <HglLaporan />
          </div>
        </div>
      </div>
      <div className="my-8 flex justify-center py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="w-full rounded-lg border-2 shadow-xl bg-white dark:bg-dark1 border-gray-600 dark:border-white">
          <h3 className="text-subtitle text-center font-medium mt-5">
            Hightlight laporan
          </h3>
          <HgLaporan />
        </div>
      </div>
      <LaporanTerbaru />
    </div>
  );
}
