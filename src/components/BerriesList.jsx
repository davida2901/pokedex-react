import React, { useEffect, useState } from "react";
import { getBerries } from "../api/pokedex";
import axios from "axios";
import "../styles/berry.css";

function BerriesList() {
  const [berries, setBerries] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedBerry, setSelectedBerry] = useState(null);

  useEffect(() => {
    getBerries().then(async (berry) => {
      const results = berry.results;
      const berryList = await Promise.all(
        results.map(async (berryResults) => {
          const { data } = await axios.get(berryResults.url);
          console.log(data);
          return data;
        })
      );
      setBerries(berryList);
    });
  }, []);

  return (
    <div>
      <div className="container">
        {berries &&
          berries.map((berry) => {
            return (
              <div className="berry-card" key={berry.id} onClick={() => {setSelectedBerry(berry); setOpen(true)}}>
                <h1 className="berry-name">{`${berry.name.charAt(0).toUpperCase() + berry.name.slice(1)} #${berry.id}`}</h1>
                <h2>{berry.name.charAt(0).toUpperCase() + berry.name.slice(1)}</h2>
                <p>{berry.firmness.name}</p>
                {berry
                  ? berry.flavors.map((flavor, key) => {
                      return (
                        <div className="berry-flavor" key={key}>
                          {flavor.flavor.name}
                        </div>
                      );
                    })
                  : "N/A"}
              </div>
            );
          })}
      </div>
      {open && (
        <div className="details-window">
          <h1>{selectedBerry.name}</h1>
          <p>Firmness: {selectedBerry.firmness.name}</p>
          <ul>
            {selectedBerry.flavors.map((flavor, key) => {
              return <li key={key}>{flavor.flavor.name}</li>;
            })}
          </ul>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default BerriesList;
