import React, { useState } from "react";
import styles from "../styles.module.css";
import { IVariant } from "../../../types/product.types";
import { TextField } from "@mui/material";
import { changeHandler } from "../../login/utils";
import { Button } from "../../../components/button";

import Add from "../../../assets/icons/add.png";
import Close from "../../../assets/icons/close.png";
import ImageUpload from "../../login/components/image-upload";

const commonTextStyles = {
  marginTop: "20px",
  backgroundColor: "#fff",
  flex: 1,
};

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (val: IVariant) => void;
}
export const AddNewVariant = ({ show, setShow, onSubmit }: Props) => {
  const [variant, setVariant] = useState<IVariant>({});
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");

  const disabled =
    !variant.color?.name ||
    !variant.color?.hex ||
    !variant.sizes?.length ||
    !variant.images?.length;

  const handleColorNameChange = (name: string = "") => {
    setVariant({ ...variant, color: { ...variant.color, name } });
  };
  const handleColorHexChange = (hex: string = "") => {
    setVariant({ ...variant, color: { ...variant.color, hex } });
  };

  const handleSubmit = () => {
    console.log({ variant });
    onSubmit(variant);
    setVariant({});
    setSize("");
    setQuantity("");
    setShow(false);
  };

  const handleNewSize = () => {
    if (!size || !quantity) return;
    setVariant({
      ...variant,
      sizes: [
        ...(variant.sizes ?? []),
        { sizeName: size, availbleQuantity: Number(quantity) },
      ],
    });
    setSize("");
    setQuantity("");
  };
  const handleRemoveSize = (index: number) => {
    const localSizes = variant.sizes ?? [];
    const updatedSizes = localSizes.filter((_, idx) => idx !== index);

    setVariant({ ...variant, sizes: updatedSizes });
  };

  if (!show) {
    return (
      <Button
        style={{ marginTop: "50px", width: 200 }}
        onClick={() => setShow(true)}
      >
        Add New Variant
      </Button>
    );
  }

  return (
    <div>
      <h2 className={styles.subHeader} style={{ marginTop: 30 }}>
        Add New Variant
      </h2>
      <div className={styles.row}>
        <TextField
          value={variant.color?.name}
          onChange={(e) =>
            changeHandler(handleColorNameChange, e.target.value, 26)
          }
          className={styles.input}
          style={commonTextStyles}
          label="Color Name"
          variant="outlined"
        />
        <TextField
          value={"#" + (variant.color?.hex?.slice(1, 10) ?? "")}
          onChange={(e) =>
            changeHandler(handleColorHexChange, e.target.value, 9)
          }
          className={styles.input}
          style={commonTextStyles}
          label="Color Value (Hex code)"
          variant="outlined"
        />
        {variant.color?.hex?.length && variant.color?.hex?.length > 3 && (
          <div
            style={{
              height: 58,
              width: 58,
              backgroundColor: variant.color?.hex,
              borderRadius: 5,
              border: "2px solid #000",
            }}
          ></div>
        )}
      </div>
      {variant.sizes?.length ? (
        <>
          <div className={styles.row}>
            <h3 className={styles.label}>Size</h3>
            <h3 className={styles.label}>Quantity</h3>
          </div>

          <div style={{ marginTop: 10 }}>
            {variant.sizes?.map((size, idx) => {
              return (
                <div
                  key={idx}
                  className={styles.row}
                  style={{ alignItems: "center", marginTop: 6 }}
                >
                  <h1 className={styles.sizeName}>{size.sizeName}</h1>
                  <h1 className={styles.availableQuantity}>
                    {size.availbleQuantity}
                  </h1>
                  <img
                    src={Close}
                    alt=""
                    className={styles.close}
                    onClick={() => handleRemoveSize(idx)}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h3 className={styles.label} style={{ width: 300 }}>
          Add Sizes & Quantities (atleast 1)
        </h3>
      )}
      <div className={styles.row}>
        <TextField
          value={size}
          onChange={(e) => changeHandler(setSize, e.target.value, 26)}
          className={styles.input}
          style={commonTextStyles}
          label="Size"
          variant="outlined"
        />
        <TextField
          value={quantity}
          onChange={(e) =>
            changeHandler(setQuantity, e.target.value, 9, "number")
          }
          className={styles.input}
          style={commonTextStyles}
          label="Quantity"
          variant="outlined"
        />
        <button
          onClick={handleNewSize}
          style={{ backgroundColor: "#0000", marginBottom: 10 }}
        >
          <img src={Add} alt="" style={{ height: 30, width: 30 }} />
        </button>
      </div>
      <h3 className={styles.label} style={{ width: 300 }}>
        Product Variant Images (atleast 1)
      </h3>
      <div className={styles.row} style={{ marginTop: 10 }}>
        {variant.images?.map((image) => (
          <img
            key={image.url}
            src={image.url}
            alt=""
            className={styles.productImage}
          />
        ))}
      </div>

      <ImageUpload
        title="Upload Product Images"
        onUpload={(url) =>
          setVariant({
            ...variant,
            images: [...(variant.images ?? []), { url }],
          })
        }
        style={{ marginTop: 16 }}
        displayImage={false}
      />
      <Button
        disabled={disabled}
        style={{ marginTop: "50px", width: "200px" }}
        onClick={handleSubmit}
      >
        Add Variant
      </Button>
    </div>
  );
};
