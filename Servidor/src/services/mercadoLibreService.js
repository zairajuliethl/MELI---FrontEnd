import { fetchExternalAPI } from './httpService.js';
import { mockItems } from '../utils/mock-products.js';
import {generateDescription} from '../utils/product-helpers.js'
export class MercadoLibreService {
  static baseUrl = 'https://api.mercadolibre.com';

  static mockItems = mockItems;

  static async searchProducts(query) {
    // const url = `${this.baseUrl}/sites/MLA/search?q=${query}`;
    // const rawResponse = await fetchExternalAPI(url);

    console.log(query, "QUERY");

    const normalizedQuery = query.toLowerCase();

    const filteredItems = mockItems.filter(item =>
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery)
    );

    const categories = [...new Set(filteredItems.map(item => item.category))];

    const mapperData = {
      author: {
        name: "Zaira Julieth",
        lastname: "Lozano"
      },
      categories: categories.map(name => ({
        name,
        results: filteredItems.filter(item => item.category === name).length
      })),
      items: filteredItems
    };

    return {
      success: true,
      data: mapperData
    };
  }

  static async getProductById(id) {
    const product = this.mockItems.find(item => item.id === id);

      const author = {
      name: "Zaira Julieth",
      lastname: "Lozano"
    };
    
     const mapperData = {
      author,
      item: {
        ...product,
        sold_quantity: '',
        description: generateDescription(product)
      }
    };

    return {
      success: true,
      data: mapperData
    };
  }
}