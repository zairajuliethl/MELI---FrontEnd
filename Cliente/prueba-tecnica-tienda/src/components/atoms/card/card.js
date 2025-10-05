import "./card.sass";

export const Card = ({ image, price, description, clickCard }) => {
    return (
        <button className="card" onClick={clickCard}>
            <img src={image} alt='' />
            <div className="card-info">
                <h3>$ {price}</h3>
                <p>{description}</p>
            </div>
            <p className="card-location">Bogotá</p>
        </button>
    );
}