import "./image.sass"

export const Image = ({src, alt}) =>{
    return (
        <img className="image-container" src={src} alt={alt}/>
    )
} 