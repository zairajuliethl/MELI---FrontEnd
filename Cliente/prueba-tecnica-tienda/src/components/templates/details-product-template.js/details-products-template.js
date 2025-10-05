import "./details-products-template.sass"
import { Button } from "../../atoms/button/button";

export const DetailsProductTemplate = () => {

    const mockData = {
        "author": {
            "name": "Juan",
            "lastname": "Gómez"
        },
        "item": {
            "id": "IPT5G16BLK001",
            "title": "Apple iPod Touch 5G 16GB Negro - Igual al Nuevo",
            "price": {
                "currency": "COP",
                "amount": 1980,
                "decimals": 0
            },
            "picture": "https://smselectronic.com/wp-content/uploads/2022/03/celular-SAMSUNG-GALAXY-A523-5G-128-GB-4.png",
            "condition": "used",
            "free_shipping": true,
            "sold_quantity": 12,
            "description": "Dispositivo en excelente estado, incluye caja original y accesorios. Ideal para música, apps y navegación, Dispositivo en excelente estado, incluye caja original y accesorios. Ideal para música, apps y navegación.Dispositivo en excelente estado, incluye caja original y accesorios. Ideal para música, apps y navegación.Dispositivo en excelente estado, incluye caja original y accesorios. Ideal para música, apps y navegación.Dispositivo en excelente estado, incluye caja original y accesorios. Ideal para música, apps y navegación.Dispositivo en excelente estado, incluye caja original y accesorios. Ideal para música, apps y navegación."
        }
    }


    return (
        <div className="details-product-template">
            <div className="image-container">
             <img src={mockData.item.picture} alt='' />
                <h3>Descripción del producto</h3>
                <p>{mockData.item.description}</p>
            </div>
            <div className="info-container">
                <p>{mockData.item.title}</p>
                <p>{mockData.item.price.amount}</p>
                <Button text="Comprar" color="primary"/>
            </div>

        </div>
    )
}