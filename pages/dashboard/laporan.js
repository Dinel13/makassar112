import { useSession } from "next-auth/client"
import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";

// const FilteredLaporan = dynamic(
//   () => import("../../components/laporan/FilteredLaporan"),
//   { loading: () => <p>Loading...</p> }
// );
import FilteredLaporan from "../../components/laporan/FilteredLaporan";
import Search from "../../components/laporan/search";
import Loading from "../../components/loading/Loading";

export default function Laporan() {
  const router = useRouter();
  const [statusData, setStatus] = useState({});
  const [session, loading] = useSession()
  
  if (!loading && !session) {
    router.push("/masuk");
  }

  if (loading) return <Loading />

  return (
    <div className="container mx-auto px-6 py-8 min-h-screen">
      <h3 className="text-title font-medium">Filter Laporan</h3>
      <Search setStatus={setStatus} /> 
      {statusData.hasil && <FilteredLaporan data={statusData.hasil} />}
    </div>
  );
}
