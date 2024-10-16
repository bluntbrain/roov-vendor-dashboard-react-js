import { TextField } from "@mui/material";

import styles from "../styles.module.css";
import { Button } from "../../../components/button";
import { Logo } from "./logo";
import { changeHandler } from "../utils";
import { Back } from "./back";

import locationImg from "../../../assets/icons/location.png";
import { toast } from "react-toastify";
import { useState } from "react";

type TCoordinates = {
  lat?: string | number;
  long?: string | number;
};

interface Props {
  warehouse: string;
  setWarehouse: (val: string) => void;
  street: string;
  setStreet: (val: string) => void;
  landmark: string;
  setLandmark: (val: string) => void;
  pincode: string;
  setPincode: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  provision: string;
  setProvision: (val: string) => void;
  coordinates: TCoordinates;
  setCoordinates: React.Dispatch<React.SetStateAction<TCoordinates>>;
  onSubmit: () => void;
  loading: boolean;
  onBackPress: () => void;
}
export const EnterInfo2 = ({
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
  onSubmit,
  loading,
  onBackPress,
}: Props) => {
  const [enterManually, setEnterManually] = useState(false);

  const buttonDisabled =
    !warehouse ||
    !street ||
    !landmark ||
    !pincode ||
    !city ||
    !provision ||
    !coordinates.lat ||
    !coordinates.long;

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (!position.coords) {
            toast("Location information is unavailable.", {
              type: "error",
            });
          }
          console.log({ latitude, longitude });
          setCoordinates({ lat: latitude, long: longitude });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              toast("User denied the request for Geolocation.", {
                type: "error",
              });
              break;
            case error.POSITION_UNAVAILABLE:
              toast("Location information is unavailable.", {
                type: "error",
              });
              break;
            case error.TIMEOUT:
              toast("The request to get user location timed out.", {
                type: "error",
              });
              break;
            default:
              toast("An error occurred while fetching the location.", {
                type: "error",
              });
          }
        }
      );
    } else {
      toast("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className={styles.container}>
      <Back handleBack={onBackPress} />
      <Logo />
      <div className={styles.fadeIn}>
        <h3 className={styles.header2}>Location Details</h3>
        <h3 className={styles.content}>
          Please enter your details to continue.
        </h3>

        {enterManually && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <TextField
              autoFocus
              value={coordinates.lat}
              onChange={(e) =>
                setCoordinates((prev) => ({
                  ...prev,
                  lat: e.target.value,
                }))
              }
              className={styles.input}
              style={{ marginTop: "20px", backgroundColor: "#fff" }}
              label="Latitude"
              variant="outlined"
            />
            <TextField
              autoFocus
              value={coordinates.long}
              onChange={(e) =>
                setCoordinates((prev) => ({
                  ...prev,
                  long: e.target.value,
                }))
              }
              className={styles.input}
              style={{ marginTop: "20px", backgroundColor: "#fff" }}
              label="Longitude"
              variant="outlined"
            />
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
          <button className={styles.location} onClick={getLocation}>
            <img
              className={styles.locationImg}
              src={locationImg}
              alt="location"
            />
            <text>Detect Location</text>
          </button>
          <button
            className={styles.location}
            onClick={() => setEnterManually(true)}
          >
            Enter Coordinates Manually
          </button>
        </div>
        <TextField
          autoFocus
          value={warehouse}
          onChange={(e) => changeHandler(setWarehouse, e.target.value, 12)}
          className={styles.input}
          style={{ marginTop: "20px", backgroundColor: "#fff" }}
          label="Warehouse Number"
          variant="outlined"
        />
        <TextField
          value={street}
          onChange={(e) => changeHandler(setStreet, e.target.value, 50)}
          className={styles.input}
          style={{ marginTop: "20px", backgroundColor: "#fff" }}
          label="Lane/Street"
          variant="outlined"
        />
        <TextField
          value={landmark}
          onChange={(e) => changeHandler(setLandmark, e.target.value, 50)}
          className={styles.input}
          style={{ marginTop: "20px", backgroundColor: "#fff" }}
          label="Landmark"
          variant="outlined"
          autoComplete="email"
        />
        <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
          <TextField
            value={pincode}
            onChange={(e) =>
              changeHandler(setPincode, e.target.value, 6, "number")
            }
            className={styles.input}
            style={{ marginTop: "20px", backgroundColor: "#fff" }}
            label="Pincode"
            variant="outlined"
            autoComplete="email"
          />
          <TextField
            value={city}
            onChange={(e) => changeHandler(setCity, e.target.value, 50)}
            className={styles.input}
            style={{ marginTop: "20px", backgroundColor: "#fff" }}
            label="City"
            variant="outlined"
            autoComplete="email"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
          <TextField
            value={provision}
            onChange={(e) => changeHandler(setProvision, e.target.value, 30)}
            className={styles.input}
            style={{ marginTop: "20px", backgroundColor: "#fff" }}
            label="State"
            variant="outlined"
            autoComplete="email"
          />
          <TextField
            value={"India"}
            className={styles.input}
            style={{ marginTop: "20px", backgroundColor: "#fff" }}
            label="County"
            variant="outlined"
            autoComplete="email"
          />
        </div>
        <Button
          loading={loading}
          disabled={buttonDisabled}
          style={{ marginTop: "50px" }}
          onClick={onSubmit}
        >
          Add & Continue
        </Button>
      </div>
      <div />
    </div>
  );
};
