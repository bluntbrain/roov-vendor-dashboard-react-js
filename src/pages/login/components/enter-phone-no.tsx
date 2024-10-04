import { TextField } from "@mui/material";

import styles from "../styles.module.css";
import { Button } from "../../../components/button";
import { Logo } from "./logo";
import { changeHandler } from "../utils";
import { useEffect } from "react";

interface Props {
  phone: string;
  setPhone: (phone: string) => void;
  handleLogin: () => void;
  loading: boolean;
}
export const EnterPhoneNo = ({
  phone,
  setPhone,
  handleLogin,
  loading,
}: Props) => {
  const disableSendOtp = phone.length !== 10 || isNaN(Number(phone));

  useEffect(()=>{
    setPhone('')
  },[])

  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.fadeIn}>
        <h3 className={styles.header}>WELCOME!</h3>
        <h3 className={styles.header2}>Login</h3>
        <h3 className={styles.content}>
          Please enter your details to continue.
        </h3>
        <TextField
          autoFocus
          value={phone}
          onChange={(e) =>
            changeHandler(setPhone, e.target.value, 10, 'number')
          }
          className={styles.input}
          style={{ marginTop: "20px", backgroundColor: "#fff" }}
          label="Mobile number"
          autoComplete="phone"
          variant="outlined"
        />
        <Button
          loading={loading}
          disabled={disableSendOtp}
          style={{ marginTop: "50px" }}
          onClick={handleLogin}
        >
          Send OTP
        </Button>
      </div>
      <div />
    </div>
  );
};
