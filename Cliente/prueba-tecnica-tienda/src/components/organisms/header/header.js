import "./header.sass";
import {logo} from "../../../assets/images"
import { SearchBox } from "../../molecules/search-box/search-box";
import { useNavigate } from "react-router-dom";

export const Header = ({ searchTerm, setSearchTerm, onSearch, onKeyDown }) => {

  const navigate = useNavigate();

  const redirectHome = () => {
    navigate('/');
  }

  return (
    <div className="header">    
        <img className="logo" src={logo} alt="logo Meli" onClick={redirectHome} />
        <SearchBox
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={onSearch}
            onKeyDown={onKeyDown}
        />
    </div>
  );
};

export default Header;
