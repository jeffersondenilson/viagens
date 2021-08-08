import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import SignForm from "./SignForm";

export default function Home() {
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      history.push("/cidades");
    }
  }, [history]);

  return (
    <div>
      <section className="hero is-fullheight">
        <div className="hero-body">
          <p className="title">Viagens</p>
          <p className="subtitle">
            Escolha uma cidade, veja a distância e o preço da viagem
          </p>
          <SignForm />
        </div>
      </section>
    </div>
  );
}
