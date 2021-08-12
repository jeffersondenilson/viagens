import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { httpClient } from "../../services";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../../components/Navbar";
import CitiesLinks from "./CitiesLinks";

export default function Destinations() {
  const { setUserLocation } = useAuth();
  const [destinations, setDestinations] = useState([]);

  // carrega lista de cidades da api
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

  // pega localização do browser
  useEffect(() => {
    setUserLocation();
  }, [setUserLocation]);

  return (
    <div>
      <section className="hero is-info">
        <div className="hero-head">
          <Navbar />
        </div>
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Destinos</h1>
            <h2 className="subtitle">Selecione uma das cidades abaixo</h2>
          </div>
        </div>
      </section>
      <section className="container mt-3 px-6 pb-6">
        {destinations.map((dest) => {
          return <CitiesLinks key={dest._id} destination={dest} />;
        })}

        {/*<Link to="/viagem" className="is-size-4 is-underlined">
          Buscar outra cidade
        </Link>*/}
      </section>
    </div>
  );
}
