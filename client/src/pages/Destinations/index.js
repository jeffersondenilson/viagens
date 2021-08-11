import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { httpClient } from "../../services";
import Navbar from "../../components/Navbar";
import CitiesLinks from "./CitiesLinks";

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

        <Link to="/viagem">Buscar outra cidade</Link>
      </section>
    </div>
  );
}
