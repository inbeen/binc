import { formatPkgName } from '../helpers/format';
import type { PackageJson } from 'type-fest';

/**
 * 获取 vite 的 lib 配置
 */
export function getLib(pkg: PackageJson = {}) {
  const { name = '' } = pkg;

  const { pascal, kebab } = formatPkgName(name);

  return {
    entry: './src/index.ts',
    name: pascal,
    fileName: kebab
  };
}
