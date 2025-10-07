import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DetailsProductTemplate } from './details-products-template';

const mockNavigate = jest.fn();
const mockParams = { id: 'MLA123456' };

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useNavigate: () => mockNavigate,
  useParams: () => mockParams
}));

const mockGetItemById = jest.fn();
jest.mock('../../../services/products', () => ({
  getItemById: () => mockGetItemById()
}));

jest.mock('../../../utils/global-functions', () => ({
  transformPrice: (price) => price.toLocaleString()
}));

jest.mock('../../atoms/breadcrumb/breadcrumb', () => ({
  Breadcrumb: ({ items, onItemClick }) => (
    <div data-testid="breadcrumb">
      {items.map((item, index) => (
        <span
          key={index}
          data-testid={`breadcrumb-item-${index}`}
          onClick={() => onItemClick && onItemClick(item)}
        >
          {item.name}
        </span>
      ))}
    </div>
  )
}));

jest.mock('../../atoms/button/button', () => ({
  Button: ({ text, onClick, color }) => (
    <button
      data-testid="buy-button"
      onClick={onClick}
      className={color}
    >
      {text}
    </button>
  )
}));

jest.mock('../../atoms/image/image', () => ({
  Image: ({ src, alt }) => (
    <img data-testid="product-image" src={src} alt={alt} />
  )
}));

jest.mock('../../atoms/loader/loader', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>
}));

jest.mock('../../molecules/pop-up/pop-up', () => ({
  PopUp: ({ title, text, closePopUp }) => (
    <div data-testid="popup">
      <h3>{title}</h3>
      <p>{text}</p>
      <button data-testid="close-popup" onClick={closePopUp}>
        Cerrar
      </button>
    </div>
  )
}));

jest.mock('./details-products-template.sass', () => ({}));

describe('DetailsProductTemplate Component', () => {
  const mockProductData = {
    data: {
      item: {
        id: 'MLA123456',
        title: 'iPhone 13 Pro Max',
        category: 'Celulares y Smartphones',
        price: {
          amount: 1200000
        },
        picture: 'https://example.com/iphone.jpg',
        description: 'iPhone 13 Pro Max con 256GB de almacenamiento'
      }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore?.();
    console.log.mockRestore?.();
  });

  test('renderiza el loader mientras carga', async () => {
    mockGetItemById.mockImplementation(() => new Promise(() => {})); 
    
    render(<DetailsProductTemplate />);
    
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renderiza el producto correctamente cuando la carga es exitosa', async () => {
    mockGetItemById.mockResolvedValue(mockProductData);
    
    render(<DetailsProductTemplate />);
    
    await waitFor(() => {
      expect(screen.getByText('$ 1.200.000')).toBeInTheDocument();
    });
    
    expect(screen.getByText('iPhone 13 Pro Max con 256GB de almacenamiento')).toBeInTheDocument();
    expect(screen.getByTestId('product-image')).toHaveAttribute('src', 'https://example.com/iphone.jpg');
    expect(screen.getByTestId('buy-button')).toBeInTheDocument();
  });

  test('muestra breadcrumb con categoría y título', async () => {
    mockGetItemById.mockResolvedValue(mockProductData);
    
    render(<DetailsProductTemplate />);
    
    await waitFor(() => {
      expect(screen.getByTestId('breadcrumb-item-0')).toHaveTextContent('Celulares y Smartphones');
    });
    
    expect(screen.getByTestId('breadcrumb-item-1')).toHaveTextContent('iPhone 13 Pro Max');
  });

  test('maneja el clic en breadcrumb correctamente', async () => {
    mockGetItemById.mockResolvedValue(mockProductData);
    
    render(<DetailsProductTemplate />);
    
    await waitFor(() => {
      expect(screen.getByTestId('breadcrumb-item-0')).toBeInTheDocument();
    });
    
    const breadcrumbItem = screen.getByTestId('breadcrumb-item-0');
    fireEvent.click(breadcrumbItem);
    
    expect(mockNavigate).toHaveBeenCalledWith('/items?search=Celulares%20y%20Smartphones');
  });

  test('muestra el popup cuando se hace clic en comprar', async () => {
    mockGetItemById.mockResolvedValue(mockProductData);
    
    render(<DetailsProductTemplate />);
    
    await waitFor(() => {
      expect(screen.getByTestId('buy-button')).toBeInTheDocument();
    });
    
    const buyButton = screen.getByTestId('buy-button');
    fireEvent.click(buyButton);
    
    expect(screen.getByTestId('popup')).toBeInTheDocument();
    expect(screen.getByText('Producto no disponible')).toBeInTheDocument();
  });

  test('cierra el popup correctamente', async () => {
    mockGetItemById.mockResolvedValue(mockProductData);
    
    render(<DetailsProductTemplate />);
    
    await waitFor(() => {
      expect(screen.getByTestId('buy-button')).toBeInTheDocument();
    });
    
    const buyButton = screen.getByTestId('buy-button');
    fireEvent.click(buyButton);
    
    expect(screen.getByTestId('popup')).toBeInTheDocument();
    
    const closeButton = screen.getByTestId('close-popup');
    fireEvent.click(closeButton);
    
    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
  });

  test('muestra mensaje de error cuando falla la carga', async () => {
    mockGetItemById.mockRejectedValue(new Error('Network error'));
    
    render(<DetailsProductTemplate />);
    
    await waitFor(() => {
      expect(screen.getByText('Error al cargar el producto')).toBeInTheDocument();
    });
  });

  test('muestra mensaje cuando no se encuentra el producto', async () => {
    mockGetItemById.mockResolvedValue({ data: { item: null } });
    
    render(<DetailsProductTemplate />);
    
    await waitFor(() => {
      expect(screen.getByText('No se encontraron productos para "MLA123456"')).toBeInTheDocument();
    });
  });

  test('maneja searchTerm vacío', async () => {
    mockGetItemById.mockResolvedValue({ data: { item: null } });
    
    render(<DetailsProductTemplate />);
    
    await waitFor(() => {
      expect(screen.getByText('No se encontraron productos para "MLA123456"')).toBeInTheDocument();
    });
  });

  test('transforma el precio correctamente', async () => {
    const productWithDifferentPrice = {
      data: {
        item: {
          ...mockProductData.data.item,
          price: { amount: 500000 }
        }
      }
    };
    
    mockGetItemById.mockResolvedValue(productWithDifferentPrice);
    
    render(<DetailsProductTemplate />);
    
    await waitFor(() => {
      expect(screen.getByText('$ 500.000')).toBeInTheDocument();
    });
  });

  test('renderiza la descripción del producto', async () => {
    mockGetItemById.mockResolvedValue(mockProductData);
    
    render(<DetailsProductTemplate />);
    
    await waitFor(() => {
      expect(screen.getByText('Descripción del producto')).toBeInTheDocument();
    });
    
    expect(screen.getByText('iPhone 13 Pro Max con 256GB de almacenamiento')).toBeInTheDocument();
  });

  test('el botón de comprar tiene la clase correcta', async () => {
    mockGetItemById.mockResolvedValue(mockProductData);
    
    render(<DetailsProductTemplate />);
    
    await waitFor(() => {
      const buyButton = screen.getByTestId('buy-button');
      expect(buyButton).toHaveClass('primary');
    });
    
    const buyButton = screen.getByTestId('buy-button');
    expect(buyButton).toHaveTextContent('Comprar');
  });
});