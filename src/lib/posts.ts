import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.mdx'));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data as {
      title: string;
      description: string;
      date: string;
      keywords: string[];
    },
    content,
  };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  return slugs.map(getPostBySlug);
}
