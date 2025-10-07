import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchTemplate } from './search-template';

jest.mock('../../molecules/home-card/home-card', () => ({
  HomeCard: ({ image, name, alt }) => (
    <div data-testid="home-card">
      <img src={image} alt={alt} />
      <span>{name}</span>
    </div>
  )
}));

jest.mock('../../atoms/button/button', () => ({
  __esModule: true,
  default: ({ text, color }) => (
    <button data-testid="cta-button" className={color}>
      {text}
    </button>
  )
}));

jest.mock('../../../assets/images', () => ({
  home: '/mocked-home.jpg',
  sport: '/mocked-sport.jpg',
  technology: '/mocked-tech.jpg',
  clothes: '/mocked-clothes.jpg',
  reloj: '/mocked-reloj.jpg',
  shoes: '/mocked-shoes.jpg',
  earphones: '/mocked-earphones.jpg',
  cam: '/mocked-cam.jpg',
  carousel: '/mocked-carousel.jpg',
  send: '/mocked-send.svg'
}));

describe('SearchTemplate Component', () => {
  test('renderiza correctamente', () => {
    render(<SearchTemplate />);
    
    const carouselImage = screen.getByAltText('Promoción envío gratis');
    const title = screen.getByText('Envío gratis en tu primera compra');
    
    expect(carouselImage).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('muestra el carousel con imagen y contenido', () => {
    render(<SearchTemplate />);
    
    const carouselImage = screen.getByAltText('Promoción envío gratis');
    const sendIcon = screen.getByAltText('ícono de envío');
    const title = screen.getByText('Envío gratis en tu primera compra');
    const button = screen.getByTestId('cta-button');
    
    expect(carouselImage).toHaveAttribute('src', '/mocked-carousel.jpg');
    expect(sendIcon).toHaveAttribute('src', '/mocked-send.svg');
    expect(title).toBeInTheDocument();
    expect(button).toHaveTextContent('Comprar ahora');
    expect(button).toHaveClass('primary');
  });

  test('muestra el título "Categorias"', () => {
    render(<SearchTemplate />);
    
    const categoriesTitle = screen.getByText('Categorias');
    expect(categoriesTitle).toBeInTheDocument();
    expect(categoriesTitle.tagName).toBe('H2');
  });

  test('renderiza todas las categorías', () => {
    render(<SearchTemplate />);
    
    expect(screen.getByText('Hogar')).toBeInTheDocument();
    expect(screen.getByText('Tecnologia')).toBeInTheDocument();
    expect(screen.getByText('Deportes')).toBeInTheDocument();
    expect(screen.getByText('Ropa')).toBeInTheDocument();
  });

  test('muestra el título "Productos mas vendidos"', () => {
    render(<SearchTemplate />);
    
    const productsTitle = screen.getByText('Productos mas vendidos');
    expect(productsTitle).toBeInTheDocument();
    expect(productsTitle.tagName).toBe('H2');
  });

  test('renderiza todos los productos con precios', () => {
    render(<SearchTemplate />);
    
    const prices = screen.getAllByText('$99.900');
    expect(prices).toHaveLength(2); 
    
    expect(screen.getByText('$599.900')).toBeInTheDocument(); 
    expect(screen.getByText('$299.900')).toBeInTheDocument(); 
  });

  test('renderiza el número correcto de HomeCards', () => {
    render(<SearchTemplate />);
    
    const homeCards = screen.getAllByTestId('home-card');
    expect(homeCards).toHaveLength(8); 
  });

  test('las imágenes de categorías tienen los src correctos', () => {
    render(<SearchTemplate />);
    
    const hogarImage = screen.getByAltText('Hogar');
    const techImage = screen.getByAltText('Tecnologia');
    const sportImage = screen.getByAltText('Deportes');
    const clothesImage = screen.getByAltText('Ropa');
    
    expect(hogarImage).toHaveAttribute('src', '/mocked-home.jpg');
    expect(techImage).toHaveAttribute('src', '/mocked-tech.jpg');
    expect(sportImage).toHaveAttribute('src', '/mocked-sport.jpg');
    expect(clothesImage).toHaveAttribute('src', '/mocked-clothes.jpg');
  });

  test('las imágenes de productos tienen los src correctos', () => {
    render(<SearchTemplate />);
    
    const relojImage = screen.getByAltText('reloj');
    const shoesImage = screen.getByAltText('calzado');
    const earphonesImage = screen.getByAltText('audifonos');
    const camImage = screen.getByAltText('camara');
    
    expect(relojImage).toHaveAttribute('src', '/mocked-reloj.jpg');
    expect(shoesImage).toHaveAttribute('src', '/mocked-shoes.jpg');
    expect(earphonesImage).toHaveAttribute('src', '/mocked-earphones.jpg');
    expect(camImage).toHaveAttribute('src', '/mocked-cam.jpg');
  });

  test('el botón CTA tiene las propiedades correctas', () => {
    render(<SearchTemplate />);
    
    const button = screen.getByTestId('cta-button');
    expect(button).toHaveTextContent('Comprar ahora');
    expect(button).toHaveClass('primary');
  });

  test('el título del carousel tiene la estructura correcta', () => {
    render(<SearchTemplate />);
    
    const title = screen.getByText('Envío gratis en tu primera compra');
    const sendIcon = screen.getByAltText('ícono de envío');
    
    expect(title).toHaveClass('carousel-title');
    expect(sendIcon).toHaveClass('send-icon');
  });

  test('estructura general del componente', () => {
    render(<SearchTemplate />);
    
    expect(screen.getByAltText('Promoción envío gratis')).toBeInTheDocument();
    expect(screen.getByText('Categorias')).toBeInTheDocument();
    expect(screen.getByText('Productos mas vendidos')).toBeInTheDocument();
    expect(screen.getByTestId('cta-button')).toBeInTheDocument();
    
    expect(screen.getAllByTestId('home-card')).toHaveLength(8);
  });
});