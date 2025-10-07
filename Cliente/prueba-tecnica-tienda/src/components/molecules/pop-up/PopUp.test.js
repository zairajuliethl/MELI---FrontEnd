import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PopUp } from './pop-up';

jest.mock('../../atoms/button/button', () => ({
  __esModule: true,
  default: ({ text, color, onClick }) => (
    <button data-testid="popup-button" onClick={onClick} className={color}>
      {text}
    </button>
  )
}));

jest.mock('../../atoms/image/image', () => ({
  Image: ({ src, alt }) => <img data-testid="close-icon" src={src} alt={alt} />
}));

jest.mock('../../../assets/icons', () => ({
  close: '/mocked-close-icon.svg'
}));

describe('PopUp Component', () => {
  const mockProps = {
    title: 'Título del popup',
    text: 'Este es el contenido del popup',
    closePopUp: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente', () => {
    render(<PopUp {...mockProps} />);
    
    const title = screen.getByText('Título del popup');
    const text = screen.getByText('Este es el contenido del popup');
    
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  test('muestra el título como h2', () => {
    render(<PopUp {...mockProps} />);
    
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Título del popup');
  });

  test('muestra el texto del contenido', () => {
    render(<PopUp {...mockProps} />);
    
    const text = screen.getByText('Este es el contenido del popup');
    expect(text).toBeInTheDocument();
  });

  test('muestra el botón de cerrar con ícono', () => {
    render(<PopUp {...mockProps} />);
    
    const closeButton = screen.getByRole('button', { name: /icono cerrar/i });
    const closeIcon = screen.getByTestId('close-icon');
    
    expect(closeButton).toBeInTheDocument();
    expect(closeIcon).toHaveAttribute('src', '/mocked-close-icon.svg');
    expect(closeIcon).toHaveAttribute('alt', 'icono cerrar');
  });

  test('muestra el botón principal "Cerrar"', () => {
    render(<PopUp {...mockProps} />);
    
    const mainButton = screen.getByTestId('popup-button');
    expect(mainButton).toHaveTextContent('Cerrar');
    expect(mainButton).toHaveClass('primary');
  });

  test('ejecuta closePopUp cuando se hace clic en el botón de cerrar', () => {
    const closePopUp = jest.fn();
    render(<PopUp {...mockProps} closePopUp={closePopUp} />);
    
    const closeButton = screen.getByRole('button', { name: /icono cerrar/i });
    fireEvent.click(closeButton);
    
    expect(closePopUp).toHaveBeenCalledTimes(1);
  });

  test('ejecuta closePopUp cuando se hace clic en el botón principal', () => {
    const closePopUp = jest.fn();
    render(<PopUp {...mockProps} closePopUp={closePopUp} />);
    
    const mainButton = screen.getByTestId('popup-button');
    fireEvent.click(mainButton);
    
    expect(closePopUp).toHaveBeenCalledTimes(1);
  });

  test('renderiza con título largo', () => {
    const longTitle = 'Este es un título muy largo que podría necesitar manejo especial en el popup';
    render(<PopUp {...mockProps} title={longTitle} />);
    
    const title = screen.getByText(longTitle);
    expect(title).toBeInTheDocument();
  });

  test('renderiza con texto largo', () => {
    const longText = 'Este es un texto muy largo que describe en detalle el contenido del popup y podría necesitar scroll o manejo especial de overflow en el diseño del componente.';
    render(<PopUp {...mockProps} text={longText} />);
    
    const text = screen.getByText(longText);
    expect(text).toBeInTheDocument();
  });

  test('funciona sin closePopUp prop', () => {
    const { closePopUp, ...propsWithoutClose } = mockProps;
    
    expect(() => {
      render(<PopUp {...propsWithoutClose} />);
    }).not.toThrow();
    
    const closeButton = screen.getByRole('button', { name: /icono cerrar/i });
    const mainButton = screen.getByTestId('popup-button');
    
    expect(() => {
      fireEvent.click(closeButton);
      fireEvent.click(mainButton);
    }).not.toThrow();
  });

  test('estructura del popup es correcta', () => {
    render(<PopUp {...mockProps} />);
    
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByText('Este es el contenido del popup')).toBeInTheDocument();
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    expect(screen.getByTestId('popup-button')).toBeInTheDocument();
  });
});