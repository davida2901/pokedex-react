import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/searchbar.css";

function SearchBar({ pokemon, setResults }) {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    const result = pokemon.filter((poke) => {
      return value && poke && poke.name.includes(value);
    });
    setResults(result);
    console.log(result);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="search-container">
      <FaSearch id="search-icon" />
      <input
        className="search-bar"
        type="text"
        placeholder="Pokemon search"
        value={input}
        onChange={(e) => {
          handleChange(e.target.value.toLowerCase());
        }}
      />
    </div>
  );
}

export default SearchBar;
