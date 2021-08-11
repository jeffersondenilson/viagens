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
  useEffect(() => {
    const { city } = location.state || { city: null };

    if (city) {
      const cityParam = encodeURIComponent(city);

      httpClient
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityParam}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&cachebuster=1628524255035&autocomplete=true&country=br&types=place&limit=10&language=pt&languageMode=strict`
        )
        .then((res) => {
          const [cityFromSearch] = res.data.features.filter((city) => {
            return city.place_name === city;
          });

          setDestination(cityFromSearch);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Erro ao procurar cidade");
        });
    }
  }, []);

  return (
    <div>
      <section className="hero is-info">
        <div className="hero-head">
          <Navbar />
        </div>
      </section>
      <section className="container">
        <Map />
      </section>
    </div>
  );
}

/*
https://api.mapbox.com/geocoding/v5/mapbox.places/natal.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1628524255035&autocomplete=true&country=br&types=place&limit=10&language=pt&languageMode=strict
*/
