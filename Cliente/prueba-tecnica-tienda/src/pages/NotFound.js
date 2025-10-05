import { useNavigate, useSearchParams, useLocation, useParams } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const params = useParams();
  
  // Leer parámetros de la URL
  const search = searchParams.get('search') || '';
  const referrer = searchParams.get('referrer') || '';
  
  // Detectar si es una URL de producto /items/:id
  const isProductNotFound = location.pathname.startsWith('/items/') && params.id;
  const productId = params.id;

  const handleSearchRedirect = () => {
    if (search) {
      navigate(`/items?search=${encodeURIComponent(search)}`);
    } else {
      navigate('/items');
    }
  };

  const handleBackToResults = () => {
    if (search) {
      navigate(`/items?search=${encodeURIComponent(search)}`);
    } else {
      navigate('/items');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {isProductNotFound ? (
        <div>
          <h1>🔍 Producto no encontrado</h1>
          <p>El producto con ID <strong>{productId}</strong> no existe o ha sido eliminado.</p>
        </div>
      ) : (
        <div>
          <h1>404 - Página no encontrada</h1>
          <p>Lo sentimos, la página que buscas no existe.</p>
        </div>
      )}
      
      <div style={{ margin: '2rem 0', padding: '1rem', border: '1px solid #f44336', borderRadius: '5px', backgroundColor: '#ffebee' }}>
        <h3>Información de la URL:</h3>
        <p><strong>Ruta intentada:</strong> {location.pathname}</p>
        {isProductNotFound && (
          <p><strong>ID del producto:</strong> {productId}</p>
        )}
        <p><strong>Search:</strong> {search || 'No especificado'}</p>
        <p><strong>Referrer:</strong> {referrer || 'No especificado'}</p>
        
        {searchParams.toString() && (
          <p><strong>Query string completo:</strong> ?{searchParams.toString()}</p>
        )}
      </div>

      <div style={{ margin: '1rem 0' }}>
        {isProductNotFound && (
          <button 
            onClick={handleBackToResults}
            style={{ 
              padding: '0.5rem 1rem', 
              fontSize: '16px',
              marginRight: '1rem',
              backgroundColor: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '3px'
            }}
          >
            Volver a resultados de búsqueda
          </button>
        )}

        {search && !isProductNotFound && (
          <button 
            onClick={handleSearchRedirect}
            style={{ 
              padding: '0.5rem 1rem', 
              fontSize: '16px',
              marginRight: '1rem',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '3px'
            }}
          >
            Buscar "{search}" en resultados
          </button>
        )}
        
        <button 
          onClick={() => navigate("/")}
          style={{ 
            padding: '0.5rem 1rem', 
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '3px'
          }}
        >
          Ir al inicio
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h4>URLs de ejemplo que funcionan:</h4>
        <div style={{ fontSize: '14px', textAlign: 'left', display: 'inline-block' }}>
          <p>✅ <code>/</code> - Página principal</p>
          <p>✅ <code>/items?search=productos</code> - Búsqueda de productos</p>
          <p>❌ <code>/items/123</code> - Producto específico (No encontrado)</p>
        </div>
      </div>
    </div>
  );
}