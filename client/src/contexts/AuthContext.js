import { createContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [user, setUser] = useState();
  const history = useHistory();

  const login = async ({ email, password }) => {
    try {
      const user = await axios.post("/api/signin", { email, password });
      setUser(user);
    } catch (err) {
      // TODO: handle error
    }
  };

  const createAccount = async ({ name, email, password }) => {
    try {
      await axios.post("/api/signup", { name, email, password });
      login({ email, password });
    } catch (err) {
      // TODO: handle error
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
