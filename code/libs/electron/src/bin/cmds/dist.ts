import {
  constants,
  exec,
  fsPath,
  Listr,
  log,
  logging,
  logInfo,
} from '../common';
import { Settings } from '../settings';
import { bundle } from './bundle';
import { init } from './init';

const { PATH } = constants;

/**
 * Bundles the application ready for distribution.
 */
export async function dist(args: { settings: Settings; silent?: boolean }) {
  const { settings, silent = false } = args;
  process.env.NODE_ENV = 'production';

  const handleError = (error: Error, step: string) => {
    if (silent) {
      throw error;
    } else {
      log.info();
      log.warn(`😩  Failed while ${step}.`);
      log.error(error.message);
      log.info();
      return;
    }
  };

  // Ensure the module is initialized.
  await init({ settings });
  if (!silent) {
    logInfo({ settings, port: false, mainEntry: PATH.MAIN.ENTRY });
  }

  // Build JS bundles and run the electron-builder.
  try {
    await bundle({ settings, silent, prod: true, noSummary: true });
  } catch (error) {
    handleError(error, 'building javascript for electron distribution');
    return;
  }

  // Run the electron `build` command.
  const tasks = new Listr([
    {
      title: `Building      ${log.yellow('electron app')} 🌼`,
      task: () => {
        const cmd = `
          cd ${fsPath.resolve('.')}
          build --x64 --publish=never
        `;
        return exec.run(cmd, { silent: true });
      },
    },
  ]);
  try {
    await tasks.run();
  } catch (error) {
    handleError(error, 'building electron distribution');
    return;
  }

  // Log output
  const config = settings.electron.builderArgs;
  const path = config.outputDir
    ? logging.formatPath(config.outputDir, true)
    : 'UNKNOWN';

  if (!silent) {
    log.info();
    log.info(`🤟  Application packaging complete.\n`);
    log.info.gray(`   • productName: ${log.yellow(config.productName)}`);
    log.info.gray(`   • version:     ${settings.package.version}`);
    log.info.gray(`   • appId:       ${config.appId}`);
    log.info.gray(`   • folder:      ${path}`);
    log.info();
    log.info(`👉  Run ${log.cyan('yarn open')} to run it.`);
    log.info();
  }
}
