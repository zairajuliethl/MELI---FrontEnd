import api from './api';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    defaults: {
      baseURL: 'http://localhost:3001/api',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }))
}));

describe('API Service', () => {
  test('la instancia de api tiene la configuración correcta', () => {
    expect(api.defaults.baseURL).toBe('http://localhost:3001/api');
    expect(api.defaults.headers['Content-Type']).toBe('application/json');
  });

  test('exporta la instancia de api correctamente', () => {
    expect(api).toBeDefined();
    expect(typeof api).toBe('object');
  });

  test('la instancia de api tiene los métodos esperados', () => {
    expect(api).toHaveProperty('get');
    expect(api).toHaveProperty('post');
    expect(api).toHaveProperty('put');
    expect(api).toHaveProperty('delete');
  });
});