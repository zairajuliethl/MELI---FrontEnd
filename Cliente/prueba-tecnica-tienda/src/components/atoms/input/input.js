import "./input.sass";

export const Input = ({ placeholder, value, onChange, onKeyDown }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <input 
      className="input" 
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
