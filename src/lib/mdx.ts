import { compile } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { run } from '@mdx-js/mdx';
import { evaluate } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';

export async function renderMDX(source: string) {
  const compiled = await compile(source, {
    outputFormat: 'function-body',
    useDynamicImport: true,
    remarkPlugins: [remarkGfm],
  });

  const { default: Content } = await run(compiled.value, {
    ...runtime,
  });

  return Content;
}
