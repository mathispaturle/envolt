import { GetStaticPaths, GetStaticProps } from "next";
import BlogLayout from "@/components/BlogLayout";
import BlogPostMeta from "@/components/BlogPostMeta";
import { getPostSlugs, getPostBySlug } from "@/lib/posts";
import { renderMDX } from "@/lib/mdx";

export default function BlogPost({ meta, slug, Content }: any) {
  return (
    <>
      <BlogPostMeta title={meta.title} description={meta.description} slug={slug} />
      <BlogLayout meta={meta}>
        <Content />
      </BlogLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getPostSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug.replace(/\.mdx$/, "") } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { meta, content, slug } = getPostBySlug(params!.slug as string);
  const Content = await renderMDX(content);
  return {
    props: { meta, slug, Content },
  };
};
