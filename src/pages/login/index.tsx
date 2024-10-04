import React, { useEffect, useState } from "react";
import { Layout } from "../../components";

import styles from "./styles.module.css";
import { EnterPhoneNo } from "./components/enter-phone-no";
import { EnterOtp } from "./components/enter-otp";
import { EnterInfo1 } from "./components/enter-info-1";
import { EnterInfo2 } from "./components/enter-info-2";
import { LinearProgress } from "@mui/material";
import { EnterInfo3 } from "./components/enter-info-3";

export const Login = () => {
  const [state, setState] = useState<
    "PHONE_NO" | "OTP" | "INFO1" | "INFO2" | "INFO3"
  >("PHONE_NO");
  const [loading, setLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [shopContactNo, setShopContactNo] = useState<string>("");
  const [shopEmail, setShopEmail] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [warehouse, setWarehouse] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [landmark, setLandmark] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [provision, setProvision] = useState<string>("");
  const [coordinates, setCoordinates] = useState<{
    lat?: number;
    long?: number;
  }>({});
  const [registeredName, setRegisteredName] = useState<string>("");
  const [panNumber, setPanNumber] = useState<string>("");
  const [gstNumber, setGstNumber] = useState<string>("");
  const [lisenceNumber, setLisenceNumber] = useState<string>("");

  const [images, setImages] = useState<{
    uploadedPan?: string;
    uploadedGSTCertificate?: string;
    uploadedLicense?: string;
    uploadedRentDetails?: string;
  }>({});

  const handleLogin = async () => {
    setLoading(true);
    //some api call

    await handleSendOtp();
    setState("OTP");
    setLoading(false);
  };

  const handleSendOtp = async () => {
    //some api call
  };

  const handleSubmitOtp = async (code: string) => {
    setLoading(true);
    //some api call

    setLoading(false);
    setState("INFO1");
  };

  const handleSubmitInfo1 = async () => {
    setState("INFO2");
  };

  const handleSubmitInfo2 = async () => {
    setState("INFO3");
  };

  useEffect(() => {
    if (otp.length === 4) {
      handleSubmitOtp(otp);
    }
  }, [otp]);

  useEffect(() => {
    if (state == "PHONE_NO") {
      //clean all
    }
  }, [state]);

  return (
    <Layout className={styles.layout} noNavBar>
      <div className={styles.bg}>
        {["INFO1", "INFO2", "INFO3"].includes(state) ? (
          <LinearProgress
            variant="determinate"
            value={state == "INFO1" ? 30 : state == "INFO2" ? 60 : 90}
            style={{ width: "500px", height: "5px" }}
          />
        ) : null}
        {state == "PHONE_NO" ? (
          <EnterPhoneNo
            key="enter-phone-number"
            {...{ phone, setPhone, loading, handleLogin }}
          />
        ) : state == "OTP" ? (
          <EnterOtp
            key="enter-otp"
            onBackPress={() => setState("PHONE_NO")}
            handleResendOtp={handleSendOtp}
            {...{ phone, otp, setOtp, loading }}
          />
        ) : state == "INFO1" ? (
          <EnterInfo1
            key="enter-info-1"
            onBackPress={() => setState("PHONE_NO")}
            onSubmit={handleSubmitInfo1}
            {...{
              loading,
              ownerName,
              setOwnerName,
              shopContactNo,
              setShopContactNo,
              shopEmail,
              setShopEmail,
            }}
          />
        ) : state == "INFO2" ? (
          <EnterInfo2
            key="enter-info-2"
            onBackPress={() => setState("INFO1")}
            onSubmit={handleSubmitInfo2}
            {...{
              loading,
              warehouse,
              setWarehouse,
              street,
              setStreet,
              landmark,
              setLandmark,
              pincode,
              setPincode,
              city,
              setCity,
              provision,
              setProvision,
              coordinates,
              setCoordinates,
            }}
          />
        ) : state == "INFO3" ? (
          <EnterInfo3
            key="enter-info-3"
            onBackPress={() => setState("INFO2")}
            onSubmit={handleSubmitInfo1}
            {...{
              loading,
              registeredName,
              setRegisteredName,
              panNumber,
              setPanNumber,
              gstNumber,
              setGstNumber,
              lisenceNumber,
              setLisenceNumber,
              images,
              setImages,
            }}
          />
        ) : null}
      </div>
    </Layout>
  );
};
