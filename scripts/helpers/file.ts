import { readFile } from 'node:fs/promises';

/**
 * 从文件中读取出 JSON 对象
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function readJsonFile<T extends Record<string, any> = Record<string, any>>(filePath: string): Promise<T> {
  const buffer = await readFile(filePath, 'utf-8');
  return JSON.parse(buffer);
}
