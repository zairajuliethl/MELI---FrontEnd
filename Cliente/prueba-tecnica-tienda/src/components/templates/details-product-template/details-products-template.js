import { useNavigate, useParams } from "react-router-dom";

import "./details-products-template.sass";
import { Breadcrumb } from "../../atoms/breadcrumb/breadcrumb";
import { Button } from "../../atoms/button/button";
import { Image } from "../../atoms/image/image";
import { Loader } from "../../atoms/loader/loader";
import { getItemById } from "../../../services/products";
import { transformPrice } from "../../../utils/global-functions";
import { useEffect, useState } from "react";
import { useCallback } from "react";

import { PopUp } from "../../molecules/pop-up/pop-up";

export const DetailsProductTemplate = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [response, setResponse] = useState(null);
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);
    const [loader, setLoading] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const [error, setError] = useState(null);

    const productId = params.id;

    const fetchItems = useCallback(async () => {
        if (!productId.trim()) {
            setResponse(null);
            setBreadcrumbItems([]);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await getItemById(productId);
            setResponse(data.data.item);

            let newBreadcrumb = [];

            if (data.data.item) {
                newBreadcrumb.push({ name: data.data.item.category });
                newBreadcrumb.push({ name: data.data.item.title });
            }
            setBreadcrumbItems(newBreadcrumb);
        } catch (err) {
            setError("Error al cargar el producto");
            console.error("Error loading item:", err);
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const buyProduct = () => {
        setPopUp(true);
    };

    const closePopUp = () => {
        setPopUp(false);
    };

    const handleBreadcrumbClick = (item) => {
        navigate(`/items?search=${encodeURIComponent(item.name)}`);
    };



    console.log(response, "RESPONSEEEEE");

    return (
        <div className="details-product-template">
            {loader && <Loader />}
            {error && <p className="error">{error}</p>}
            {!response && productId && <p>No se encontraron productos para "{productId}"</p>}
            {response && productId && (
                <div className="details-product-template">
                    <Breadcrumb items={breadcrumbItems} onItemClick={handleBreadcrumbClick} />
                    {popUp && (
                        <PopUp
                            title="Producto no disponible"
                            text="Te invitamos a explorar otras opciones similares que podrían interesarte. "
                            closePopUp={closePopUp}
                        />
                    )}
                    <div className="details">
                        <div className="image-container">
                            <div className="image">
                                <Image src={response.picture} alt={response.title} />
                            </div>
                            <h3 className="title">Descripción del producto</h3>
                            <p className="description">{response.description}</p>
                        </div>
                        <div className="info-container">
                            <p>{response.title}</p>
                            <h1 className="price">$ {transformPrice(response.price.amount)}</h1>
                            <div className="button">
                                <Button text="Comprar" color="primary" onClick={buyProduct} />
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    );
};
