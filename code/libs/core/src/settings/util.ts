import { join, resolve } from 'path';
import { fs, tmpl } from '../common';

/**
 * Ensures that all entry-points exist, and copies them if necessary.
 */

export async function ensureEntries(args: {
  name: string;
  htmlPath: string;
  defaultHtmlPath: string;
  codePath: string;
  templatesDir: string;
  targetDir: string;
}) {
  const { htmlPath, defaultHtmlPath, codePath } = args;

  const ensureRendererHtml = async () => {
    const isDefault = htmlPath === defaultHtmlPath;
    const entryHtmlFile = resolve(htmlPath);

    // - Always overwrite if this is the default path.
    // - Don't overwrite if a custom HTML path is set, and it already exists.
    if (!isDefault || (await fs.pathExists(entryHtmlFile))) {
      return;
    }

    // Prepare paths.
    const targetDir = `/${args.targetDir.replace(/^\//, '')}`;
    const hops = targetDir
      .replace(/^\//, '')
      .split('/')
      .map(() => '..')
      .join('/');

    // Create template.
    const template = tmpl
      .create()
      .add({
        dir: resolve(args.templatesDir),
        pattern: 'index.html',
        targetDir,
      })
      .use(tmpl.replace({ edge: '__' }))
      .use(tmpl.copyFile());

    // Execute template.
    const variables = {
      NAME: args.name,
      PATH: join(hops, codePath),
    };
    await template.execute({ variables });
  };

  // Prepare.
  await ensureRendererHtml();
}