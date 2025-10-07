import "./home-card.sass";
import { Image } from "../../atoms/image/image";

export const HomeCard = ({name, image, alt}) => {
  return (
    <div className="home-card-container">
      <Image className="image" src={image} alt={alt} />
      <p className="text-name">{name}</p>
    </div>
  );
};
