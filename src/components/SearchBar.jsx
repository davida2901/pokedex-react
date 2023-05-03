import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/searchbar.css";
import axios from "axios";

function SearchBar({ setResults }) {
  const [input, setInput] = useState("");
  const [typingTimeout, setTypingTimeout] = useState("");

  const fetchData = (value) => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=500&offset=0")
      .then((response) => response.json())
      .then(async (data) => {
        const results = data.results;
        const allPokemonData = await Promise.all(
          results.map(async (pokemon) => {
            const { data } = await axios.get(pokemon.url);
            return data;
          })
        );
        const searchResult = allPokemonData.filter((poke) => {
          return value && poke && poke.name.includes(value);
        });

        setResults(searchResult)
      });

    // const result = pokemon.filter((poke) => {
    //   return value && poke && poke.name.includes(value);
    // });
    // console.log(result)
    // setResults(result);
  };

  const handleChange = (e) => {
    setInput(e.target.value.toLowerCase())
    clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>{
      fetchData(e.target.value);
    }, 500))
  };

  return (
    <div className="search-container">
      <FaSearch id="search-icon" />
      <input
        className="search-bar"
        type="text"
        placeholder="Pokemon search"
        value={input}
        onChange={handleChange}
      />
      
    </div>
  );
}

export default SearchBar;
