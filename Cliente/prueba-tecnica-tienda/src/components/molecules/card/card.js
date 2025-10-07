import "./card.sass";
import {Image} from "../../atoms/image/image"

export const Card = ({ image, price, title, clickCard }) => {
    return (
        <button className="card" onClick={clickCard}>
            <Image src={image} alt={title}/>
            <div className="card-info">
                <h3>$ {price}</h3>
                <p>{title}</p>
            </div>
            <p className="card-location">Bogotá</p>
        </button>
    );
}