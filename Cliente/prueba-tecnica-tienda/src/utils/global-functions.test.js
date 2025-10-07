import { transformPrice } from './global-functions';

describe('Global Functions', () => {
  describe('transformPrice', () => {
    test('transforma números con puntos como separadores de miles', () => {
      expect(transformPrice(1000)).toBe('1.000');
      expect(transformPrice(10000)).toBe('10.000');
      expect(transformPrice(100000)).toBe('100.000');
      expect(transformPrice(1000000)).toBe('1.000.000');
    });

    test('maneja números menores a 1000 sin puntos', () => {
      expect(transformPrice(0)).toBe('0');
      expect(transformPrice(1)).toBe('1');
      expect(transformPrice(10)).toBe('10');
      expect(transformPrice(100)).toBe('100');
      expect(transformPrice(999)).toBe('999');
    });

    test('maneja números decimales correctamente', () => {
      expect(transformPrice(1234.56)).toBe('1.234.56');
      expect(transformPrice(12345.789)).toBe('12.345.789');
    });

    test('maneja números negativos', () => {
      expect(transformPrice(-1000)).toBe('-1.000');
      expect(transformPrice(-12345)).toBe('-12.345');
    });

    test('maneja números grandes', () => {
      expect(transformPrice(1234567890)).toBe('1.234.567.890');
      expect(transformPrice(999999999)).toBe('999.999.999');
    });

    test('maneja strings de números', () => {
      expect(transformPrice('1000')).toBe('1.000');
      expect(transformPrice('12345')).toBe('12.345');
    });

    test('casos edge', () => {
      expect(transformPrice(1001)).toBe('1.001');
      expect(transformPrice(9999)).toBe('9.999');
      expect(transformPrice(10001)).toBe('10.001');
    });
  });
});