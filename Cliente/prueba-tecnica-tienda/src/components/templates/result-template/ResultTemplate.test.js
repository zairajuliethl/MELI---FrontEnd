import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ResultTemplate } from './result-template';

const mockNavigate = jest.fn();
const mockSearchParams = new URLSearchParams('search=iphone');

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useNavigate: () => mockNavigate,
  useSearchParams: () => [mockSearchParams]
}));

const mockGetItems = jest.fn();
jest.mock('../../../services/products', () => ({
  getItems: () => mockGetItems()
}));

jest.mock('../../../utils/global-functions', () => ({
  transformPrice: (price) => price.toLocaleString()
}));

jest.mock('../../molecules/card/card', () => ({
  Card: ({ title, image, price, clickCard }) => (
    <div data-testid="product-card" onClick={clickCard}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <span>${price}</span>
    </div>
  )
}));

jest.mock('../../atoms/loader/loader', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>
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

jest.mock('./result-template.sass', () => ({}));

describe('ResultTemplate Component', () => {
  const mockSearchData = {
    data: {
      categories: [
        { name: 'Celulares y Smartphones' },
        { name: 'Apple' }
      ],
      items: [
        {
          id: 'MLA1',
          title: 'iPhone 13 Pro Max',
          picture: 'https://example.com/iphone1.jpg',
          price: { amount: 1200000 }
        },
        {
          id: 'MLA2',
          title: 'iPhone 13',
          picture: 'https://example.com/iphone2.jpg',
          price: { amount: 900000 }
        },
        {
          id: 'MLA3',
          title: 'iPhone 12',
          picture: 'https://example.com/iphone3.jpg',
          price: { amount: 700000 }
        },
        {
          id: 'MLA4',
          title: 'iPhone 11',
          picture: 'https://example.com/iphone4.jpg',
          price: { amount: 500000 }
        },
        {
          id: 'MLA5',
          title: 'iPhone SE',
          picture: 'https://example.com/iphonese.jpg',
          price: { amount: 300000 }
        }
      ]
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams.get = jest.fn().mockReturnValue('iphone');
  });

  test('renderiza el loader mientras carga', async () => {
    mockGetItems.mockImplementation(() => new Promise(() => {}));
    
    render(<ResultTemplate />);
    
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renderiza los productos correctamente cuando la carga es exitosa', async () => {
    mockGetItems.mockResolvedValue(mockSearchData);
    
    render(<ResultTemplate />);
    
    await waitFor(() => {
      expect(screen.getByText('iPhone 13 Pro Max')).toBeInTheDocument();
    });
    
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(4);
    
    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    expect(screen.getByText('iPhone 12')).toBeInTheDocument();
    expect(screen.getByText('iPhone 11')).toBeInTheDocument();
  });

  test('muestra breadcrumb con categorías y término de búsqueda', async () => {
    mockGetItems.mockResolvedValue(mockSearchData);
    
    render(<ResultTemplate />);
    
    await waitFor(() => {
      expect(screen.getByTestId('breadcrumb-item-0')).toHaveTextContent('Celulares y Smartphones');
    });
    
    expect(screen.getByTestId('breadcrumb-item-1')).toHaveTextContent('Apple');
    expect(screen.getByTestId('breadcrumb-item-2')).toHaveTextContent('iphone');
  });

  test('navega al detalle del producto cuando se hace clic en una card', async () => {
    mockGetItems.mockResolvedValue(mockSearchData);
    
    render(<ResultTemplate />);
    
    await waitFor(() => {
      expect(screen.getByText('iPhone 13 Pro Max')).toBeInTheDocument();
    });
    
    const firstCard = screen.getAllByTestId('product-card')[0];
    fireEvent.click(firstCard);
    
    expect(mockNavigate).toHaveBeenCalledWith('/items/MLA1');
  });

  test('maneja el clic en breadcrumb correctamente', async () => {
    mockGetItems.mockResolvedValue(mockSearchData);
    
    render(<ResultTemplate />);
    
    await waitFor(() => {
      expect(screen.getByTestId('breadcrumb-item-0')).toBeInTheDocument();
    });
    
    const breadcrumbItem = screen.getByTestId('breadcrumb-item-0');
    fireEvent.click(breadcrumbItem);
    
    await waitFor(() => {
      expect(screen.getByTestId('breadcrumb-item-0')).toBeInTheDocument();
    });
  });

  test('muestra mensaje de error cuando falla la carga', async () => {
    mockGetItems.mockRejectedValue(new Error('Network error'));
    
    render(<ResultTemplate />);
    
    await waitFor(() => {
      expect(screen.getByText('Error al cargar los productos')).toBeInTheDocument();
    });
  });

  test('muestra mensaje cuando no se encuentran productos', async () => {
    mockGetItems.mockResolvedValue({
      data: {
        categories: [],
        items: []
      }
    });
    
    render(<ResultTemplate />);
    
    await waitFor(() => {
      expect(screen.getByText('No se encontraron productos para "iphone"')).toBeInTheDocument();
    });
  });

  test('renderiza el componente principal', async () => {
    mockGetItems.mockResolvedValue(mockSearchData);
    
    render(<ResultTemplate />);
    
    await waitFor(() => {
      expect(screen.getByTestId('breadcrumb-item-0')).toBeInTheDocument();
    });
  });

  test('transforma los precios correctamente', async () => {
    mockGetItems.mockResolvedValue(mockSearchData);
    
    render(<ResultTemplate />);
    
    await waitFor(() => {
      expect(screen.getByText(/1\.200\.000/)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/900\.000/)).toBeInTheDocument();
    expect(screen.getByText(/700\.000/)).toBeInTheDocument();
    expect(screen.getByText(/500\.000/)).toBeInTheDocument();
  });

  test('limita la visualización a 4 productos máximo', async () => {
    mockGetItems.mockResolvedValue(mockSearchData);
    
    render(<ResultTemplate />);
    
    await waitFor(() => {
      const productCards = screen.getAllByTestId('product-card');
      expect(productCards).toHaveLength(4);
    });
    
    expect(screen.queryByText('iPhone SE')).not.toBeInTheDocument();
  });

  test('maneja respuesta sin categorías', async () => {
    const dataWithoutCategories = {
      data: {
        categories: [],
        items: [mockSearchData.data.items[0]]
      }
    };
    
    mockGetItems.mockResolvedValue(dataWithoutCategories);
    
    render(<ResultTemplate />);
    
    await waitFor(() => {
      expect(screen.getByTestId('breadcrumb-item-0')).toHaveTextContent('iphone');
    });
  });

  test('convierte ID a string al navegar', async () => {
    const dataWithNumericId = {
      data: {
        categories: [],
        items: [{
          id: 123456,
          title: 'Test Product',
          picture: 'test.jpg',
          price: { amount: 100000 }
        }]
      }
    };
    
    mockGetItems.mockResolvedValue(dataWithNumericId);
    
    render(<ResultTemplate />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });
    
    const card = screen.getByTestId('product-card');
    fireEvent.click(card);
    
    expect(mockNavigate).toHaveBeenCalledWith('/items/123456');
  });

  test('actualiza breadcrumb cuando se hace clic en un item', async () => {
    mockGetItems.mockResolvedValue(mockSearchData);
    
    render(<ResultTemplate />);
    
    await waitFor(() => {
      expect(screen.getByTestId('breadcrumb-item-0')).toBeInTheDocument();
    });
    
    const breadcrumbItem = screen.getByTestId('breadcrumb-item-0');
    fireEvent.click(breadcrumbItem);
    
    await waitFor(() => {
      expect(screen.getByTestId('breadcrumb-item-0')).toBeInTheDocument();
    });
  });

  test('maneja términos de búsqueda con espacios', async () => {
    mockSearchParams.get = jest.fn().mockReturnValue('iphone 13 pro');
    mockGetItems.mockResolvedValue(mockSearchData);
    
    render(<ResultTemplate />);
    
    await waitFor(() => {
      expect(screen.getByTestId('breadcrumb-item-2')).toHaveTextContent('iphone 13 pro');
    });
  });
});