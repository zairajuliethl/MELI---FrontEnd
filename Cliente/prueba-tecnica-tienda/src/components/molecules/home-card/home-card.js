import "./home-card.sass";
import { Image } from "../../atoms/image/image";

export const HomeCard = ({name, image}) => {
  return (
    <div className="home-card-container">
      <Image className="image" src={image} />
      <p className="text-name">{name}</p>
    </div>
  );
};
