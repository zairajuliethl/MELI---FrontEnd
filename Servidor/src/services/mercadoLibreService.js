import { fetchExternalAPI } from './httpService.js';

export class MercadoLibreService {
  static baseUrl = 'https://api.mercadolibre.com';

  static async searchProducts(query) {
    const url = `${this.baseUrl}/sites/MLA/search?q=${query}`;
    return await fetchExternalAPI(url);
  }
  static async getProductById(id) {
    const url = `${this.baseUrl}/sites/MLA/search?q=${query}`;
    return await fetchExternalAPI(url);
  }

 
}