import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { navigate } from "./utils/helpers";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { InventorySetup } from "./pages/inventory-setup";
import { Orders } from "./pages/orders";
import { UserContext } from "./context/user-context";
import { Inventory } from "./pages/inventory";

function App() {
  const [user, setUser] = React.useState<{ token?: string }>({});

  const navigateToLogin = () => {
    if (window.location.pathname !== "/login") {
      navigate("login");
    }
  };
  React.useEffect(() => {
    // return
    const userFromLocalStorage = localStorage.getItem("user") ?? "";

    if (userFromLocalStorage) {
      const parsedUser = JSON.parse(userFromLocalStorage);
      if (parsedUser.token) {
        setUser(parsedUser);
      } else {
        navigateToLogin();
      }
    } else {
      navigateToLogin();
    }
  }, []);

  return (
    <>
      <ToastContainer autoClose={4000} />
      <div className="App">
        <Router>
          <UserContext.Provider
            value={{
              user,
              setUser,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inventory-setup" element={<InventorySetup />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </UserContext.Provider>
        </Router>
      </div>
    </>
  );
}

export default App;
