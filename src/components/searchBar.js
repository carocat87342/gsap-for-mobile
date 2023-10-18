import search_icon from "../images/search_icon.svg";
import React from "react";

function SearchBar(props) {

    return (
        <div className="search_input">
            <div className="input">
                <div className="search_icon">
                    <img src={search_icon} alt=""/>
                </div>
                <input type="text" placeholder="Search..."/>
            </div>
        </div>
    )
}
export default SearchBar;