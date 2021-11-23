import Link from "next/link";

function Footer() {
  return (
    <footer className="dark-nav">
      <div className="container px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-80 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link href="/">
            <a
              href=""
              className="flex title-font font-medium items-center md:justify-start justify-center"
            >
              <span className="text-xl tracking-widest font-semibold">
                Makassar 112
              </span>
            </a>
          </Link>
          <p className="mt-2 text-sm ">
            Jl. Ahmad Yani No.2, Bulo Gading, Kec. Ujung Pandang, Kota Makassar,
            Sulawesi Selatan 90171
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center gap-x-3">
          <div className="mx-auto px-4">
            <h2 className="font-semibold tracking-widest text-xl mb-1.5">
              Layanan Lain
            </h2>
            <nav className="list-none mb-10 ">
              <li>
                <Link href="https://makassarkota.go.id/">
                  <a href="" className="">
                    Makassarkota.go.id
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://opendata.makassar.go.id/">
                  <a href="" className="">
                    Opendata.makassar.go.id
                  </a>
                </Link>
              </li>
              <li>
                <Link href="http://portalkerjasama.makassarkota.go.id/">
                  <a href="" className="">
                    Portal kerjasama
                  </a>
                </Link>
              </li>
            </nav>
          </div>
          <div className="mx-auto px-4">
            <h2 className="font-semibold tracking-widest text-xl mb-1.5">
              Kontak
            </h2>
            <nav className="list-none mb-10 ">
              <li>Call Center : 112</li>
              <li>Telepon : (0411) 4671729</li>
              <li>E-mail: diskominfo@makassarkota.go.id</li>
            </nav>
          </div>
        </div>
      </div>
      <div className="mx-auto pb-6">
        <p className="text-sm text-center">
          ©2021 Kominfo Makassar 112. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
