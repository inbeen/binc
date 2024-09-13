/**
 * 获取 vite 的 test 配置
 */
export function getTest() {
  return {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts'
  };
}
