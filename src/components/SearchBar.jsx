import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ pokemon, setResults }) {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    const result = pokemon.filter((poke)=>{
        return value && poke && poke.name.includes(value)
      })
    setResults(result)
    console.log(result)
  }

  const handleChange = (value)=>{
    setInput(value)
    fetchData(value)
  }

  return (
    <div>
      <div className="search-container">
        <FaSearch id="search-icon"/>
        <input
          type="text"
          placeholder="Pokemon search"
          value={input}
          onChange={(e) => {
            handleChange(e.target.value.toLowerCase());
          }}
        />
      </div>
    </div>
  );
}

export default SearchBar;
