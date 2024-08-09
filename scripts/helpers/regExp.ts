/**
 * 转换为正则（以目标字符串开头的正则）
 */
export const toReg = (item: string) => new RegExp(`^${item}`);
