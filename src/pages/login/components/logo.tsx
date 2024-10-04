import React from "react";
import styles from "../styles.module.css";
import logo from "../../../assets/images/logo-with-tag.png";

export const Logo = () => {
  return <img src={logo} className={styles.logo} alt="logo" />;
};
