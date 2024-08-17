// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDefaultValue = (defaultKey: string, valueKey: string, props: Record<string, any>) => {
  const defaultControl = defaultKey in props;
  const valueControl = valueKey in props;
  if (valueControl) {
    return props[valueKey] || [];
  }
  if (defaultControl) {
    return props[defaultKey] || [];
  }
  return [];
};
