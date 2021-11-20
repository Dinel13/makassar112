import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

import ListLaporan from "../../components/laporan/List";
import Search from "../../components/laporan/search";

export default function Laporan() {
  const [isLoading, setIsLoading] = useState(true); // for session
  const router = useRouter();
  const [statusData, setStatus] = useState({});

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push("/masuk");
      }
      setIsLoading(false);
    });
  }, [router]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h3 className="text-title font-medium">Filter Laporan</h3>

      <Search setStatus={setStatus} />

      <ListLaporan />
    </div>
  );
}
