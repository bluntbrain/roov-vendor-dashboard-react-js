import React from "react";
import back from "../../../assets/icons/back.png";

interface Props {
  handleBack: () => void;
}
export const Back = ({ handleBack }: Props) => {
  return (
    <button
      style={{ backgroundColor: "#fff0", position: "absolute", top: "20px" }}
      onClick={handleBack}
    >
      <img
        src={back}
        alt="back"
        aria-label="back"
        style={{ width: "34px", height: "34px" }}
      />
    </button>
  );
};
