import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import logo from "../../assets/images/logo-with-tag.png";
import { navigate } from "../../utils/helpers";
import { UserContext } from "../../context/user-context";

export const Navbar = () => {
  const [activePath, setActivePath] = useState(window.location.pathname);

  const {user} = useContext(UserContext);
  
  useEffect(() => {
    const handleLocationChange = () => {
      setActivePath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path); // Assuming navigate() is your custom helper for navigation
    setActivePath(path);
  };

  return (
    <nav className={styles.navbar}>
      <img src={logo} alt="logo" className={styles.logo} />
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          style={{ color: activePath === "/" ? "#000" : "#0007" }}
          onClick={() => handleNavigation("")}
        >
          Home
        </button>
        <button
          className={styles.button}
          style={{ color: activePath === "/inventory" ? "#000" : "#0007" }}
          onClick={() => handleNavigation("inventory")}
        >
          Inventory
        </button>
        <button
          className={styles.button}
          style={{ color: activePath === "/orders" ? "#000" : "#0007" }}
          onClick={() => handleNavigation("orders")}
        >
          Orders
        </button>
      </div>
    </nav>
  );
};
