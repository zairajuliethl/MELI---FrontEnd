import React from 'react';
import { render, screen } from '@testing-library/react';
import { Result } from './result';

jest.mock('../../components/templates/result-template/result-template', () => ({
  ResultTemplate: () => (
    <div data-testid="result-template">
      Result Template Content
    </div>
  )
}));

jest.mock('./results.sass', () => ({}));

describe('Result Page', () => {
  test('renderiza correctamente el componente', () => {
    render(<Result />);
    
    const template = screen.getByTestId('result-template');
    expect(template).toBeInTheDocument();
  });

  test('renderiza el ResultTemplate con el contenido correcto', () => {
    render(<Result />);
    
    const template = screen.getByTestId('result-template');
    expect(template).toHaveTextContent('Result Template Content');
  });

  test('el componente se renderiza sin errores', () => {
    expect(() => render(<Result />)).not.toThrow();
  });

  test('contiene el template correctamente', () => {
    render(<Result />);
    
    const template = screen.getByTestId('result-template');
    expect(template).toBeInTheDocument();
  });
});