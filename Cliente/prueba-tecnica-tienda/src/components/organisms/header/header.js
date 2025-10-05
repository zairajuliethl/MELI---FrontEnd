import "./header.sass";
import {logo} from "../../../assets/images"
import { SearchBox } from "../../molecules/search-box/search-box";

export const Header = ({ searchTerm, setSearchTerm, onSearch, onKeyDown }) => {

  return (
    <div className="header">    
        <img src={logo} alt="logo" />
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
