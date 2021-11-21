import { useSession } from "next-auth/client"
import { useRouter } from "next/router";

import CardMain from "../../components/dashboard/CardMain";
import Loading from "../../components/loading/Loading";

export default function Dashbord() {
  const router = useRouter();
  const [session, loading] = useSession()
  
  if (!loading && !session) {
    router.push("/masuk");
  }

  if (loading) return <Loading />

  return (
    <div className="container mx-auto px-6 py-8 min-h-screen">
      <h3 className="text-title font-medium">Dashboard</h3>
      <div className="mt-4">
        <div className="flex flex-wrap -mx-6">
          <CardMain number="521" text="Phonebook">
            <svg
              className="h-9 w-9"
              viewBox="0 0 28 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                fill="currentColor"
              ></path>
              <path
                d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                fill="currentColor"
              ></path>
              <path
                d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                fill="currentColor"
              ></path>
              <path
                d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                fill="currentColor"
              ></path>
              <path
                d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                fill="currentColor"
              ></path>
              <path
                d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                fill="currentColor"
              ></path>
            </svg>
          </CardMain>
          <CardMain number="200,521" text="Laporan">
            <svg
              className="h-9 w-9"
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
          </CardMain>
          <CardMain number="261" text="Kategori">
            <svg
              className="h-9 w-9"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              ></path>
              <path
                d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                stroke="currentColor"
                strokeWidth="2"
              ></path>
            </svg>
          </CardMain>
        </div>
      </div>

      <div className="flex flex-col mt-12">
        <h3 className="text-subtitle font-medium mb-4">Hightlight laporan</h3>
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b dark-card ">
            SADSA
          </div>
        </div>
      </div>
    </div>
  );
}
