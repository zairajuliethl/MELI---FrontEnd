import "./pop-up.sass"
import Button from "../../atoms/button/button"
import { Image } from "../../atoms/image/image"
import { close } from "../../../assets/icons"
export const PopUp = ({ title, text, closePopUp }) => {
    return (
        <div className="pop-up-container">
            <div className="main-container">
                <div className="header-pop-up">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={closePopUp}>
                        <Image src={close} />
                    </button>
                </div>
                <p>{text}</p>
                <div className="button">
                    <Button text='Cerrar' color="primary" onClick={closePopUp} />
                </div>
            </div>
        </div>
    )
} 