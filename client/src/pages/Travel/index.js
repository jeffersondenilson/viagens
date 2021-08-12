import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { httpClient } from "../../services";
import Navbar from "../../components/Navbar";
import Map from "./Map";

export default function Travel() {
  const location = useLocation();
  // TODO: acessar localização do browser
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();

  // busca cidade quando montar
  /*
  useEffect(() => {
    const { city } = location.state || { city: null };

    if (city) {
      const cityParam = encodeURIComponent(city);

      httpClient
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityParam}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&cachebuster=1628524255035&autocomplete=true&country=br&types=place&limit=10&language=pt&languageMode=strict`
        )
        .then((res) => {
          const [cityFromSearch] = res.data.features;
          setDestination(cityFromSearch);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Erro ao procurar cidade");
        });
    }
  }, []);
  */

  return (
    <div>
      <section className="hero is-info">
        <div className="hero-head">
          <Navbar />
        </div>
      </section>
      <section>
        <div id="map">
          <Map />
        </div>

        <button
          className="button is-info is-rounded is-small scroll-to-top-button"
          onClick={() => window.scrollTo(0, 0)}
          style={{ fontSize: "1rem", borderRadius: "999px", padding: ".8rem" }}
        >
          &#8657;
        </button>
      </section>
    </div>
  );
}

/*
https://api.mapbox.com/geocoding/v5/mapbox.places/natal.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1628524255035&autocomplete=true&country=br&types=place&limit=10&language=pt&languageMode=strict
*/

/*
https://api.mapbox.com/directions-matrix/v1/mapbox/driving/-35.2081,-5.8054;-34.8813,-8.05428?annotations=distance&sources=0&destinations=1&access_token=pk.eyJ1IjoiamVmZmVyc29uZGVuaWxzb24iLCJhIjoiY2tzMmp4eHpqMGR2eTJucGlyd3k1aDFpdCJ9.gfV4o__pZvIQZD1Ge5CNZw
*/
