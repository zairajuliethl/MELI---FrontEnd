import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getItems } from "../../../services/products";
import { Card } from "../../molecules/card/card";
import { Loader } from "../../atoms/loader/loader";
import { Bredcrumb } from "../../atoms/breadcrumb/breadcrumb"
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
            console.log(JSON.stringify(data.data, null, 2), "DAAAAAAA");

            setItems(data.data);
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
                <Loader />
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
    
    if (items.items && !items.items.length && searchTerm) {
        return (
            <div className="result-template">
                <p>No se encontraron productos para "{searchTerm}"</p>
            </div>
        );
    }

    
    let bread = [];
    if (items.categories && items.categories.length > 0) {
        bread = items.categories.map(category => ({ name: category.name }));
    }
    if (searchTerm) {
        bread.push({ name: searchTerm });
    }


    return (
        <div className="result-template">
            <Bredcrumb items={bread}/>
            <div className="cards">
                {
                    items.items && items.items.map(i => (
                        <Card
                            title={i.title}
                            image={i.picture}
                            price={i.price.amount}
                            clickCard={() => handleCardClick(i.id)}
                        />
                    )
                    )
                }
            </div>
        </div>
    )
}