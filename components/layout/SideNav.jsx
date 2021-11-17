import Link from "next/link";

export default function SideNav() {
  return (
    <nav className="mt-10">
      <Link href="/dashboard">
        <a className="flex items-center mt-4 py-2 px-6 dark:hover:bg-blue-900 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            ></path>
          </svg>

          <span className="mx-3">Dashboard</span>
        </a>
      </Link>

      <Link href="/dashboard/filter">
        <a className="flex items-center mt-4 py-2 px-6 dark:hover:bg-blue-900 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
            ></path>
          </svg>

          <span className="mx-3">Filter</span>
        </a>
      </Link>

      <Link href="/">
        <a className="flex items-center mt-4 py-2 px-6 dark:hover:bg-blue-900  hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>

          <span className="mx-3">Front Page</span>
        </a>
      </Link>
      <Link href="/dashboard/phonebook">
        <a className="flex items-center mt-4 py-2 px-6 dark:hover:bg-blue-900 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 28 28"
            stroke="currentColor"
          >
            <path d="M26 14V4C26 3.46957 25.7893 2.96086 25.4142 2.58579C25.0391 2.21071 24.5304 2 24 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V24C2 24.5304 2.21071 25.0391 2.58579 25.4142C2.96086 25.7893 3.46957 26 4 26H14" />
            <path
              d="M26 14V4C26 3.46957 25.7893 2.96086 25.4142 2.58579C25.0391 2.21071 24.5304 2 24 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V24C2 24.5304 2.21071 25.0391 2.58579 25.4142C2.96086 25.7893 3.46957 26 4 26H14"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.3334 23.3333C21.5425 23.3333 23.3334 21.5425 23.3334 19.3333C23.3334 17.1242 21.5425 15.3333 19.3334 15.3333C17.1242 15.3333 15.3334 17.1242 15.3334 19.3333C15.3334 21.5425 17.1242 23.3333 19.3334 23.3333Z"
              strokeWidth="3"
            />
            <path
              d="M22.6667 22L26 24.6667M7.33337 8.66667H20.6667M7.33337 14H12.6667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="mx-3">Phonebook</span>
        </a>
      </Link>
    </nav>
  );
}
