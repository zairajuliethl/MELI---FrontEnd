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
      categories: [{ name: "Electrónica", results: 10 }, { name: "Celulares", results: 50 }, { name: "Smartphones", results: 30 }],
      items: [
        {
          id: "MLA123456789",
          title: "iPhone 13 Pro 128GB - Azul Sierra",
          price: {
            currency: "ARS",
            amount: 999999,
            decimals: 0
          },
          picture: "https://co.tiendasishop.com/cdn/shop/files/IMG-10935081.jpg?v=1723510384&width=823",
          condition: "new",
          free_shipping: true
        },
        {
          id: "MLA987654321",
          title: "Samsung Galaxy S21 Ultra 256GB - Negro Fantasma",
          price: {
            currency: "ARS",
            amount: 849999,
            decimals: 0
          },
          picture: "https://luma.com.co/cdn/shop/files/image-Photoroom_67_8304b5c1-4e0a-45cf-83ea-ae180cdf4c60.png?v=1758641742",
          condition: "new",
          free_shipping: false
        },
        {
          id: "MLA456789123",
          title: "Xiaomi Redmi Note 11 128GB - Gris Grafito",
          price: {
            currency: "ARS",
            amount: 299999,
            decimals: 0
          },
          picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARyWbarbeBiqN3Zg2cCXv5aMZkhxWu-bbEA&s",
          condition: "new",
          free_shipping: true
        },
        {
          id: "MLA654321987",
          title: "Motorola Edge 30 128GB - Plata Aurora",
          price: {
            currency: "ARS",
            amount: 459999,
            decimals: 0
          },
          picture: "https://exitocol.vtexassets.com/arquivos/ids/29073964/MOTOROLA-Moto-Edge-30-128-GB-Azul-Cargador-3406236_a.jpg?v=638877802387800000",
          condition: "used",
          free_shipping: false
        }
      ]
    };

    return {
      success: true,
      data: mapperData
    };
  }

  static async getProductById(id) {
    const url = `${this.baseUrl}/sites/MLA/search:${id}`;
    const rawResponse = await fetchExternalAPI(url);
    const mapData = {
      "author": {
        "name": "Zaira Julieth",
        "lastname": "Lozano"
      },
      "item": {
        "id": "MLA876543210",
        "title": "Samsung Galaxy S24 Ultra 5G 512GB - Gris Titanio",
        "price": {
          "currency": "ARS",
          "amount": 1850000,
          "decimals": 0
        },
        "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARyWbarbeBiqN3Zg2cCXv5aMZkhxWu-bbEA&s",
        "condition": "new",
        "free_shipping": true,
        "sold_quantity": 250,
        "description": "El Galaxy S24 Ultra redefine la experiencia móvil con su chasis de titanio, el potente procesador Snapdragon 8 Gen 3 for Galaxy y una cámara principal de 200MP. Incluye el S Pen integrado y funciones avanzadas de IA (Galaxy AI) para traducción en tiempo real y edición de fotos.\n\nCaracterísticas destacadas:\n- Pantalla Dynamic AMOLED 2X de 6.8 pulgadas.\n- Batería de 5000 mAh con carga súper rápida.\n- Clasificación IP68 de resistencia al agua y al polvo."
      }
    }
    return {
      success: true,
      data: mapData
    };
  }


}