import { useNavigate } from "react-router-dom";
import { Card } from "../../atoms/card/card";
import "./result-template.sass";

export const ResulteTemplate = () => {
    const navigate = useNavigate();

    const mockData = {
        author: { name: "Juan", lastname: "Gutiérrez" },
        categories: ["Electrónica", "Celulares", "Accesorios"],
        items: [
            {
                id: "MLA1234",
                title: "iPhone 15 Pro",
                price: { currency: "USD", amount: 1199, decimals: 0 },
                picture: "https://smselectronic.com/wp-content/uploads/2022/03/celular-SAMSUNG-GALAXY-A523-5G-128-GB-4.png",
                condition: "new",
                free_shipping: true,
            },
            {
                id: "MLA5678",
                title: "Samsung Galaxy S24",
                price: { currency: "USD", amount: 999, decimals: 0 },
                picture: "https://smselectronic.com/wp-content/uploads/2022/03/celular-SAMSUNG-GALAXY-A523-5G-128-GB-4.png",
                condition: "new",
                free_shipping: false,
            },          {
                id: "MLA1234",
                title: "iPhone 15 Pro",
                price: { currency: "USD", amount: 1199, decimals: 0 },
                picture: "https://smselectronic.com/wp-content/uploads/2022/03/celular-SAMSUNG-GALAXY-A523-5G-128-GB-4.png",
                condition: "new",
                free_shipping: true,
            },
            {
                id: "MLA5678",
                title: "Samsung Galaxy S24",
                price: { currency: "USD", amount: 999, decimals: 0 },
                picture: "https://smselectronic.com/wp-content/uploads/2022/03/celular-SAMSUNG-GALAXY-A523-5G-128-GB-4.png",
                condition: "new",
                free_shipping: false,
            }, 
        ],
    };

    const handleCardClick = (itemId) => {
        navigate(`/items/${itemId}`);
    };
    
    return (
        <div className="result-template">
            {
                mockData.items.map(item => (
                    <Card 
                        key={item.id}
                        image={item.picture}
                        price={item.price.amount}
                        description={item.title}
                        clickCard={() => handleCardClick(item.id)}
                        
                    />
                ))
            }
        </div>
    )
}