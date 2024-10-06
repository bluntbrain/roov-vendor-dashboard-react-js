import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../components";

import styles from "./styles.module.css";
import { EnterPhoneNo } from "./components/enter-phone-no";
import { EnterOtp } from "./components/enter-otp";
import { EnterInfo1 } from "./components/enter-info-1";
import { EnterInfo2 } from "./components/enter-info-2";
import { LinearProgress } from "@mui/material";
import { EnterInfo3 } from "./components/enter-info-3";
import {
  getVendorDetails,
  sendOtp,
  updateVendorDetails,
  verifyOtp,
} from "../../apis/onboarding.apis";
import { toast } from "react-toastify";
import { navigate, splitName } from "../../utils/helpers";
import { UserContext } from "../../context/user-context";

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
  const [licenseNumber, setLicenseNumber] = useState<string>("");
  const [images, setImages] = useState<{
    uploadedPan?: string;
    uploadedGSTCertificate?: string;
    uploadedLicense?: string;
    uploadedRentDetails?: string;
  }>({});

  const { user, setUser } = useContext(UserContext);

  let token = "";

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await sendOtp({ phoneNumber: phone });
      if (res.status === "success") {
        setState("OTP");
      }
    } catch (err) {
      console.log(err);
      toast("Something went wrong, please try again later", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    try {
      const res = await sendOtp({ phoneNumber: phone });
      if (res.status === "success") {
        toast("OTP sent successfully", { type: "success" });
      } else {
        toast("Something went wrong, please try again later", {
          type: "error",
        });
      }
    } catch (err) {
      console.log(err);
      toast("Something went wrong, please try again later", { type: "error" });
    }
  };

  const handleVerifyVendor = async (token: string) => {
    const res = await getVendorDetails(token);
    if (res.firstName) {
      const newUser = { token, ...res };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("");
    } else {
      setUser({token, _id: res._id})
      setState("INFO1");
    }
  };

  const handleSubmitOtp = async (code: string) => {
    setLoading(true);

    try {
      const res = await verifyOtp({ phoneNumber: phone, otp: code });
      if (!!res.token) {
        token = res.token;
        handleVerifyVendor(res.token);
      } else if (res.message === "Invalid OTP") {
        toast("Invalid OTP", {
          type: "error",
        });
      } else {
        toast("Something went wrong, please try again later", {
          type: "error",
        });
      }
    } catch (err) {
      console.log(err);
      toast("Something went wrong, please try again later", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitInfo1 = async () => {
    setState("INFO2");
  };

  const handleSubmitInfo2 = async () => {
    setState("INFO3");
  };

  const handleSubmitInfo3 = async () => {
    const { firstName, middleName, lastName } = splitName(ownerName);
    const res = await updateVendorDetails(user?._id!, {
      firstName,
      middleName,
      lastName,
      shopContact: shopContactNo,
      shopEmail,
      // logo,
      address: {
        // formattedAddress: warehouse,
        city,
        state,
        country: "India",
        zipCode: Number(pincode),
        locality: street,
        // coordinates: {
        //   type: "Point",
        //   coordinates: [coordinates.long!, coordinates.lat!],
        // },
      },
      brandName: registeredName,
      panNumber,
      gstNumber,
      licenseNumber,
      uploadedPan: images.uploadedPan,
      uploadedGSTCertificate: images.uploadedGSTCertificate,
      uploadedLicense: images.uploadedLicense,
      uploadedRentDetails: images.uploadedRentDetails,
    });

    if (res._id) {
      toast("Vendor details updated successfully", { type: "success" });
      const newUser = { token, ...res };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("");
    } else {
      toast("Something went wrong, please try again later", { type: "error" });
    }
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
            onSubmit={handleSubmitInfo3}
            {...{
              loading,
              registeredName,
              setRegisteredName,
              panNumber,
              setPanNumber,
              gstNumber,
              setGstNumber,
              licenseNumber,
              setLicenseNumber,
              images,
              setImages,
            }}
          />
        ) : null}
      </div>
    </Layout>
  );
};
