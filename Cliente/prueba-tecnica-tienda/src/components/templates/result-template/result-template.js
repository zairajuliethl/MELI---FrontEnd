import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getItems } from "../../../services/products";
import { Card } from "../../atoms/card/card";
import "./result-template.sass";

export const ResulteTemplate = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchTerm = searchParams.get('search') || '';
    
    const fetchItems = useCallback(async () => {
        if (!searchTerm.trim()) {
            setItems([]);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await getItems(searchTerm);
            setItems(data.items || []);
        } catch (err) {
            setError('Error al cargar los productos');
            console.error('Error loading items:', err);
        } finally {
            setLoading(false);
        }
    }, [searchTerm]);
    
    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleCardClick = (itemId) => {
        navigate(`/items/${String(itemId)}`);
    };

    if (loading) {
        return (
            <div className="result-template">
                <p>Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="result-template">
                <p style={{ color: 'red' }}>{error}</p>
            </div>
        );
    }

    if (!items.length && searchTerm) {
        return (
            <div className="result-template">
                <p>No se encontraron productos para "{searchTerm}"</p>
            </div>
        );
    }

    return (
        <div className="result-template">
            {
                items.map((item, index) => (
                    <Card
                        key={item.id || index}
                        image={item.picture}
                        price={item.price?.amount || item.price}
                        description={item.title}
                        clickCard={() => handleCardClick(item.id)}
                    />
                ))
            }
        </div>
    )
}