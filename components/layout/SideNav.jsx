import Link from "next/link";

export default function SideNav() {
  return (
    <nav className="mt-5 text-sm">
      <Link href="/dashboard">
        <a className="flex items-center mt-4 py-2 px-6 dark:hover:bg-blue-900 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8zm0 3h4v2h-4zm0-6h8v2h-8z" />
            </g>
          </svg>

          <span className="mx-3">Laporan</span>
        </a>
      </Link>

      <Link href="/dashboard/laporan">
        <a className="flex items-center mt-4 py-2 px-6 dark:hover:bg-blue-900 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor">
              <path d="M6 22a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h8.172a3 3 0 0 1 2.12.879l3.83 3.828A3 3 0 0 1 21 8.828V19a3 3 0 0 1-3 3H6zm-1-3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9h-3a3 3 0 0 1-3-3V4H6a1 1 0 0 0-1 1v14zM16 8h2.586L15 4.414V7a1 1 0 0 0 1 1zm0 5a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0v-4zm-3 2a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm-4 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9z" />
            </g>
          </svg>
          <span className="mx-3">History Laporan</span>
        </a>
      </Link>

      <Link href="/dashboard/phonebook">
        <a className="flex items-center mt-4 py-2 px-6 dark:hover:bg-blue-900 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor">
              <path d="M15 12h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3zm4 0h2a9 9 0 0 0-9-9v2c3.87 0 7 3.13 7 7zm1 3.5c-1.25 0-2.45-.2-3.57-.57c-.1-.03-.21-.05-.31-.05c-.26 0-.51.1-.71.29l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1c0 9.39 7.61 17 17 17c.55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM5.03 5h1.5c.07.88.22 1.75.45 2.58l-1.2 1.21c-.4-1.21-.66-2.47-.75-3.79zM19 18.97c-1.32-.09-2.6-.35-3.8-.76l1.2-1.2c.85.24 1.72.39 2.6.45v1.51z" />
            </g>
          </svg>
          <span className="mx-3">Phonebook</span>
        </a>
      </Link>

      <Link href="/dashboard/frontpage">
        <a className="flex items-center mt-4 py-2 px-6 dark:hover:bg-blue-900  hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor">
              <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z" />
            </g>
          </svg>

          <span className="mx-3">Front Page</span>
        </a>
      </Link>
    </nav>
  );
}
