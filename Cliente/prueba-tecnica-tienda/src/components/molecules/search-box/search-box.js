import Input from "../../atoms/input/input"
import Button from "../../atoms/button/button"
import search from "../../../assets/icons/search.svg"
import "./search-box.sass"

export const SearchBox = ({ searchTerm, setSearchTerm, onSearch, onKeyDown }) => {

    return (
        <div className="search-box">
            <Input 
                placeholder="Nunca dejes de buscar" 
                value={searchTerm}
                onChange={setSearchTerm}
                onKeyDown={onKeyDown}
            />
            <div className="button-container">
            <Button 
                image={search} 
                onClick={onSearch}
            />
            </div>
        </div>
    )
}