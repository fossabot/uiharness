export * from '../../common/constants';

export const PATH = {
  MAIN_ENTRY: './src/main/main.ts',
  CONFIG: {
    DIR: './.uiharness',
    FILE: 'config.json',
  },
};

export const SCRIPTS = {
  postinstall: 'uiharness-electron init',
  start: 'uiharness-electron start',
  dist: 'uiharness-electron dist',
};

export const PKG = {
  dependencies: {
    '@uiharness/electron': '__LATEST__',
  },
  devDependencies: {
    '@uiharness/electron.dev': '__LATEST__',
  },
};
