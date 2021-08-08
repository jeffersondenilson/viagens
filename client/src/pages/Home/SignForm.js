import { useState } from "react";

import { useAuth } from "../../hooks/useAuth";

export default function SignForm() {
  const { login, createAccount } = useAuth();

  const [isSignup, setIsSignup] = useState(true);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    isSignup
      ? createAccount({ name, email, password })
      : login({ email, password });
  };

  const signMessage = isSignup ? "Criar conta" : "Entrar";

  return (
    <div className="box">
      <div className="is-size-3">{signMessage}</div>

      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div className="field">
            <label className="label" htmlFor="name">
              Nome
            </label>
            <div className="control">
              <input
                id="name"
                className="input"
                type="text"
                placeholder="Nome"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          </div>
        )}

        <div className="field">
          <label className="label" htmlFor="email">
            Email
          </label>
          <div className="control">
            <input
              id="email"
              className="input"
              type="email"
              placeholder="email@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="password">
            Senha
          </label>
          <div className="control">
            <input
              id="password"
              className="input"
              type="password"
              placeholder="Senha"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-link">{signMessage}</button>
          </div>
        </div>
      </form>

      <div className="mt-4 is-flex is-align-items-baseline">
        <div>{isSignup ? "Já tem conta?" : "Ainda não tem conta?"}</div>
        <button
          className="button is-ghost is-underlined pl-1"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Entrar" : "Criar conta"}
        </button>
      </div>
    </div>
  );
}
