import { join, dirname, resolve } from 'node:path';

/**
 * storybook 提供
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
export function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

/**
 * 获取相对于执行脚本位置的绝对路径
 */
export function absCwd(...paths: string[]) {
  return resolve(process.cwd(), ...paths);
}
