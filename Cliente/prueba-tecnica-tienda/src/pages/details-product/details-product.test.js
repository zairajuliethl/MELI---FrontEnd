import React from 'react';
import { render, screen } from '@testing-library/react';
import { DetailsProduct } from './details-product';

jest.mock('../../components/templates/details-product-template/details-products-template', () => ({
  DetailsProductTemplate: () => (
    <div data-testid="details-product-template">
      Details Product Template Content
    </div>
  )
}));

jest.mock('./details-product.sass', () => ({}));

describe('DetailsProduct Page', () => {
  test('renderiza correctamente el componente', () => {
    render(<DetailsProduct />);
    
    const template = screen.getByTestId('details-product-template');
    expect(template).toBeInTheDocument();
  });

  test('renderiza el DetailsProductTemplate con el contenido correcto', () => {
    render(<DetailsProduct />);
    
    const template = screen.getByTestId('details-product-template');
    expect(template).toHaveTextContent('Details Product Template Content');
  });

  test('el componente se renderiza sin errores', () => {
    expect(() => render(<DetailsProduct />)).not.toThrow();
  });

  test('contiene el template correctamente', () => {
    render(<DetailsProduct />);
    
    const template = screen.getByTestId('details-product-template');
    expect(template).toBeInTheDocument();
  });
});