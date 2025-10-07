import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Breadcrumb } from './breadcrumb';

describe('Breadcrumb Component', () => {
  const mockItems = [
    { name: 'Inicio', id: 1 },
    { name: 'Categoría', id: 2 },
    { name: 'Producto', id: 3 }
  ];

  test('renderiza correctamente', () => {
    render(<Breadcrumb items={mockItems} onItemClick={() => {}} />);
    
    const nav = screen.getByRole('navigation', { name: 'breadcrumb' });
    expect(nav).toBeInTheDocument();
  });

  test('muestra todos los elementos del breadcrumb', () => {
    render(<Breadcrumb items={mockItems} onItemClick={() => {}} />);
    
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Categoría')).toBeInTheDocument();
    expect(screen.getByText('Producto')).toBeInTheDocument();
  });

  test('muestra separadores entre elementos', () => {
    render(<Breadcrumb items={mockItems} onItemClick={() => {}} />);
    
    const separators = screen.getAllByText('›');
    expect(separators).toHaveLength(3); // Uno por cada item
  });

  test('ejecuta onItemClick cuando se hace clic en un elemento', () => {
    const handleItemClick = jest.fn();
    render(<Breadcrumb items={mockItems} onItemClick={handleItemClick} />);
    
    const inicioButton = screen.getByText('Inicio');
    fireEvent.click(inicioButton);
    
    expect(handleItemClick).toHaveBeenCalledWith({ name: 'Inicio', id: 1 });
  });

  test('ejecuta onItemClick para diferentes elementos', () => {
    const handleItemClick = jest.fn();
    render(<Breadcrumb items={mockItems} onItemClick={handleItemClick} />);
    
    const categoriaButton = screen.getByText('Categoría');
    fireEvent.click(categoriaButton);
    
    expect(handleItemClick).toHaveBeenCalledWith({ name: 'Categoría', id: 2 });
  });

  test('renderiza correctamente con un solo elemento', () => {
    const singleItem = [{ name: 'Solo', id: 1 }];
    render(<Breadcrumb items={singleItem} onItemClick={() => {}} />);
    
    expect(screen.getByText('Solo')).toBeInTheDocument();
    expect(screen.getByText('›')).toBeInTheDocument();
  });

  test('no renderiza elementos cuando items está vacío', () => {
    render(<Breadcrumb items={[]} onItemClick={() => {}} />);
    
    const nav = screen.getByRole('navigation', { name: 'breadcrumb' });
    expect(nav).toBeInTheDocument();
    
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  test('maneja items undefined sin errores', () => {
    render(<Breadcrumb items={undefined} onItemClick={() => {}} />);
    
    const nav = screen.getByRole('navigation', { name: 'breadcrumb' });
    expect(nav).toBeInTheDocument();
  });

  test('todos los elementos son botones clickeables', () => {
    render(<Breadcrumb items={mockItems} onItemClick={() => {}} />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    
    buttons.forEach(button => {
      expect(button).toHaveClass('breadcrumb-link');
    });
  });
});