import { getItems, getItemById } from './products';
import api from './api';

jest.mock('./api', () => ({
  get: jest.fn()
}));

describe('Products Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getItems', () => {
    test('busca productos con query', async () => {
      const mockResponse = {
        data: {
          items: [
            { id: '1', title: 'iPhone', price: { amount: 1000 } },
            { id: '2', title: 'Samsung', price: { amount: 800 } }
          ]
        }
      };

      api.get.mockResolvedValue(mockResponse);

      const result = await getItems('iPhone');

      expect(api.get).toHaveBeenCalledWith('/items?q=iPhone');
      expect(result).toEqual(mockResponse.data);
    });

    test('maneja errores en la búsqueda', async () => {
      const mockError = new Error('Network error');
      api.get.mockRejectedValue(mockError);

      await expect(getItems('test')).rejects.toThrow('Network error');
      expect(api.get).toHaveBeenCalledWith('/items?q=test');
    });

    test('busca con query vacía', async () => {
      const mockResponse = { data: { items: [] } };
      api.get.mockResolvedValue(mockResponse);

      const result = await getItems('');

      expect(api.get).toHaveBeenCalledWith('/items?q=');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getItemById', () => {
    test('obtiene producto por ID', async () => {
      const mockResponse = {
        data: {
          item: {
            id: 'MLA123',
            title: 'iPhone 13',
            price: { amount: 1200000 }
          }
        }
      };

      api.get.mockResolvedValue(mockResponse);

      const result = await getItemById('MLA123');

      expect(api.get).toHaveBeenCalledWith('/items/MLA123');
      expect(result).toEqual(mockResponse.data);
    });

    test('maneja errores al obtener producto por ID', async () => {
      const mockError = new Error('Product not found');
      api.get.mockRejectedValue(mockError);

      await expect(getItemById('invalid-id')).rejects.toThrow('Product not found');
      expect(api.get).toHaveBeenCalledWith('/items/invalid-id');
    });

    test('obtiene producto con ID válido', async () => {
      const mockResponse = {
        data: {
          item: {
            id: 'MLA456',
            title: 'Samsung Galaxy',
            price: { amount: 800000 },
            description: 'Smartphone Samsung'
          }
        }
      };

      api.get.mockResolvedValue(mockResponse);

      const result = await getItemById('MLA456');

      expect(api.get).toHaveBeenCalledWith('/items/MLA456');
      expect(result.item.title).toBe('Samsung Galaxy');
      expect(result.item.price.amount).toBe(800000);
    });
  });
});