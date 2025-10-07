import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getItems } from "../../../services/products";
import { Card } from "../../molecules/card/card";
import { Loader } from "../../atoms/loader/loader";
import { Breadcrumb } from "../../atoms/breadcrumb/breadcrumb"
import { transformPrice } from "../../../utils/global-functions"
import "./result-template.sass";

export const ResultTemplate = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [response, setResponse] = useState([]);
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);
    const [loader, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchTerm = searchParams.get('search') || '';

    const fetchItems = useCallback(async (item) => {

        if (!item.trim()) {
            setResponse([]);
            setBreadcrumbItems([]);
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const data = await getItems(item);
            setResponse(data.data);

            let newBreadcrumb = [];
            if (data.data.categories && data.data.categories.length > 0) {
                newBreadcrumb = data.data.categories.map(cat => ({ name: cat.name }));
            }
            newBreadcrumb.push({ name: item });
            setBreadcrumbItems(newBreadcrumb);
        } catch (err) {
            setError('Error al cargar los productos');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchItems(searchTerm);
    }, [searchTerm, fetchItems]);

    const handleCardClick = (itemId) => {
        navigate(`/items/${String(itemId)}`);
    };

    const handleBreadcrumbClick = (item) => {
        setBreadcrumbItems([item]);
        fetchItems(item.name);        
    };


    return (
        <div className="result-template">
            {loader && <Loader />}
            {error && <p className="error">{error}</p>}
            {response.items && response.items.length < 1 && searchTerm && <p>No se encontraron productos para "{searchTerm}"</p>}
            {response.items && response.items.length > 0 && !loader && !error && (
                <div>
                    <Breadcrumb items={breadcrumbItems} onItemClick={handleBreadcrumbClick} />
                    <div className="cards">
                        {
                            response.items && response.items.slice(0,4).map(i => (
                                <Card
                                    key={i.id}
                                    title={i.title}
                                    image={i.picture}
                                    price={transformPrice(i.price.amount)}
                                    clickCard={() => handleCardClick(i.id)}
                                />
                            )
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
}