import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import SignForm from "./SignForm";

export default function Home() {
  const history = useHistory();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const { from } = location.state || { from: { pathname: "/destinos" } };
      history.push(from);
      // history.push("/destinos");
    }
  }, [history, user, location.state]);

  return (
    <div>
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column">
                <h1 className="title">Viagens</h1>
                <h2 className="subtitle">
                  Escolha uma cidade, veja a distância e o preço da viagem
                </h2>
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
