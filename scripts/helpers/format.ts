/**
 * check kebab-case
 */
export function isKebabCase(name: string) {
  return /^[a-z]+(-[a-z]+)*$/.test(name);
}

/**
 * kebab-case => PascalCase
 */
export function kebab2Pascal(name: string) {
  return name
    .split('-')
    .map((s) => s.replace(/\b[a-z]/g, (match) => match.toUpperCase()))
    .join('');
}

/**
 * 格式化 package.json 的 name，返回 kebab-case, camelCase, PascalCase
 * name 格式为 @binc/xx-xxx
 */
export function formatPkgName(name: string) {
  const [prefix, suffix] = name.replace('@', '').split('/');
  const lowerPrefix = prefix.replace(/\b[a-z]/g, (match: string) => match.toLocaleLowerCase());
  const upperPrefix = prefix.replace(/\b[a-z]/g, (match: string) => match.toUpperCase());
  const upperSuffix = suffix
    .split('-')
    .map((s) => s.replace(/\b[a-z]/g, (match: string) => match.toUpperCase()))
    .join('');

  return {
    kebab: `${lowerPrefix}-${suffix}`,
    camel: `${lowerPrefix}${upperSuffix}`,
    pascal: `${upperPrefix}${upperSuffix}`
  };
}
