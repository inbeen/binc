import { mergeConfig } from 'vite';
import type { UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { getExternal } from './external';
import { getLib } from './lib';
import { getTest } from './test';
import { readJsonFile } from '../helpers/file';
import { absCwd } from '../helpers/path';
import type { PackageJson } from 'type-fest';

const viteConfig = async (config: UserConfig = {}) => {
  // 获取每个子包的 package.json 对象
  const pkg = await readJsonFile<PackageJson>(absCwd('package.json'));

  // 获取 external 和 output.globals
  const { external, outputGlobals } = getExternal(pkg);

  const lib = getLib(pkg);

  const test = getTest(pkg);

  const result = {
    plugins: [react(), dts({ tsconfigPath: absCwd('../../tsconfig.app.json'), insertTypesEntry: true })],
    build: {
      lib,
      rollupOptions: {
        external,
        output: { globals: outputGlobals }
      }
    },
    test
  };

  return mergeConfig(result, config) as UserConfig;
};

export default viteConfig;
