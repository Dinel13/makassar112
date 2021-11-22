import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import CardMain from "../../components/dashboard/CardMain";
import HglLaporan from "../../components/dashboard/HglLaporan";
import HgLaporan from "../../components/dashboard/HgLaporan";
import HgLaporanY from "../../components/dashboard/HgLaporanY";
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
      <div className="my-8 flex flex-col justify-center py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <h3 className="text-subtitle text-center font-medium my-4">
          Highlight Reports
        </h3>{" "}
        <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto rounded-lg bg-white dark:bg-dark1 border-gray-600 dark:border-white whitespace-normal">
          <HgLaporanY />
        </div>
      </div>
      {/* <div className="my-8 justify-center py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 ">
        <h3 className="text-subtitle text-center font-medium my-4">
          Hightlight laporan
        </h3>
        <div className="dark-card rounded-xl">
          <HgLaporan />
        </div>
      </div> */}
      {/* <div className="w-full rounded-lg border-2 shadow-xl bg-white dark:bg-dark1 border-gray-600 dark:border-white"> */}
      <LaporanTerbaru />
    </div>
  );
}
