import Head from "next/head";

export default function BlogPostMeta({ title, description, slug }: any) {
  const url = `https://envolt.dev/blog/${slug}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Head>
  );
}
