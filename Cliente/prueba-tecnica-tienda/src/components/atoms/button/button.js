
import "./button.sass";

export const Button = ({ image, onClick, text, color = "secondary" }) => {
  const colorClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary", 
  };

  const colorClass = colorClasses[color] || colorClasses.secondary;

  return (
    <button className={`button ${colorClass}`} onClick={onClick}>
      {image && <img src={image} alt="icono representativo" />}
      {text}
    </button>
  );
};

export default Button;