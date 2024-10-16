import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import logo from "../../assets/images/logo-with-tag.png";
import { navigate } from "../../utils/helpers";
import { UserContext } from "../../context/user-context";

export const Navbar = () => {
  const [activePath, setActivePath] = useState(window.location.pathname);

  const { user, setUser } = useContext(UserContext);

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
    navigate(path);
    setActivePath(path);
  };

  const handleLogout = () => {
    // Clear user data from context
    setUser({});
    // Clear user data from localStorage
    localStorage.removeItem("user");
    // Navigate to login page
    navigate("login");
  };

  return (
    <nav className={styles.navbar}>
      <img src={logo} alt="logo" className={styles.logo} />
      {user.isAdmin && (
        <h3 style={{ fontSize: "24px", color: "var(--primary" }}>Admin</h3>
      )}
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          style={{ color: activePath === "/" ? "#000" : "#0007" }}
          onClick={() => handleNavigation("")}
        >
          Home
        </button>
        {!user.isAdmin && (
          <>
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
          </>
        )}
        <button
          className={`${styles.button} ${styles.logoutButton}`}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};
