import { describe, expect, it } from 'vitest';
import { getDefaultValue } from '../utils';

describe('Utils', () => {
  describe('getDefaultValue', () => {
    it('get default value correct', () => {
      // has defaultValue when control
      expect(getDefaultValue('defaultValue', 'value', { defaultValue: [true], value: [false] })).toStrictEqual([false]);
      // has defaultValue when not control
      expect(getDefaultValue('defaultValue', 'value', { defaultValue: [true] })).toStrictEqual([true]);
      // defaultValue is undefiend when control
      expect(getDefaultValue('defaultValue', 'value', { defaultValue: undefined, value: [false] })).toStrictEqual([
        false
      ]);
      // defaultValue is undefiend when not control
      expect(getDefaultValue('defaultValue', 'value', { defaultValue: undefined })).toStrictEqual([]);
      // without defaultValue when control
      expect(getDefaultValue('defaultValue', 'value', { value: [false] })).toStrictEqual([false]);
      // without defaultValue when not control
      expect(getDefaultValue('defaultValue', 'value', {})).toStrictEqual([]);
      // control value is undefiend
      expect(getDefaultValue('defaultValue', 'value', { value: undefined })).toStrictEqual([]);
    });
  });
});
