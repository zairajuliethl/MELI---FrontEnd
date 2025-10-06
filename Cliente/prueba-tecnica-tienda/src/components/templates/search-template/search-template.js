import { HomeCard } from "../../molecules/home-card/home-card";
import {home, sport, technology, clothes, reloj, shoes, earphones, cam, carousel } from "../../../assets/images";
import Button from "../../atoms/button/button";
import { Image } from "../../atoms/image/image";
import { Bredcrumb } from "../../atoms/breadcrumb/breadcrumb";
import "./search-template.sass";

let categories = [
  { name: "Hogar", image: home },
  { name: "Tecnologia", image: technology },
  { name: "Deportes", image: sport },
  { name: "Ropa", image: clothes },
];

let products = [
  { price: "$99.900", image: reloj },
  { price: "$99.900", image: shoes },
  { price: "$599.900", image: earphones },
  { price: "$299.900", image: cam },
];

export const SearchTemplate = () => {
  return (
    <div className="search-template-container">
      <Bredcrumb/>
      <div className="carousel">
        <div className="image-carousel">
          <Image src={carousel} />
        </div>
        <div>
          <h1 className="text">Envío gratis en tu primera compra</h1>
          <Button text="Comprar ahora" color="primary" />
        </div>
      </div>
      <h2>Categorias</h2>
      <div className="categories">
        {categories.map((c) => (
          <HomeCard image={c.image} name={c.name} />
        ))}
      </div>
      <h2>Productos mas vendidos</h2>
      <div className="products">
        {products.map((c) => (
          <HomeCard image={c.image} name={c.price} />
        ))}
      </div>
    </div>
  );
};
