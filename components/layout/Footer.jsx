import Link from "next/link";

function Footer(){
  return (
    <footer className="bg-red-500 dark:bg-dark1 text-white ">
      <div className="container px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link href="/">
            <a
              href=""
              className="flex title-font font-medium items-center md:justify-start justify-center"
            >
              <span className="text-xl font-semibold">Makassar 112</span>
            </a>
          </Link>
          <p className="mt-2 text-sm text-gray-300">
            lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="sm:w-1/2 w-full px-4">
            <h2 className="title-font font-medium tracking-widest text-sm mb-1.5">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10 text-gray-300">
              <li>
                <Link href="/bacaan/kategori/Info kegiatan">
                  <a href="" className="hover:text-gray-800">
                    sadsadas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/bacaan/kategori/Materi Kuliah">
                  <a href="" className="hover:text-gray-800">
                    dsad
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/bacaan/kategori/Inspirasif">
                  <a href="" className="hover:text-gray-800">
                    dsad
                  </a>
                </Link>
              </li>
            </nav>
          </div>
          <div className="sm:w-1/2 w-full px-4">
            <h2 className="title-font font-medium tracking-widest text-sm mb-1.5">
              HALAMAN LAIN
            </h2>
            <nav className="list-none mb-10 text-gray-300 ">
              <li>
                <Link href="/about">
                  <a href="" className="hover:text-gray-800">
                    Tentang kami
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/developper">
                  <a href="" className="hover:text-gray-800">
                    Tentang Pengembang
                  </a>
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-purple-700">
        <div className="container mx-auto py-3 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-300 text-sm text-center sm:text-left">
            ©2021 jalur-wisata by
            <a
              href="https://github.com/Dinel13"
              rel="noreferrer"
              target="_blank"
              className="ml-1 font-medium"
            >
              dinel
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a
              href="https://www.instagram.com/salahuddin_hafid/"
              rel="noreferrer"
              target="_blank"
              className="ml-3 "
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
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/salahuddin-hafid/"
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
