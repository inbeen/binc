import type { UserConfig } from 'vite';
import { coverageConfigDefaults } from 'vitest/config';
import type { PackageJson } from 'type-fest';

/**
 * 获取 vite 的 test 配置
 */
export function getTest(pkg: PackageJson): UserConfig['test'] {
  return {
    name: pkg.name,
    coverage: {
      clean: true,
      provider: 'v8', // or 'istanbul'
      include: ['src/**'],
      exclude: ['src/typings/**', ...coverageConfigDefaults.exclude]
    },
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts'
  };
}
