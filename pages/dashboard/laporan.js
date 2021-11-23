import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";

const FilteredLaporan = dynamic(
  () => import("../../components/laporan/FilteredLaporan"),
  { loading: () => <p>Loading...</p> }
);
import Search from "../../components/laporan/search";
import Loading from "../../components/loading/Loading";
import SearchName from "../../components/laporan/searchName";

export default function Laporan() {
  const router = useRouter();
  const [statusData, setStatus] = useState({});
  const [session, loading] = useSession();

  if (!loading && !session) {
    router.push("/masuk");
  }

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-6 py-8 min-h-screen">
      <h3 className="text-title font-medium">Filter Laporan</h3>
      <div className="flex flex-wrap justify-between items-center gap-y-8 gap-x-6 my-4">
        <Search setStatus={setStatus} />
        <SearchName setStatus={setStatus} />
      </div>
      {statusData.hasil && <FilteredLaporan data={statusData.hasil} />}
    </div>
  );
}
