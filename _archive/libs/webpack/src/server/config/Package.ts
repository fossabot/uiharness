import { fs, fsPath } from '../common';

export type IPackageJson = {
  name?: string;
  description?: string;
  version?: string;
  main?: string;
  scripts?: { [key: string]: string };
};

const SCRIPTS = {
  postinstall: 'uiharness init',
  start: 'uiharness start',
  bundle: 'uiharness bundle',
  serve: 'serve -s build',
};

/**
 * Represents a `package.json`.
 */
export class Package {
  public static create = (dir?: string) => new Package(dir);

  public readonly path: string;
  public readonly exists: boolean;
  public json: IPackageJson;

  private constructor(dir?: string) {
    dir = dir ? dir : '.';
    dir = dir.trim();
    dir = dir.endsWith('package.json') ? dir : fsPath.join(dir, 'package.json');
    this.path = dir;
    this.exists = fs.existsSync(this.path);
    this.json = this.exists ? fs.readJSONSync(this.path) : {};
  }

  /**
   * Initializes the `package.json` file ensuring all required fields exist.
   */
  public init() {
    const scripts = { ...(this.json.scripts || {}) };
    Object.keys(SCRIPTS).forEach(key => {
      const value = (SCRIPTS[key] || '').trim();
      if (value) {
        scripts[key] = value;
      }
    });
    this.json = { ...this.json, scripts };
    this.save();
  }

  /**
   * Removes default scripts from the `package.json`.
   * NB: Used for debugging purposes only.
   */
  public removeScripts() {
    const scripts = { ...(this.json.scripts || {}) };
    Object.keys(SCRIPTS)
      .filter(key => key !== 'postinstall')
      .forEach(key => {
        const value = SCRIPTS[key];
        if ((scripts[key] || '').trim() === value) {
          delete scripts[key];
        }
      });
    this.json = { ...this.json, scripts };
    this.save();
  }

  public save() {
    const json = JSON.stringify(this.json, null, '  ');
    fs.writeFileSync(this.path, json);
  }
}