/**
 * The `uiharness.yml` configuration file.
 */
export type IUIHarnessElectronConfig = {
  port?: number;

  /**
   * Build args.
   * https://parceljs.org/cli.html
   */
  build?: {
    sourcemaps?: boolean; // Default: true.
    treeshake?: boolean; // Default:true
  };

  /**
   * Flags used to determine what to
   * inclue/exclude within the `init` script.
   */
  init?: {
    scripts?: boolean;
    files?: boolean;
    html?: boolean;
    deps?: boolean;
  };
};

/**
 * The `electron-builder.yml` configuration file.
 */
export type IElectronBuilderConfig = {
  productName?: string;
  appId?: string;
  files?: string[];
  directories?: {
    output?: string;
  };
};
