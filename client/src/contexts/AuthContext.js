import { createContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { httpClient } from "../services";

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
          if (user && user.location) {
            setUser({ ...res.data, location: user.location });
          } else {
            setUser(res.data);
          }
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

      const { from } = location.state || { from: { pathname: "/destinos" } };
      history.replace(from);
    } catch (err) {
      toast.error(err.response.data.error || "Erro ao fazer login");
    }
  };

  const createAccount = async ({ name, email, password }) => {
    try {
      await httpClient.post("/auth/signup", { name, email, password });
      login({ email, password });
    } catch (err) {
      // erros de formulário ao criar conta (TEMPORÁRIO)
      const res = err.response;
      if (res.data.errors) {
        res.data.errors.forEach((e) => {
          toast.error(e.message);
        });
      } else {
        toast.error(res.data.error || "Erro ao criar conta");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    history.push("/");
  };

  const setUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUser({
          ...user,
          location: [position.coords.latitude, position.coords.longitude],
        });
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        createAccount,
        logout,
        setUserLocation,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
