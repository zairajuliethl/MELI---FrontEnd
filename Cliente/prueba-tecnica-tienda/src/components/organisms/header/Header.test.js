import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './header';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useNavigate: () => mockNavigate
}));

jest.mock('../../molecules/search-box/search-box', () => ({
  SearchBox: ({ searchTerm, setSearchTerm, onSearch, onKeyDown }) => (
    <div data-testid="search-box">
      <input
        data-testid="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button data-testid="search-button" onClick={onSearch}>
        Search
      </button>
    </div>
  )
}));

jest.mock('../../../assets/images', () => ({
  logo: '/mocked-logo.svg'
}));

describe('Header Component', () => {
  const mockProps = {
    searchTerm: '',
    setSearchTerm: jest.fn(),
    onSearch: jest.fn(),
    onKeyDown: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente', () => {
    render(<Header {...mockProps} />);
    
    const logo = screen.getByAltText('logo Meli');
    const searchBox = screen.getByTestId('search-box');
    
    expect(logo).toBeInTheDocument();
    expect(searchBox).toBeInTheDocument();
  });

  test('muestra el logo con atributos correctos', () => {
    render(<Header {...mockProps} />);
    
    const logo = screen.getByAltText('logo Meli');
    expect(logo).toHaveAttribute('src', '/mocked-logo.svg');
    expect(logo).toHaveClass('logo');
  });

  test('renderiza el SearchBox con props correctas', () => {
    render(<Header {...mockProps} searchTerm="test search" />);
    
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveValue('test search');
  });

  test('pasa las props al SearchBox correctamente', () => {
    const setSearchTerm = jest.fn();
    const onSearch = jest.fn();
    const onKeyDown = jest.fn();
    
    render(
      <Header 
        searchTerm="test"
        setSearchTerm={setSearchTerm}
        onSearch={onSearch}
        onKeyDown={onKeyDown}
      />
    );
    
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');
    
    fireEvent.change(searchInput, { target: { value: 'nuevo texto' } });
    expect(setSearchTerm).toHaveBeenCalledWith('nuevo texto');
    
    fireEvent.click(searchButton);
    expect(onSearch).toHaveBeenCalled();
    
    fireEvent.keyDown(searchInput, { key: 'Enter' });
    expect(onKeyDown).toHaveBeenCalled();
  });

  test('navega al home cuando se hace clic en el logo', () => {
    render(<Header {...mockProps} />);
    
    const logo = screen.getByAltText('logo Meli');
    fireEvent.click(logo);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('el logo es clickeable', () => {
    render(<Header {...mockProps} />);
    
    const logo = screen.getByAltText('logo Meli');
    
    expect(logo).toBeInTheDocument();
    expect(() => fireEvent.click(logo)).not.toThrow();
  });

  test('funciona sin props opcionales', () => {
    render(<Header />);
    
    const logo = screen.getByAltText('logo Meli');
    const searchBox = screen.getByTestId('search-box');
    
    expect(logo).toBeInTheDocument();
    expect(searchBox).toBeInTheDocument();
  });

  test('estructura del header es correcta', () => {
    render(<Header {...mockProps} />);
    
    const logo = screen.getByAltText('logo Meli');
    const searchBox = screen.getByTestId('search-box');
    
    expect(logo).toBeInTheDocument();
    expect(searchBox).toBeInTheDocument();
    
    expect(logo).toHaveClass('logo');
  });

  test('maneja searchTerm vacío', () => {
    render(<Header {...mockProps} searchTerm="" />);
    
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveValue('');
  });

  test('maneja searchTerm con contenido', () => {
    render(<Header {...mockProps} searchTerm="producto ejemplo" />);
    
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveValue('producto ejemplo');
  });
});