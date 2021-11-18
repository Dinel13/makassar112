import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import ListLaporan from "../../components/laporan/List";

export default function Filter() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
      <h3 className="text-title font-medium">Filter</h3>
     
      <ListLaporan />
    </div>
  );
}
