import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';
import { getAbsolutePath } from '../scripts/helpers/path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions')
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {}
  },
  async viteFinal(config) {
    // 补充配置
    return mergeConfig(config, {
      plugins: [react()],
      resolve: {
        alias: [
          {
            find: /^@binc\/(.+)$/,
            replacement: join(__dirname, '..', 'packages', '$1', 'src')
          }
        ]
      }
    });
  }
};
export default config;
