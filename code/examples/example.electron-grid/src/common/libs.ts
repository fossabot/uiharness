/**
 * Handsomtable.
 *    https://github.com/handsontable/handsontable
 *    https://github.com/handsontable/react-handsontable (not used, ref only)
 */

// HACK - was experiencing a load error related to the module not found.
import '@babel/polyfill/lib/noConflict';

// @ts-ignore
import Handsontable from 'handsontable';
export { Handsontable };

// HACK: Import 'handsontable' like this to make types available globally.
import 'handsontable'; // tslint:disable-line

/**
 * Util
 */
export { css, color, GlamorValue, events } from '@tdb/util/lib';
