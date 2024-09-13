import { defineConfig, coverageConfigDefaults } from 'vitest/config';

// only for whole project
export default defineConfig({
  test: {
    coverage: {
      clean: true,
      provider: 'v8', // or 'istanbul'
      include: ['packages/*/src/**', 'src/**'],
      exclude: ['packages/*/src/typings/**', ...coverageConfigDefaults.exclude]
    },
    environment: 'jsdom'
  }
});
