import React from "react";
import { BrowserRouter, Link,Routes,Route } from "react-router-dom";
import PokemonList from "./PokemonList";
import "../styles/navBar.css"
import BerriesList from "./BerriesList";


function NavBar() {
  return (
    <BrowserRouter>
      <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">Logo</Link>
      </div>
      <ul className="navbar-links">
        <li className="navbar-item">
          <Link to="/pokemon">Pokemons</Link>
        </li>
        <li className="navbar-item">
          <Link to="/berries">Berries</Link>
        </li>
        <li className="navbar-item">
          <Link to="/regions">Regions</Link>
        </li>
      </ul>
    </nav>

      <Routes>
        <Route path="/" exact/>
        <Route path="/pokemon" element={<PokemonList/>} exact/>
        <Route path="/berries" element={<BerriesList/>} exact/>
      </Routes>

      
    </BrowserRouter>
  );
}

export default NavBar;
