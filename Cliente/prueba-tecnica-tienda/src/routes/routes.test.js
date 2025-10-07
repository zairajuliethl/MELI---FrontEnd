import React from 'react';
import { render, screen } from '@testing-library/react';
import AppRoutes from './routes';

jest.mock('react-router-dom', () => ({
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: ({ path, element, index }) => (
    <div data-testid="route" data-path={path} data-index={index}>
      {element}
    </div>
  )
}));

jest.mock('../pages/search/search.component', () => {
  const Search = () => <div data-testid="search-page">Search Page</div>;
  return Search;
});

jest.mock('../pages/details-product/details-product', () => ({
  DetailsProduct: () => <div data-testid="details-product-page">Details Product Page</div>
}));

jest.mock('../pages/result/result', () => ({
  Result: () => <div data-testid="result-page">Result Page</div>
}));

jest.mock('../layout/layout', () => ({
  Layout: () => <div data-testid="layout">Layout Component</div>
}));

describe('AppRoutes Component', () => {
  test('renderiza el componente Routes', () => {
    render(<AppRoutes />);
    
    expect(screen.getByTestId('routes')).toBeInTheDocument();
  });

  test('el componente AppRoutes es una función', () => {
    expect(typeof AppRoutes).toBe('function');
  });

  test('el componente se renderiza sin errores', () => {
    expect(() => render(<AppRoutes />)).not.toThrow();
  });

  test('contiene rutas configuradas', () => {
    render(<AppRoutes />);
    
    const routes = screen.getAllByTestId('route');
    expect(routes.length).toBeGreaterThan(0);
  });

  test('renderiza el layout en las rutas', () => {
    render(<AppRoutes />);
    
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  test('exporta el componente correctamente como default', () => {
    expect(AppRoutes).toBeDefined();
    expect(typeof AppRoutes).toBe('function');
  });

  test('el componente tiene todas las importaciones necesarias', () => {
    render(<AppRoutes />);
    
    expect(screen.getByTestId('routes')).toBeInTheDocument();
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});