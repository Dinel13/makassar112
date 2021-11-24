import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

import Loading from "../../components/loading/Loading";
import UpdateBg from "../../components/UpdateBg";

export default function Laporan() {
  const router = useRouter();
  const [uploadBg, setUploadBg] = useState(false);
  const [session, loading] = useSession();

  if (!loading && !session) {
    router.push("/masuk");
  }

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-6 py-8 min-h-screen">
      <h3 className="text-title font-medium">Front Page</h3>
      <div className="flex flex-wrap  items-center gap-y-4 gap-x-4 my-4">
        <button onClick={() => setUploadBg(true)} className="btn-pri px-6 py-2">
          Ganti Backgroud
        </button>
        <Link href="/">
          <a className="btn-pri px-6 py-2">Lihat Front Page</a>
        </Link>
      </div>
      {uploadBg && <UpdateBg cancel={() => setUploadBg(false)} />}
    </div>
  );
}
