import { useNavigate, useSearchParams } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Leer parámetros de la URL
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const page = searchParams.get('page') || '1';

  const handleUpdateSearch = (newSearch) => {
    setSearchParams({ search: newSearch, category, page });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Acerca de</h1>
      <p>Esta es la página de información sobre la tienda.</p>
      
      <div style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>Parámetros actuales:</h3>
        <p><strong>Search:</strong> {search || 'No especificado'}</p>
        <p><strong>Category:</strong> {category || 'No especificado'}</p>
        <p><strong>Page:</strong> {page}</p>
      </div>

      <div style={{ margin: '1rem 0' }}>
        <h3>Actualizar búsqueda:</h3>
        <input 
          type="text" 
          placeholder="Nuevo término de búsqueda"
          value={search}
          onChange={(e) => handleUpdateSearch(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem', width: '200px' }}
        />
        <button 
          onClick={() => setSearchParams({ search: 'productos', category: 'electronics', page: '1' })}
          style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}
        >
          Ejemplo: productos
        </button>
        <button 
          onClick={() => setSearchParams({})}
          style={{ padding: '0.5rem 1rem' }}
        >
          Limpiar parámetros
        </button>
      </div>

      <button 
        onClick={() => navigate("/")}
        style={{ padding: '0.5rem 1rem', fontSize: '16px' }}
      >
        Volver al inicio
      </button>
    </div>
  );
}