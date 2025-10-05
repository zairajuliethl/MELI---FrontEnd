import { MercadoLibreService } from '../services/mercadoLibreService.js';

export const getProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await MercadoLibreService.searchProducts(q);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Productos obtenidos desde MercadoLibre API',
        data: result.data,
      });
    } else {
      res.status(result.status).json({
        success: false,
        message: 'Error al obtener productos de MercadoLibre',
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await MercadoLibreService.getProductById(id);
    
    if (result.success) {
      res.json({
        success: true,
        message: `Producto ${id} obtenido de MercadoLibre`,
        data: result.data,
      });
    } else {
      res.status(result.status).json({
        success: false,
        message: `Error al obtener producto ${id} de MercadoLibre`,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
};

