/* eslint-disable @typescript-eslint/no-misused-promises */

import { type NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";

const Home: NextPage = () => {
  const [status, setStatus] = useState("");
  const linkRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDownload = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault();

    const value = linkRef?.current?.value;
    if (value) {
      const embedded =
        /slideshare\.net\/slideshow\/embed_code\/key\/(.*)/g.exec(value);
      const normal = /slideshare\.net\/(.*)\/(.*)/g.exec(value);
      if (embedded?.[1]) {
        setStatus(`Success! Please check in new tab`);
        window.open(`/download/${String(embedded[1])}`, "_blank");
      } else if (normal?.[1] && normal?.[2]) {
        setStatus(`In progress, normal link detected. Comeback later`);
      } else {
        setStatus("Can not detect the link format. Please check again");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Slideshare Downloader</title>
        <meta
          name="description"
          content="Support download Slideshare without register account"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 overflow-auto px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Slideshare{" "}
            <span className="text-[hsl(280,100%,70%)]">Downloader</span>
          </h1>

          <div className="flex w-full max-w-xl flex-col gap-4 rounded-xl bg-white/10 p-4 text-white ">
            <h3 className="text-2xl font-bold">Input Link</h3>
            <form
              className="flex flex-col gap-2 md:gap-4"
              onSubmit={(e) => handleDownload(e)}
            >
              <input
                type="text"
                name="link"
                className="rounded px-4 py-2 text-black"
                placeholder="https://wwww.slideshare.net/***"
                ref={linkRef}
              />
              <button
                type="button"
                onClick={(e) => handleDownload(e)}
                className="mx-auto rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              >
                Download
              </button>
            </form>

            <h3 className="text-2xl font-bold">Supported Link:</h3>
            <table className="w-full table-auto text-sm">
              <tbody>
                <tr>
                  <td className="px-4">Normal Link</td>
                  <td className="overflow-x-auto">
                    slideshare.net/[user_name]/[file_name]{" "}
                    <span className="text-yellow-500">(in progress)</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4">Embedded Link</td>
                  <td className="overflow-x-auto">
                    slideshare.net/slideshow/embed_code/key/****{" "}
                    <span className="text-green-500">(done)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-2xl text-white">{status}</div>
        </div>
      </main>
    </>
  );
};

export default Home;
