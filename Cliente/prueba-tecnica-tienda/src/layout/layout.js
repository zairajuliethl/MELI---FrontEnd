import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom"
import { Header } from "../components/organisms/header/header"
import "./layout.sass"

export const Layout = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/items?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="layout">
            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch}
                onKeyDown={handleKeyDown}
            />
            <main>
                <Outlet />
            </main>
        </div>
    )
}