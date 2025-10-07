// utils/product-helpers.js

export function generateDescription(product) {
  const descriptions = {
    "Tecnologia": `
      Este celular combina rendimiento, diseño y tecnología en un solo dispositivo. 
      Cuenta con una potente cámara, una batería de larga duración y una pantalla de alta resolución 
      que ofrece una experiencia visual envolvente. Ideal para quienes buscan un dispositivo moderno 
      para trabajar, estudiar o entretenerse en cualquier lugar.
    `.trim(),

    "Vestuario": `
      Camisa confeccionada con materiales de alta calidad que garantizan comodidad y durabilidad. 
      Su corte moderno y su diseño versátil la hacen perfecta tanto para ocasiones formales como informales. 
      Disponible en una amplia variedad de colores y tallas para adaptarse a todos los estilos.
    `.trim(),

    "Maletas": `
      Maleta resistente y espaciosa, ideal para viajes cortos o largos. 
      Incluye compartimentos organizadores, ruedas giratorias y asa retráctil para facilitar el transporte. 
      Fabricada con materiales de alta calidad que resisten golpes y rasguños.
    `.trim(),
    
    "Cargadores": `
      Cargador multifuncional con capacidad de carga rápida, compatible con múltiples dispositivos. 
      Su diseño compacto y liviano lo convierte en el accesorio ideal para llevar a todas partes. 
      Garantiza una conexión segura y estable en todo momento.
    `.trim(),

    "Hogar": `
      Olla de excelente capacidad y durabilidad, perfecta para cocinar todo tipo de recetas. 
      Fabricada con materiales antiadherentes que facilitan la limpieza y distribución uniforme del calor. 
      Ideal para cocinas familiares o uso profesional.
    `.trim(),
  };

  return descriptions[product.category]
}
