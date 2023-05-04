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
              <div
                className="berry-card"
                key={berry.id}
                onClick={() => {
                  setSelectedBerry(berry);
                  setOpen(true);
                }}
              >
                <h1 className="berry-name">{`${
                  berry.name.charAt(0).toUpperCase() + berry.name.slice(1)
                } #${berry.id}`}</h1>
                <div className="berry-flavors">
                  <p className="berry-flavor-title">Flavors:</p>
                  {berry
                    ? berry.flavors.map((flavor, key) => {
                        return (
                          <div className="berry-flavor-name" key={key}>
                            {flavor.flavor.name}
                          </div>
                        );
                      })
                    : "N/A"}
                </div>
              </div>
            );
          })}
      </div>
      {open && (
        <div className="berry-modal">
          <div className="berry-modal-content">
            <h2 className="berry-modal-name">
              {selectedBerry.name.charAt(0).toUpperCase() +
                selectedBerry.name.slice(1)}
            </h2>
            <table>
              <thead>
                <tr>
                  <th>Data name</th>
                  <th>Data value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Firmness</td>
                  <td>{selectedBerry.firmness.name}</td>
                </tr>
                <tr>
                  <td>Growth time</td>
                  <td>{selectedBerry.growth_time}</td>
                </tr>
                <tr>
                  <td>Max harvest</td>
                  <td>{selectedBerry.max_harvest}</td>
                </tr>
                <tr>
                  <td>Smoothness</td>
                  <td>{selectedBerry.smoothness}</td>
                </tr>
                <tr>
                  <td>Soil dryness</td>
                  <td>{selectedBerry.soil_dryness}</td>
                </tr>
              </tbody>
            </table>
            {/* <ul>
            {selectedBerry.flavors.map((flavor, key) => {
              return <li key={key}>{flavor.flavor.name}</li>;
            })}
          </ul> */}
            <button
              className="berry-modal-close"
              onClick={() => setOpen(false)}
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BerriesList;
