import React, { useEffect } from "react";

import styles from "../styles.module.css";
import { Logo } from "./logo";
import OTPInput from "react-otp-input";
import { Back } from "./back";

interface Props {
  loading: boolean;
  onBackPress: () => void;
  phone: string;
  otp: string;
  setOtp: (otp: string) => void;
  handleResendOtp: () => void;
}
export const EnterOtp = ({
  loading,
  onBackPress,
  phone,
  otp,
  setOtp,
  handleResendOtp = () => null,
}: Props) => {
  useEffect(()=>{
    setOtp('')
  },[])
  
  return (
    <div className={styles.container}>
      <Back handleBack={onBackPress} />
      <Logo />
      <div
        className={styles.fadeIn}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h4>OTP sent to +91 {phone}</h4>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          shouldAutoFocus
          renderInput={(props) => (
            <input
              {...props}
              style={{
                width: "42px",
                height: "46px",
                border: "1px solid var(--primary",
                color: "var(--primary",
                borderRadius: "10px",
                marginInline: "6px",
                fontSize: "24px",
                fontWeight: "700",
                textAlign: "center",
              }}
            />
          )}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h5>Didn’t receive code?</h5>
          <h5
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={handleResendOtp}
          >
            Request Again
          </h5>
        </div>
      </div>
      <div />
    </div>
  );
};
