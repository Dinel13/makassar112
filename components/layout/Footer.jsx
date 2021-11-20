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
              <span className="text-xl tracking-widest font-semibold">Makassar 112</span>
            </a>
          </Link>
          <p className="mt-2 text-sm ">
            Jl. Ahmad Yani No.2, Bulo Gading, Kec. Ujung Pandang, Kota Makassar,
            Sulawesi Selatan 90171
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="sm:w-1/2 w-full px-4">
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
          <div className="sm:w-1/2 w-full px-4">
            <h2 className="font-semibold tracking-widest text-xl mb-1.5">
              Hubungi Kami
            </h2>
            <nav className="list-none mb-10 ">
              <li>Telp./WA: +62 811 xxx xxx</li>
              <li>E-mail: cccc@cccc.go.id</li>
              <span className="inline-flex sm:ml-auto mt-3 justify-center sm:justify-start">
                <a
                  href="https://www.instagram.com/"
                  rel="noreferrer"
                  target="_blank"
                  className=""
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/"
                  rel="noreferrer"
                  target="_blank"
                  className="ml-3"
                >
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="none"
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                    ></path>
                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                  </svg>
                </a>
              </span>
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
