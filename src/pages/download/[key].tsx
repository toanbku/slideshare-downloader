import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Head from "next/head";

const Default = () => {
  // https://www.slideshare.net/slideshow/embed_code/key/eqjDTzxthdlDus
  const { query } = useRouter();
  const { key } = query;
  const { data, isLoading } = api.embedded.query.useQuery({
    link: `https://www.slideshare.net/slideshow/embed_code/key/${String(key)}`,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto w-full">
        Preparing your document, please wait...
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{data?.title}</title>
      </Head>
      {(data?.imgLinks || []).map((item, idx) => (
        <img key={idx} src={item} alt={`item ${idx}`} />
      ))}
    </div>
  );
};

export default Default;
