import { useParams } from "react-router-dom";

import "./details-products-template.sass"
import { Button } from "../../atoms/button/button";
import { getItemById } from "../../../services/products";
import { useEffect, useState } from "react";
import { useCallback } from "react";

export const DetailsProductTemplate = () => {

    const params = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const productId = params.id;

    const fetchItems = useCallback(async () => {
        if (!productId.trim()) {
            setItem(null);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await getItemById(productId);
            setItem(data.item || null);
        } catch (err) {
            setError('Error al cargar el producto');
            console.error('Error loading item:', err);
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems, productId]);

    if (loading) {
        return (
            <div className="result-template">
                <p>Cargando producto...</p>
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
    if (!item && productId) {
        return (
            <div className="result-template">
                <p>No se encontraron productos para "{productId}"</p>
            </div>
        );
    }
    return (
        <div className="details-product-template">
            <div className="image-container">
                <img src={item.picture} alt='' />
                <h3>Descripción del producto</h3>
                <p>{item.description}</p>
            </div>
            <div className="info-container">
                <p>{item.title}</p>
                <p>{item.price.amount}</p>
                <Button text="Comprar" color="primary" />
            </div>

        </div>
    )
}