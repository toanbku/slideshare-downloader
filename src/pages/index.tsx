/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [status, setStatus] = useState("");
  const [link, setLink] = useState("");
  const linkRef = useRef<HTMLInputElement>(null);

  const { data, refetch } = api.basic.query.useQuery(
    {
      link,
    },
    {
      enabled: false,
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDownload = async (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault();

    const value = linkRef?.current?.value;
    if (value) {
      const embedded =
        /slideshare\.net\/slideshow\/embed_code\/key\/(.*)/g.exec(value);
      const normal = /slideshare\.net\/(.*)\/(.*)/g.exec(value);

      // case 1: with embedded link
      if (embedded?.[1]) {
        setStatus(`Success! Please check in new tab`);
        window.open(`/download/${String(embedded[1])}`, "_blank");
      }
      // case 2: with basic link
      else if (normal?.[1] && normal?.[2]) {
        setStatus(`Success! Please check in new tab`);
        setLink(value);
        await refetch();
      }
      // case 3: format not supported -> return error
      else {
        setStatus("Can not detect the link format. Please check again");
      }
    }
  };

  useEffect(() => {
    if (data?.key) {
      window.open(`/download/${String(data.key)}`, "_blank");
    } else {
      setStatus("Error, please try again");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);

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
              <div>
                <span className="mr-4">Resolution</span>
                <input type="radio" defaultChecked id="highest" />
                <label className="ml-1" htmlFor="highest">
                  Highest
                </label>
              </div>
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
                  </td>
                </tr>
                <tr>
                  <td className="px-4">Embedded Link</td>
                  <td className="overflow-x-auto">
                    slideshare.net/slideshow/embed_code/key/****{" "}
                  </td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-2xl font-bold">How to use?</h3>
            <ul className="text-sm">
              <li>1. Input your link to the input above</li>
              <li>2. Click button &#34;Download&#34;</li>
              <li>
                3. In the new tab, Ctrl + P (or Command + P) to print this page
                to PDF version
              </li>
            </ul>
          </div>
          <div className="text-2xl text-white">{status}</div>
        </div>
      </main>
    </>
  );
};

export default Home;
