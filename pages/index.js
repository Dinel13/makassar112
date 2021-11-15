import Head from "next/head";
import Image from "next/image";

export default function Home() {
 

  return (
    <div>
      <Head>
        <title>makassar 112</title>
        <meta name="description" content="makassar 112" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-green-400">
        <h1 className="">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
     </main>
      <footer className="">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className="">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
