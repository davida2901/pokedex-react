import "../styles/pokemonlist.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";
import { useState } from "react";

function PokemonList({ pokemon, searchData }) {
  const list = searchData.length ? searchData : pokemon;
  const [getID, setGetID] = useState("");

  return (
    <BrowserRouter>
      <div className="container">
        {list.map((poke) => {
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
      </div>

      <Link to={`/pokemon-detail/:${getID}`} />

      <Routes>
        <Route path="/pokemon-detail/:id" element={<PokemonDetail />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default PokemonList;
