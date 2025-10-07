import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './input';

describe('Input Component', () => {
  test('renderiza correctamente', () => {
    render(<Input placeholder="Buscar productos" />);
    
    const input = screen.getByPlaceholderText('Buscar productos');
    expect(input).toBeInTheDocument();
  });

  test('aplica la clase CSS correcta', () => {
    render(<Input placeholder="Test input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('input');
  });

  test('muestra el placeholder correcto', () => {
    const placeholder = "Escribe aquí...";
    render(<Input placeholder={placeholder} />);
    
    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  });

  test('muestra el valor inicial', () => {
    const value = "Valor inicial";
    render(<Input value={value} onChange={() => {}} />);
    
    const input = screen.getByDisplayValue(value);
    expect(input).toBeInTheDocument();
  });

  test('ejecuta onChange cuando el usuario escribe', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'nuevo texto' } });
    
    expect(handleChange).toHaveBeenCalledWith('nuevo texto');
  });

  test('ejecuta onKeyDown cuando se presiona una tecla', () => {
    const handleKeyDown = jest.fn();
    render(<Input onKeyDown={handleKeyDown} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(handleKeyDown).toHaveBeenCalled();
  });

  test('funciona sin onChange prop', () => {
    render(<Input placeholder="Sin onChange" />);
    
    const input = screen.getByRole('textbox');
    expect(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    }).not.toThrow();
  });

  test('acepta múltiples props simultáneamente', () => {
    const handleChange = jest.fn();
    const handleKeyDown = jest.fn();
    
    render(
      <Input 
        placeholder="Test completo"
        value="Valor test"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    );
    
    const input = screen.getByDisplayValue('Valor test');
    expect(input).toHaveAttribute('placeholder', 'Test completo');
    
    fireEvent.change(input, { target: { value: 'cambio' } });
    expect(handleChange).toHaveBeenCalledWith('cambio');
  });
});