import { PropsWithChildren } from "react";

export default function BlogLayout({
  children,
  meta,
}: PropsWithChildren<{ meta: { title: string; date: string } }>) {
  return (
    <article className="prose dark:prose-invert mx-auto px-4 py-8 max-w-3xl">
      <h1>{meta.title}</h1>
      <p className="text-sm text-gray-400">{meta.date}</p>
      <div>{children}</div>
    </article>
  );
}
