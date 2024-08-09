import { mergeConfig } from 'vite';
import type { UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { getExternal } from './external';
import { getLib } from './lib';
import { readJsonFile } from '../helpers/file';
import { absCwd } from '../helpers/path';
import type { PackageJson } from 'type-fest';

const viteConfig = async (config: UserConfig = {}) => {
  // 获取每个子包的 package.json 对象
  const pkg = await readJsonFile<PackageJson>(absCwd('package.json'));

  // 获取 external 和 output.globals
  const { external, outputGlobals } = getExternal(pkg);

  const lib = getLib(pkg);

  const result = {
    plugins: [react(), dts({ tsconfigPath: '../../tsconfig.app.json', insertTypesEntry: true })],
    build: {
      lib,
      rollupOptions: {
        external,
        output: { globals: outputGlobals }
      }
    }
  };

  return mergeConfig(result, config) as UserConfig;
};

export default viteConfig;
