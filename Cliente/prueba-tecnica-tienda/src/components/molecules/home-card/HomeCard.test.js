import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomeCard } from './home-card';

jest.mock('../../atoms/image/image', () => ({
  Image: ({ src, alt, className }) => (
    <img data-testid="home-card-image" src={src} alt={alt} className={className} />
  )
}));

describe('HomeCard Component', () => {
  const mockProps = {
    name: 'Categoría de prueba',
    image: '/category-image.jpg',
    alt: 'Imagen de categoría'
  };

  test('renderiza correctamente', () => {
    render(<HomeCard {...mockProps} />);
    
    const image = screen.getByTestId('home-card-image');
    const name = screen.getByText('Categoría de prueba');
    
    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  test('muestra la imagen con las props correctas', () => {
    render(<HomeCard {...mockProps} />);
    
    const image = screen.getByTestId('home-card-image');
    expect(image).toHaveAttribute('src', '/category-image.jpg');
    expect(image).toHaveAttribute('alt', 'Imagen de categoría');
    expect(image).toHaveClass('image');
  });

  test('muestra el nombre de la categoría', () => {
    render(<HomeCard {...mockProps} />);
    
    const name = screen.getByText('Categoría de prueba');
    expect(name).toBeInTheDocument();
    expect(name).toHaveClass('text-name');
  });

  test('renderiza con nombre largo', () => {
    const longName = 'Este es un nombre de categoría muy largo que podría necesitar manejo especial';
    render(<HomeCard {...mockProps} name={longName} />);
    
    const name = screen.getByText(longName);
    expect(name).toBeInTheDocument();
  });

  test('renderiza con URL de imagen externa', () => {
    const externalUrl = 'https://example.com/external-image.jpg';
    render(<HomeCard {...mockProps} image={externalUrl} />);
    
    const image = screen.getByTestId('home-card-image');
    expect(image).toHaveAttribute('src', externalUrl);
  });

  test('maneja alt text personalizado', () => {
    const customAlt = 'Descripción personalizada de la imagen';
    render(<HomeCard {...mockProps} alt={customAlt} />);
    
    const image = screen.getByTestId('home-card-image');
    expect(image).toHaveAttribute('alt', customAlt);
  });

  test('renderiza sin errores con props mínimas', () => {
    render(<HomeCard name="Test" image="/test.jpg" />);
    
    const name = screen.getByText('Test');
    const image = screen.getByTestId('home-card-image');
    
    expect(name).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  test('estructura del componente es correcta', () => {
    render(<HomeCard {...mockProps} />);
    
    const image = screen.getByTestId('home-card-image');
    const name = screen.getByText('Categoría de prueba');
    
    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    
    expect(name).toHaveClass('text-name');
  });
});