import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import logo from "../../assets/images/logo-with-tag.png";
import { navigate } from "../../utils/helpers";

export const Navbar = () => {
  const [activePath, setActivePath] = useState(window.location.pathname);

  // Listen for URL changes and update active path
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

  const handleLogout = () => {
    // Handle logout logic
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
        <button
          className={styles.button}
          style={{ color: activePath === "/inventory-setup" ? "#000" : "#0007" }}
          onClick={() => handleNavigation("inventory-setup")}
        >
          Inventory Setup
        </button>
      </div>
    </nav>
  );
};
