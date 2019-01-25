import { constants, fs, fsPath, log, logging, logInfo, value } from '../common';
import { Settings } from '../settings';

/**
 * Prints stats about the bundle.
 */
export async function stats(args: {
  settings: Settings;
  moduleInfo?: boolean;
  prod?: boolean;
}) {
  const { settings, prod } = args;
  const moduleInfo = value.defaultValue(args.moduleInfo, true);
  if (moduleInfo) {
    logInfo({ settings, port: false });
  }

  await logDir(constants.PATH.MAIN.OUT_DIR);

  if (prod === undefined || prod === false) {
    await logDir(constants.PATH.RENDERER.OUT_DIR.DEV);
  }

  if (prod === undefined || prod === true) {
    await logDir(constants.PATH.RENDERER.OUT_DIR.PROD);
  }

  log.info();
}

/**
 * internal
 */
async function logDir(dir: string) {
  dir = fsPath.resolve(dir);

  if (!(await fs.pathExists(dir))) {
    return;
  }

  const res = await logging.fileStatsTable({ dir });

  log.info('', logging.formatPath(dir, true));
  res.table.log();
  log.info();
}
