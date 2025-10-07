import { HomeCard } from "../../molecules/home-card/home-card";
import { home, sport, technology, clothes, reloj, shoes, earphones, cam, carousel, send } from "../../../assets/images";
import Button from "../../atoms/button/button";
import "./search-template.sass";

let categories = [
  { name: "Hogar", image: home, alt: "Hogar" },
  { name: "Tecnologia", image: technology, alt: "Tecnologia"},
  { name: "Deportes", image: sport, alt: "Deportes"},
  { name: "Ropa", image: clothes, alt: "Ropa" },
];

let products = [
  { price: "$99.900", image: reloj, alt: "reloj" },
  { price: "$99.900", image: shoes, alt: "calzado" },
  { price: "$599.900", image: earphones, alt: "audifonos" },
  { price: "$299.900", image: cam, alt: "camara" },
];

export const SearchTemplate = () => {
  return (
    <div className="search-template-container">
      <div className="carousel">
        <div className="carousel-image">
          <img src={carousel} alt="Promoción envío gratis" />
        </div>

        <div className="carousel-content">
          <h1 className="carousel-title">
            <img src={send} alt="ícono de envío" className="send-icon" />
            Envío gratis en tu primera compra
          </h1>
          <Button text="Comprar ahora" color="primary" />
        </div>
      </div>

      <h2>Categorias</h2>
      <div className="categories">
        {categories.map((c) => (
          <HomeCard image={c.image} name={c.name} alt={c.alt} />
        ))}
      </div>
      <h2>Productos mas vendidos</h2>
      <div className="products">
        {products.map((c) => (
          <HomeCard image={c.image} name={c.price} alt={c.alt} />
        ))}
      </div>
    </div>
  );
};
