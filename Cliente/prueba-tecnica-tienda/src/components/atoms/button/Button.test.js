import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button Component', () => {
  test('renderiza correctamente con texto', () => {
    render(<Button text="Buscar" />);
    
    const button = screen.getByRole('button', { name: /buscar/i });
    expect(button).toBeInTheDocument();
  });

  test('aplica la clase CSS correcta según el color', () => {
    render(<Button text="Test Button" color="primary" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('btn-primary');
  });

  test('aplica la clase por defecto cuando no se especifica color', () => {
    render(<Button text="Default Button" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('btn-secondary'); 
  });

  test('ejecuta la función onClick cuando se hace clic', () => {
    const handleClick = jest.fn();
    render(<Button text="Clickable Button" onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renderiza con diferentes colores', () => {
    const { rerender } = render(<Button text="Test" color="secondary" />);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');

    rerender(<Button text="Test" color="primary" />);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });

  test('renderiza con imagen cuando se proporciona', () => {
    render(<Button text="Button with Image" image="/test-image.png" />);
    
    const button = screen.getByRole('button');
    const image = screen.getByRole('img');
    
    expect(button).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.png');
    expect(image).toHaveAttribute('alt', 'icono representativo');
  });

  test('renderiza sin imagen cuando no se proporciona', () => {
    render(<Button text="Button without Image" />);
    
    const button = screen.getByRole('button');
    const images = screen.queryAllByRole('img');
    
    expect(button).toBeInTheDocument();
    expect(images).toHaveLength(0);
  });
});