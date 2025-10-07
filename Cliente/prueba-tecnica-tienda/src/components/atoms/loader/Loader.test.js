import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loader } from './loader';

jest.mock('../../../assets/gif', () => ({
  loader: '/mocked-loader.gif'
}));

describe('Loader Component', () => {
  test('renderiza correctamente', () => {
    render(<Loader />);
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });

  test('muestra la imagen del loader con alt text correcto', () => {
    render(<Loader />);
    
    const image = screen.getByAltText('spinner de carga');
    expect(image).toBeInTheDocument();
  });

  test('imagen del loader tiene el src correcto', () => {
    render(<Loader />);
    
    const image = screen.getByAltText('spinner de carga');
    expect(image).toHaveAttribute('src', '/mocked-loader.gif');
  });

  test('es accesible por el alt text', () => {
    render(<Loader />);
    
    const image = screen.getByAltText('spinner de carga');
    expect(image).toBeInTheDocument();
  });

  test('solo renderiza una imagen', () => {
    render(<Loader />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(1);
  });
});