import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import { BrowserRouter } from "react-router-dom";

function Pokedex() {
  const [pokeData, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageUrl, setPreviousPageUrl] = useState();
  const [searchResult, setSearchResults] = useState([]);

  

  const [currentURL, setCurrentPageURL] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );

  useEffect(() => {
    setLoading(true);
    let cancel;

    axios
      .get(currentURL, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then(async (response) => {
        const pokemonList = response.data.results;
        console.log(pokemonList)
        const pokemonData = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const { data } = await axios.get(pokemon.url);
            return data;
          })
        );
        setLoading(false);
        setNextPageUrl(response.data.next);
        setPreviousPageUrl(response.data.previous);
        setData(pokemonData);
      });

    return () => cancel();
  }, [currentURL]);

  if (loading) {
    return <Loading />;
  }

  function GoToNextPage() {
    setCurrentPageURL(nextPageUrl);
  }
  function GoToPreviusPage() {
    setCurrentPageURL(previousPageUrl);
  }

  return (
    <>
      <SearchBar pokemon={pokeData} setResults={setSearchResults} />
      <PokemonList pokemon={pokeData} searchData={searchResult} />
      <Pagination
        GoToNextPage={nextPageUrl ? GoToNextPage : null}
        GoToPreviusPage={previousPageUrl ? GoToPreviusPage : null}
      />
    </>
  );
}

export default Pokedex;
