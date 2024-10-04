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
}
export const Button = ({
  loading,
  style,
  children,
  disabled,
  onClick = () => null,
}: Props) => {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
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
