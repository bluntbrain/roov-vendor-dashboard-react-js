import { TextField } from "@mui/material";

import styles from "../styles.module.css";
import { Button } from "../../../components/button";
import { Logo } from "./logo";
import { changeHandler } from "../utils";
import { Back } from "./back";

interface Props {
  ownerName: string;
  setOwnerName: (val: string) => void;
  shopContactNo: string;
  setShopContactNo: (val: string) => void;
  shopEmail: string;
  setShopEmail: (val: string) => void;
  onSubmit: () => void;
  loading: boolean;
  onBackPress: () => void;
}
export const EnterInfo1 = ({
  ownerName,
  setOwnerName,
  shopContactNo,
  setShopContactNo,
  shopEmail,
  setShopEmail,
  onSubmit,
  loading,
  onBackPress,
}: Props) => {
  const buttonDisabled = !ownerName || !shopContactNo || !shopEmail;

  return (
    <div className={styles.container}>
      <Back handleBack={onBackPress} />
      <Logo />
      <div className={styles.fadeIn}>
        <h3 className={styles.header2}>Basic Information</h3>
        <h3 className={styles.content}>
          Please enter your details to continue.
        </h3>
        <TextField
          autoFocus
          value={ownerName}
          onChange={(e) => changeHandler(setOwnerName, e.target.value, 50)}
          className={styles.input}
          style={{ marginTop: "20px", backgroundColor: "#fff" }}
          label="Owner Name"
          variant="outlined"
        />
        <TextField
          value={shopContactNo}
          onChange={(e) => changeHandler(setShopContactNo, e.target.value, 10, 'number')}
          className={styles.input}
          style={{ marginTop: "20px", backgroundColor: "#fff" }}
          label="Shop Contact"
          variant="outlined"
        />
        <TextField
          value={shopEmail}
          onChange={(e) => changeHandler(setShopEmail, e.target.value, 50)}
          className={styles.input}
          style={{ marginTop: "20px", backgroundColor: "#fff" }}
          label="Shop Email"
          variant="outlined"
          autoComplete="email"
        />
        <Button
          loading={loading}
          disabled={buttonDisabled}
          style={{ marginTop: "50px" }}
          onClick={onSubmit}
        >
          Verify & Continue
        </Button>
      </div>
      <div />
    </div>
  );
};
