import { fetchExternalAPI } from './httpService.js';

export class MercadoLibreService {
  static baseUrl = 'https://api.mercadolibre.com';

  static async searchProducts(query) {
    const url = `${this.baseUrl}/sites/MLA/search?q=${query}`;
    const rawResponse = await fetchExternalAPI(url);
    const mapperData = {
      author: {
        name: "Zaira Julieth",
        lastname: "Lozano"
      },
      categories: rawResponse.data.available_filters,
      items: rawResponse.data.results.map(item => ({
        id: item.id,
        title: item.title,
        price: { currency: item.currency_id, amount: item.price, decimals: 0 },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping
      })),
    };
    return {
      success: true,
      data: mapperData,
      status: rawResponse.status
    };
  }
  static async getProductById(id) {
    const url = `${this.baseUrl}/sites/MLA/search?q=${query}`;
    return await fetchExternalAPI(url);
  }


}