import "../styles/pokemonlist.css"

function PokemonList({ pokemon }) {
  return (
    <div className="container">
      {pokemon.map((poke) => {
        return (
          <div className="container-card" key={poke.id}>
            <h2 className="poke-name">{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h2>
            <img
              className="poke-img"
              src={
                poke
                  ? poke.sprites.other.dream_world.front_default
                  : "<p>Loading</p>"
              }
              alt="pokeImage"
            />
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
        );
      })}
    </div>
  );
}

export default PokemonList;
