import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './card';

jest.mock('../../atoms/image/image', () => ({
  Image: ({ src, alt }) => <img data-testid="card-image" src={src} alt={alt} />
}));

describe('Card Component', () => {
  const mockProps = {
    image: '/product-image.jpg',
    price: 150000,
    title: 'Producto de prueba',
    clickCard: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente', () => {
    render(<Card {...mockProps} />);
    
    const card = screen.getByRole('button');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('card');
  });

  test('muestra la imagen del producto', () => {
    render(<Card {...mockProps} />);
    
    const image = screen.getByTestId('card-image');
    expect(image).toHaveAttribute('src', '/product-image.jpg');
    expect(image).toHaveAttribute('alt', 'Producto de prueba');
  });

  test('muestra el precio formateado', () => {
    render(<Card {...mockProps} />);
    
    const price = screen.getByText('$ 150000');
    expect(price).toBeInTheDocument();
  });

  test('muestra el título del producto', () => {
    render(<Card {...mockProps} />);
    
    const title = screen.getByText('Producto de prueba');
    expect(title).toBeInTheDocument();
  });

  test('muestra la ubicación fija "Bogotá"', () => {
    render(<Card {...mockProps} />);
    
    const location = screen.getByText('Bogotá');
    expect(location).toBeInTheDocument();
    expect(location).toHaveClass('card-location');
  });

  test('ejecuta clickCard cuando se hace clic en la card', () => {
    const handleClick = jest.fn();
    render(<Card {...mockProps} clickCard={handleClick} />);
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('estructura del DOM es correcta', () => {
    render(<Card {...mockProps} />);
    
    const card = screen.getByRole('button');
    
    expect(card).toContainElement(screen.getByTestId('card-image'));
    expect(card).toContainElement(screen.getByText('$ 150000'));
    expect(card).toContainElement(screen.getByText('Producto de prueba'));
    expect(card).toContainElement(screen.getByText('Bogotá'));
  });

  test('maneja precios con decimales', () => {
    render(<Card {...mockProps} price={99.99} />);
    
    const price = screen.getByText('$ 99.99');
    expect(price).toBeInTheDocument();
  });

  test('maneja títulos largos', () => {
    const longTitle = 'Este es un título muy largo para probar cómo maneja el componente textos extensos';
    render(<Card {...mockProps} title={longTitle} />);
    
    const title = screen.getByText(longTitle);
    expect(title).toBeInTheDocument();
  });

  test('funciona sin clickCard prop', () => {
    const { clickCard, ...propsWithoutClick } = mockProps;
    
    expect(() => {
      render(<Card {...propsWithoutClick} />);
    }).not.toThrow();
    
    const card = screen.getByRole('button');
    expect(() => {
      fireEvent.click(card);
    }).not.toThrow();
  });
});