import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBox } from './search-box';

jest.mock('../../atoms/input/input', () => ({
  __esModule: true,
  default: ({ placeholder, value, onChange, onKeyDown }) => (
    <input
      data-testid="search-input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      onKeyDown={onKeyDown}
    />
  )
}));

jest.mock('../../atoms/button/button', () => ({
  __esModule: true,
  default: ({ image, onClick }) => (
    <button data-testid="search-button" onClick={onClick}>
      {image && <img src={image} alt="search" />}
    </button>
  )
}));

jest.mock('../../../assets/icons/search.svg', () => '/mocked-search-icon.svg');

describe('SearchBox Component', () => {
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
    render(<SearchBox {...mockProps} />);
    
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');
    
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('muestra el Input con placeholder correcto', () => {
    render(<SearchBox {...mockProps} />);
    
    const input = screen.getByPlaceholderText('Nunca dejes de buscar');
    expect(input).toBeInTheDocument();
  });

  test('muestra el valor del searchTerm en el input', () => {
    render(<SearchBox {...mockProps} searchTerm="test search" />);
    
    const input = screen.getByDisplayValue('test search');
    expect(input).toBeInTheDocument();
  });

  test('ejecuta setSearchTerm cuando cambia el input', () => {
    const setSearchTerm = jest.fn();
    render(<SearchBox {...mockProps} setSearchTerm={setSearchTerm} />);
    
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'nuevo texto' } });
    
    expect(setSearchTerm).toHaveBeenCalledWith('nuevo texto');
  });

  test('ejecuta onKeyDown cuando se presiona una tecla en el input', () => {
    const onKeyDown = jest.fn();
    render(<SearchBox {...mockProps} onKeyDown={onKeyDown} />);
    
    const input = screen.getByTestId('search-input');
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(onKeyDown).toHaveBeenCalled();
  });

  test('ejecuta onSearch cuando se hace clic en el botón', () => {
    const onSearch = jest.fn();
    render(<SearchBox {...mockProps} onSearch={onSearch} />);
    
    const button = screen.getByTestId('search-button');
    fireEvent.click(button);
    
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  test('el botón contiene el ícono de búsqueda', () => {
    render(<SearchBox {...mockProps} />);
    
    const icon = screen.getByAltText('search');
    expect(icon).toHaveAttribute('src', '/mocked-search-icon.svg');
  });

  test('contiene los elementos principales', () => {
    render(<SearchBox {...mockProps} />);
    
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    expect(screen.getByAltText('search')).toBeInTheDocument();
  });

  test('funciona sin props opcionales', () => {
    render(<SearchBox searchTerm="" />);
    
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');
    
    expect(() => {
      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      fireEvent.click(button);
    }).not.toThrow();
  });
});