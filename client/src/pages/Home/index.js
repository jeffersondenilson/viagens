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
  }, [history, user]);

  return (
    <div>
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column">
                <p className="title">Viagens</p>
                <p className="subtitle">
                  Escolha uma cidade, veja a distância e o preço da viagem
                </p>
              </div>
              <div className="column">
                <SignForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
