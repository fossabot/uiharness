export const URL = {
  SITE: 'https://uiharness.com',
};

const DIR = './.uiharness';
const BUNDLE_DIR = `${DIR}/.bundle`;

export const PATH = {
  UIHARNESS: DIR,
  PACKAGE: `${DIR}/package.json`,
  BUNDLE_DIR,
  TEMPLATES: './node_modules/@uiharness/core/tmpl',
  CONFIG: {
    DIR,
    FILE: 'config.json',
  },
  ELECTRON: {
    MAIN: {
      DEFAULT_ENTRY: './src/test/app.main.ts',
      OUT_FILE: 'main.js',
      OUT_DIR: `${BUNDLE_DIR}/app.main`,
    },
    RENDERER: {
      DEFAULT_ENTRY: './src/test/app.html',
      OUT_FILE: 'app.html',
      OUT_DIR: {
        DEV: `${BUNDLE_DIR}/app.renderer/dev`,
        PROD: `${BUNDLE_DIR}/app.renderer/prod`,
      },
    },
    BUILDER: {
      CONFIG: {
        FILE_NAME: `uiharness.builder.yml`,
      },
      FILES: [
        '.uiharness/.bundle/app.main/**',
        '.uiharness/.bundle/app.renderer/prod/**',
      ],
      OUTPUT: '.uiharness/dist',
    },
  },
  WEB: {
    ENTRY: './src/test/web.html',
    OUT_FILE: 'index.html',
    OUT_DIR: {
      DEV: `${BUNDLE_DIR}/web/dev`,
      PROD: `${BUNDLE_DIR}/web/prod`,
    },
  },
};

export const SCRIPTS = {
  postinstall: 'uiharness init',
  ui: 'uiharness $@',
};

export const PKG = {
  dependencies: {
    '@uiharness/electron': '__LATEST__',
  },
  devDependencies: {
    '@uiharness/core': '__LATEST__',
  },
};
