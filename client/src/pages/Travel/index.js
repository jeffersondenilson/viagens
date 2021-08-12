import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { httpClient } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../../components/Navbar";
import Map from "./Map";

export default function Travel() {
  const location = useLocation();
  const { user, setUserLocation } = useAuth();

  const [origin, setOrigin] = useState({
    cityName: "",
    position: [0, 0],
  });
  const [destination, setDestination] = useState({
    cityName: "",
    position: [0, 0],
  });
  const [distance, setDistance] = useState(0);

  // busca destino
  useEffect(() => {
    const { city } = location.state || { city: null };

    if (city) {
      const cityParam = encodeURIComponent(city);

      httpClient
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityParam}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&cachebuster=1628524255035&autocomplete=true&country=br&types=place&limit=10&language=pt&languageMode=strict`
        )
        .then((res) => {
          if (res.data.features.length > 0) {
            const [cityFromSearch] = res.data.features;

            cityFromSearch.position = [...cityFromSearch.center].reverse();
            cityFromSearch.cityName = cityFromSearch.place_name.split(",")[0];

            setDestination(cityFromSearch);
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Erro ao procurar destino");
        });
    }
  }, [location.state]);

  // busca localização do usuario
  useEffect(() => {
    if (user.location) {
      console.log("get location", user.location);
      const locationParam = encodeURIComponent(
        [...user.location].reverse().join(",")
      );
      httpClient
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationParam}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&cachebuster=1628524255035&autocomplete=true&country=br&types=place&limit=10&language=pt&languageMode=strict`
        )
        .then((res) => {
          if (res.data.features.length > 0) {
            const [cityFromSearch] = res.data.features;

            cityFromSearch.position = [...cityFromSearch.center].reverse();
            cityFromSearch.cityName = cityFromSearch.place_name.split(",")[0];

            setOrigin(cityFromSearch);
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Erro ao procurar local do usuário");
        });
    } else {
      setUserLocation();
    }
  }, [user.location]);

  // calcula distância
  useEffect(() => {
    if (origin.center && destination.center) {
      const originParam = encodeURIComponent(origin.center.join(","));
      const destinationParam = encodeURIComponent(destination.center.join(","));

      httpClient
        .get(
          `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${originParam};${destinationParam}?annotations=distance&sources=0&destinations=1&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
        )
        .then((res) => {
          let distance = res.data.distances[0][0];
          distance = Math.ceil(distance / 1000);
          setDistance(distance);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Não foi possível calcular a distância");
        });
    }
  }, [origin.center, destination.center]);

  return (
    <div>
      <section className="hero is-info">
        <div className="hero-head">
          <Navbar />
        </div>
      </section>
      <section>
        <div>
          <p>
            <b>De: </b> {origin.cityName} <b>Até: </b> {destination.cityName}
          </p>
          <p>
            <b>Distância: </b> {distance} km
          </p>
          <p>
            <b>Preço: </b> {distance} km x R$ 1,50 = R$ {distance * 1.5}
          </p>
        </div>
      </section>
      <section>
        <div id="map">
          {distance > 0 && (
            <Map
              origin={origin}
              destination={destination}
              distance={distance}
            />
          )}
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
