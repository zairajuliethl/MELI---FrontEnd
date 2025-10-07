import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Layout } from './layout';

jest.mock('../components/organisms/header/header', () => ({
  Header: ({ searchTerm, setSearchTerm, onSearch, onKeyDown }) => (
    <div data-testid="header">
      <input
        data-testid="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button data-testid="search-button" onClick={onSearch}>
        Buscar
      </button>
    </div>
  )
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  useNavigate: () => mockNavigate,
  Outlet: () => <div data-testid="outlet">Main Content</div>
}));

describe('Layout Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderLayout = () => {
    return render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  };

  test('renderiza correctamente', () => {
    renderLayout();
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  test('inicializa con término de búsqueda vacío', () => {
    renderLayout();
    
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveValue('');
  });

  test('actualiza el término de búsqueda cuando el usuario escribe', () => {
    renderLayout();
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'iPhone' } });
    
    expect(searchInput).toHaveValue('iPhone');
  });

  test('navega a la página de resultados cuando se hace clic en buscar con término válido', () => {
    renderLayout();
    
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');
    
    fireEvent.change(searchInput, { target: { value: 'iPhone' } });
    fireEvent.click(searchButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/items?search=iPhone');
  });

  test('no navega cuando el término de búsqueda está vacío', () => {
    renderLayout();
    
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('no navega cuando el término de búsqueda solo contiene espacios', () => {
    renderLayout();
    
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');
    
    fireEvent.change(searchInput, { target: { value: '   ' } });
    fireEvent.click(searchButton);
    
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('navega cuando se presiona Enter con término válido', () => {
    renderLayout();
    
    const searchInput = screen.getByTestId('search-input');
    
    fireEvent.change(searchInput, { target: { value: 'MacBook' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    
    expect(mockNavigate).toHaveBeenCalledWith('/items?search=MacBook');
  });

  test('no navega cuando se presiona Enter sin término de búsqueda', () => {
    renderLayout();
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('no navega cuando se presiona una tecla diferente a Enter', () => {
    renderLayout();
    
    const searchInput = screen.getByTestId('search-input');
    
    fireEvent.change(searchInput, { target: { value: 'Samsung' } });
    fireEvent.keyDown(searchInput, { key: 'Space', code: 'Space' });
    
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('codifica correctamente caracteres especiales en la URL', () => {
    renderLayout();
    
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');
    
    fireEvent.change(searchInput, { target: { value: 'iPhone & Samsung' } });
    fireEvent.click(searchButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/items?search=iPhone%20%26%20Samsung');
  });

  test('tiene la estructura HTML correcta', () => {
    renderLayout();
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });
});