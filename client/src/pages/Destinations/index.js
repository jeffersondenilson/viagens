import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { httpClient } from "../services";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    httpClient
      .get("/destinations")
      .then((res) => {
        setDestinations(res.data);
      })
      .catch((err) => {
        toast.error("Erro ao carregar destinos");
      });
  }, []);

  return (
    <div>
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Destinos</h1>
            <h2 className="subtitle">Selecione uma das cidades abaixo</h2>
          </div>
        </div>
      </section>
      <section>{/*renderizar cidades*/}</section>
    </div>
  );
}

// https://servicodados.ibge.gov.br/api/v1/localidades/estados/RN/distritos
/*
https://api.mapbox.com/geocoding/v5/mapbox.places/natal.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1628524255035&autocomplete=true&country=br&types=place&limit=10&language=pt&languageMode=strict
*/
