import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import { AuthContextProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
