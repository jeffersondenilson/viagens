import { createContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import httpClient from "../services";

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [user, setUser] = useState();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      httpClient
        .post("/auth/validatetoken", { token })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          if (err.request.status === 401) {
            localStorage.removeItem("token");
            setUser(null);
            history.push("/");
          }
        });
    }
  }, [location.pathname, history]);

  const login = async ({ email, password }) => {
    try {
      const res = await httpClient.post("/auth/signin", { email, password });

      localStorage.setItem("token", res.data.token);
      setUser(res.data);

      const { from } = location.state || { from: { pathname: "/cidades" } };
      history.replace(from);
    } catch (err) {
      // TODO: handle error
    }
  };

  const createAccount = async ({ name, email, password }) => {
    try {
      await httpClient.post("/auth/signup", { name, email, password });
      login({ email, password });
    } catch (err) {
      // TODO: handle error
      /*
      if (response.data && response.data.error) {
        errors = {
          status: response.request.status,
          statusText: response.request.statusText,
          message: response.data.error,
        };
      }
      */
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    history.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        createAccount,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
