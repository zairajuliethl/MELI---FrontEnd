import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from './search.component';

jest.mock('../../components/templates/search-template/search-template', () => ({
  SearchTemplate: () => (
    <div data-testid="search-template">
      Search Template Content
    </div>
  )
}));

jest.mock('./search.sass', () => ({}));

describe('Search Page', () => {
  test('renderiza correctamente el componente', () => {
    render(<Search />);
    
    const template = screen.getByTestId('search-template');
    expect(template).toBeInTheDocument();
  });

  test('renderiza el SearchTemplate con el contenido correcto', () => {
    render(<Search />);
    
    const template = screen.getByTestId('search-template');
    expect(template).toHaveTextContent('Search Template Content');
  });

  test('el componente se renderiza sin errores', () => {
    expect(() => render(<Search />)).not.toThrow();
  });

  test('contiene el template correctamente', () => {
    render(<Search />);
    
    const template = screen.getByTestId('search-template');
    expect(template).toBeInTheDocument();
  });

  test('es el componente por defecto exportado', () => {
    expect(typeof Search).toBe('function');
  });
});