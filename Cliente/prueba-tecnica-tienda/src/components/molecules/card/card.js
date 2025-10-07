import "./card.sass";
import {Image} from "../../atoms/image/image"

export const Card = ({ image, price, description, clickCard }) => {
    return (
        <button className="card" onClick={clickCard}>
            <Image src={image}/>
            <div className="card-info">
                <h3>$ {price}</h3>
                <p>{description}</p>
            </div>
            <p className="card-location">Bogotá</p>
        </button>
    );
}