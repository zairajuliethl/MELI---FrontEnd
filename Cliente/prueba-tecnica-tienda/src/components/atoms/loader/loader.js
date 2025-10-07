import { loader } from "../../../assets/gif"
import "./loader.sass"

export const Loader = () => {
    return (
        <div className="loading">
            <div className="loading-ico">
                <img src={loader} alt="spinner de carga" />
            </div>
        </div>
    )
}