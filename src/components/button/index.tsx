import React from "react";
// import { LoadingButton } from '@mui/lab';
import styles from "./styles.module.css";
import { InfinitySpin } from "react-loader-spinner";

interface Props {
  loading?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  loading,
  style,
  children,
  disabled,
  onClick = () => null,
  className = "",
}: Props) => {
  return (
    <button
      className={`${styles.button} ${
        disabled ? styles.disabled : ""
      } ${className}`}
      disabled={disabled}
      style={style}
      onClick={onClick}
    >
      {loading ? (
        <div style={{ paddingRight: "34px" }}>
          <InfinitySpin width="80" color="#fff" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
