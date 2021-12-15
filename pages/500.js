import Link from "next/link";

export default function Custom500() {
  return (
    <div className="py-24 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5">
        <div className="max-w-md">
          <div className="text-4xl md:text-5xl lg:text-6xl font-dark font-bold">
            500
          </div>
          <p className="text-2xl md:text-3xl py-2 font-light leading-normal">
            Server sedang bermasalah.
          </p>
          <p className="mb-6">
            Tapi jangan khawatir, kamu dapat menemukan banyak hal lainnya dari
            halaman beranda kami{" "}
          </p>
          <Link href="/">
            <a className="px-4 py-2 font-medium btn-sec">Kembali ke beranda</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
