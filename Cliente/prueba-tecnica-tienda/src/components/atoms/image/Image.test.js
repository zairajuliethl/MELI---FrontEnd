import React from 'react';
import { render, screen } from '@testing-library/react';
import { Image } from './image';

describe('Image Component', () => {
  test('renderiza correctamente con src y alt', () => {
    render(<Image src="/test-image.jpg" alt="Imagen de prueba" />);
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });

  test('aplica la clase CSS correcta', () => {
    render(<Image src="/test.jpg" alt="Test" />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveClass('image-container');
  });

  test('tiene el atributo src correcto', () => {
    const testSrc = "/path/to/image.png";
    render(<Image src={testSrc} alt="Test image" />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', testSrc);
  });

  test('tiene el atributo alt correcto', () => {
    const testAlt = "Descripción de la imagen";
    render(<Image src="/test.jpg" alt={testAlt} />);
    
    const image = screen.getByAltText(testAlt);
    expect(image).toBeInTheDocument();
  });

  test('puede encontrarse por alt text', () => {
    render(<Image src="/product.jpg" alt="Producto destacado" />);
    
    const image = screen.getByAltText('Producto destacado');
    expect(image).toHaveAttribute('src', '/product.jpg');
  });

  test('renderiza sin errores con props válidas', () => {
    render(<Image src="/placeholder.jpg" alt="Placeholder" />);
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/placeholder.jpg');
    expect(image).toHaveAttribute('alt', 'Placeholder');
  });

  test('renderiza con URLs externas', () => {
    const externalUrl = "https://example.com/image.jpg";
    render(<Image src={externalUrl} alt="Imagen externa" />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', externalUrl);
  });
});