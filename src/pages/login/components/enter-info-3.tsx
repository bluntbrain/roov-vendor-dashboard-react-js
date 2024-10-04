import { TextField } from "@mui/material";

import styles from "../styles.module.css";
import { Button } from "../../../components/button";
import { Logo } from "./logo";
import { changeHandler } from "../utils";
import { Back } from "./back";
import ImageUpload from "./image-upload";

type TImages = {
  uploadedPan?: string;
  uploadedGSTCertificate?: string;
  uploadedLicense?: string;
  uploadedRentDetails?: string;
};

interface Props {
  registeredName: string;
  setRegisteredName: (val: string) => void;
  panNumber: string;
  setPanNumber: (val: string) => void;
  gstNumber: string;
  setGstNumber: (val: string) => void;
  lisenceNumber: string;
  setLisenceNumber: (val: string) => void;
  onSubmit: () => void;
  images: TImages;
  setImages: React.Dispatch<React.SetStateAction<TImages>>;
  loading: boolean;
  onBackPress: () => void;
}
export const EnterInfo3 = ({
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
  onSubmit,
  loading,
  onBackPress,
}: Props) => {
  const buttonDisabled =
    !registeredName ||
    !panNumber ||
    !gstNumber ||
    !lisenceNumber ||
    !images.uploadedPan ||
    !images.uploadedGSTCertificate ||
    !images.uploadedLicense ||
    !images.uploadedRentDetails;

  return (
    <div className={styles.container}>
      <Back handleBack={onBackPress} />
      <Logo />
      <div className={styles.fadeIn}>
        <h3 className={styles.header2}>Upload Documents</h3>
        <h3 className={styles.content}>
          Please enter your details to continue.
        </h3>
        <TextField
          autoFocus
          value={registeredName}
          onChange={(e) => changeHandler(setRegisteredName, e.target.value, 50)}
          className={styles.input}
          style={{ marginTop: "20px", backgroundColor: "#fff" }}
          label="Brand Registered Name"
          variant="outlined"
        />
        <TextField
          autoFocus
          value={panNumber}
          onChange={(e) => changeHandler(setPanNumber, e.target.value, 50)}
          className={styles.input}
          style={{ marginTop: "20px", backgroundColor: "#fff" }}
          label="PAN Number"
          variant="outlined"
        />
        <TextField
          autoFocus
          value={gstNumber}
          onChange={(e) => changeHandler(setGstNumber, e.target.value, 50)}
          className={styles.input}
          style={{ marginTop: "20px", backgroundColor: "#fff" }}
          label="GST Number"
          variant="outlined"
        />
        <TextField
          autoFocus
          value={lisenceNumber}
          onChange={(e) => changeHandler(setLisenceNumber, e.target.value, 50)}
          className={styles.input}
          style={{ marginTop: "20px", backgroundColor: "#fff" }}
          label="Lisence Number"
          variant="outlined"
        />
        <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
          <ImageUpload
            title="GST Certificate"
            onUpload={(url) =>
              setImages((prev) => ({ ...prev, uploadedGSTCertificate: url }))
            }
          />
          <ImageUpload
            title="PAN Card"
            onUpload={(url) =>
              setImages((prev) => ({ ...prev, uploadedPan: url }))
            }
          />
        </div>
        <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
          <ImageUpload
            title="Lisence"
            onUpload={(url) =>
              setImages((prev) => ({ ...prev, uploadedLicense: url }))
            }
          />
          <ImageUpload
            title="Rent Details"
            onUpload={(url) =>
              setImages((prev) => ({ ...prev, uploadedRentDetails: url }))
            }
          />
        </div>
        <Button
          loading={loading}
          disabled={buttonDisabled}
          style={{ marginTop: "50px" }}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
      <div />
    </div>
  );
};
