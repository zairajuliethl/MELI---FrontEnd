import { useParams } from "react-router-dom";

import "./details-products-template.sass"
import { Bredcrumb } from "../../atoms/breadcrumb/breadcrumb";
import { Button } from "../../atoms/button/button";
import { Image } from "../../atoms/image/image";
import { Loader } from "../../atoms/loader/loader";
import { getItemById } from "../../../services/products";
import { useEffect, useState } from "react";
import { useCallback } from "react";

import { PopUp } from "../../molecules/pop-up/pop-up";

export const DetailsProductTemplate = () => {

    const params = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [popUp, setPopUp] = useState(false);
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
            console.log(data.data.item);

            setItem(data.data.item);
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
    if (!item && productId) {
        return (
            <div className="result-template">
                <p>No se encontraron productos para "{productId}"</p>
            </div>
        );
    }

    const buyProduct = () => {
        setPopUp(true);
    }

    const closePopUp = () => {
        setPopUp(false)
    }

    const items = [{}, {}, {}, {}]


    return (
        <div className="details-product-template">
            {popUp && <PopUp title='Producto no disponible' text="Te invitamos a explorar otras opciones similares que podrían interesarte. " closePopUp={closePopUp} />}
            <Bredcrumb  items={items} />
            <div className="details">
                <div className="image-container">
                    <div className="image">
                        <Image src={item.picture} alt='' />
                    </div>
                    <h3 className="title">Descripción del producto</h3>
                    <p className="description">{item.description}</p>
                </div>
                <div className="info-container">
                    <p>{item.title}</p>
                    <h1 className="price">$ {item.price.amount}</h1>
                    <div className="button">
                        <Button text="Comprar" color="primary" onClick={buyProduct} />
                    </div>
                </div>
            </div>

        </div>
    )
}