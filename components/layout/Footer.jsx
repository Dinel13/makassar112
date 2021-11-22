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
              <li>Telepon : (0411) 4671729</li>
              <li>E-mail: diskominfo@makassarkota.go.id</li>
              <span className="inline-flex sm:ml-auto mt-3 justify-center sm:justify-start">
                <a
                  href="https://www.instagram.com/"
                  rel="noreferrer"
                  target="_blank"
                  className=""
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                  >
                    <g fill="currentColor">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53a4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </g>
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
