import React, { useEffect, useState } from "react";
import "../styles/pokemonlist.css";
import { getPokemon } from "../api/pokedex";
import Loading from "./Loading";
import Pagination from "./Pagination";
import axios from "axios";
import SearchBar from "./SearchBar";

function PokemonList() {
  const [pokeData, setPokeData] = useState("");
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    getPokemon().then(async (data) => {
      setLoading(false);
      const results = data.results;
      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const { data } = await axios.get(pokemon.url);
          return data;
        })
      );
      setPokeData(pokemonData);
    });
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }

  // function GotoNextPage(){
  //   setCurrentPage(nextPage)
  // }

  // function GotoPreviousPage(){
  //   setCurrentPage(previousPage)
  // }

  const list = searchResults.length ? searchResults : pokeData;

  return (
    <div className="container">
      <div className="search-container">
        <SearchBar
          className="searchBar"
          setResults={setSearchResults}
        />
      </div>
      {list &&
        list.map((poke) => {
          return (
            <div className="container-card" key={poke.id}>
              <h2 className="poke-name">
                {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
              </h2>
              <img
                className="poke-img"
                src={
                  poke
                    ? poke.sprites.other.dream_world.front_default
                    : "<p>Loading</p>"
                }
                alt="pokeImage"
              />
              <div className="poke-abilities-container">
                <p className="poke-abilities-title">Abilities: </p>
                {poke
                  ? poke.abilities.map((value, key) => {
                      return (
                        <div className="poke-abilities" key={key}>
                          {value.ability.name}
                        </div>
                      );
                    })
                  : "N/A"}
              </div>
            </div>
          );
        })}

      {/* <Pagination
        GotoNextPage={nextPage ? GotoNextPage : null}
        GotoPreviousPage={previousPage ? GotoPreviousPage : null}
      /> */}
    </div>
  );
}

export default PokemonList;
