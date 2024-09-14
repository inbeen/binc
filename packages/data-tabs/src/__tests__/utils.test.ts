import { describe, it, expect } from 'vitest';
import { validate, format, getGroupWidth, getGroupConfig, calcWidth } from '../utils';
import { flatItems, nestItems } from './data';

describe('Utils', () => {
  describe('validate', () => {
    it('validate number', () => {
      expect(validate(0xff)).toBe(true); // 16
      expect(validate(0b10)).toBe(true); // 2
      expect(validate(66.6)).toBe(true); // 10
      expect(validate(-6.6)).toBe(true);
    });

    it('validate string', () => {
      expect(validate('66.6')).toBe(true);
      expect(validate('-6.6')).toBe(true);
      expect(validate('-.66')).toBe(false);
      expect(validate('.666')).toBe(false);
      expect(validate('abcd')).toBe(false);
    });

    it('validate illegal value', () => {
      // @ts-expect-error 预期测试类型错误
      expect(validate([])).toBe(false);
    });
  });

  describe('format', () => {
    it('format invalid', () => {
      expect(format('abcd')).toBe('invalid');
    });

    it('format thousand', () => {
      expect(format(777777)).toBe('777.78k');
    });

    it('format million', () => {
      expect(format('123456789')).toBe('123.46m');
    });

    it('format billion', () => {
      expect(format('111222333444')).toBe('111.22b');
    });

    it('format trillion', () => {
      expect(format('555444333222111')).toBe('555.44t');
    });

    it('format decimal', () => {
      expect(format(77.77)).toBe('77.77');
    });

    it('format negative', () => {
      expect(format(-777777)).toBe('-777.78k');
    });

    it('format zero', () => {
      expect(format(0)).toBe('0');
    });
  });

  describe('getGroupWidth', () => {
    it('should get group width correct', () => {
      expect(getGroupWidth(5)).toBe(224);
    });
  });

  describe('getGroupConfig', () => {
    it('overflow', () => {
      expect(getGroupConfig(flatItems.length - 1, flatItems)).toStrictEqual({
        total: 1,
        a: 1,
        b: 1,
        c: 1,
        long: 1
      });
      expect(getGroupConfig(nestItems.length, nestItems)).toStrictEqual({
        total: 1,
        a: 1,
        group: 1
      });
      expect(getGroupConfig(5, nestItems)).toStrictEqual({
        total: 1,
        a: 1,
        group: 3
      });
    });

    it('not overflow', () => {
      expect(getGroupConfig(flatItems.length, flatItems)).toStrictEqual({
        total: 1,
        a: 1,
        b: 1,
        c: 1,
        long: 1
      });
      expect(getGroupConfig(10, nestItems)).toStrictEqual({
        total: 1,
        a: 1,
        group: 5
      });
    });
  });

  describe('calcWidth', () => {
    it('overflow', () => {
      expect(calcWidth({ a: 1, b: 1, c: 1 }, 400)).toStrictEqual({ itemWidth: 120, minWidth: 488 });
    });

    it('not overflow', () => {
      expect(calcWidth({ a: 1, b: 1, c: 1 }, 1000)).toStrictEqual({ itemWidth: 290, minWidth: undefined });
    });
  });
});
