import React, { useState } from "react";
import styles from "../styles.module.css";
import { IVariant } from "../../../types/product.types";
import { TextField, Button, IconButton } from "@mui/material";
import { changeHandler } from "../../login/utils";
import ImageUpload from "../../login/components/image-upload";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { ChromePicker } from "react-color";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (val: IVariant) => void;
}

export const AddNewVariant = ({ show, setShow, onSubmit }: Props) => {
  const [variant, setVariant] = useState<IVariant>({});
  const [colorName, setColorName] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const disabled =
    !variant.color?.name ||
    !variant.color?.hex ||
    !variant.sizes?.length ||
    !variant.images?.length;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleColorChange = (color: any) => {
    setVariant({
      ...variant,
      color: {
        ...variant.color,
        hex: color.hex,
      },
    });
  };

  const handleColorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setColorName(name);
    setVariant({
      ...variant,
      color: {
        ...variant.color,
        name: name,
      },
    });
  };

  const handleSubmit = () => {
    console.log({ variant });
    onSubmit(variant);
    setVariant({});
    setColorName("");
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
        variant="outlined"
        color="primary"
        onClick={() => setShow(true)}
        className={styles.addVariantButton}
      >
        Add New Variant
      </Button>
    );
  }

  return (
    <div className={styles.addVariantForm}>
      <h2 className={styles.variantFormTitle}>Add New Variant</h2>
      <div className={styles.variantFormGrid}>
        <TextField
          value={colorName}
          onChange={handleColorNameChange}
          label="Color Name"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "16px" }}
        />
        <div className={styles.colorPickerContainer}>
          <Button
            variant="outlined"
            onClick={() => setShowColorPicker(!showColorPicker)}
            style={{ backgroundColor: variant.color?.hex || "#fff" }}
          >
            {variant.color?.hex || "Pick a color"}
          </Button>
          {showColorPicker && (
            <div className={styles.colorPicker}>
              <ChromePicker
                color={variant.color?.hex || "#fff"}
                onChange={handleColorChange}
              />
            </div>
          )}
        </div>
      </div>
      <h3 className={styles.variantSectionTitle}>Sizes & Quantities</h3>
      {variant.sizes?.map((size, idx) => (
        <div key={idx} className={styles.row}>
          <span className={styles.sizeName}>{size.sizeName}</span>
          <span className={styles.availableQuantity}>
            {size.availbleQuantity}
          </span>
          <IconButton onClick={() => handleRemoveSize(idx)} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      ))}
      <div className={styles.row}>
        <TextField
          value={size}
          onChange={(e) => changeHandler(setSize, e.target.value, 26)}
          label="Size"
          variant="outlined"
          size="small"
        />
        <TextField
          value={quantity}
          onChange={(e) =>
            changeHandler(setQuantity, e.target.value, 9, "number")
          }
          label="Quantity"
          variant="outlined"
          type="number"
          size="small"
        />
        <IconButton onClick={handleNewSize} color="primary">
          <AddIcon />
        </IconButton>
      </div>
      <div className={styles.variantImageSection}>
        <h3 className={styles.variantSectionTitle}>Product Variant Images</h3>
        <div className={styles.variantImageGrid}>
          {variant.images?.map((image) => (
            <img
              key={image.url}
              src={image.url}
              alt=""
              className={styles.variantImage}
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
      </div>
      <Button
        variant="contained"
        color="primary"
        disabled={disabled}
        onClick={handleSubmit}
        className={styles.addVariantSubmitButton}
      >
        Add Variant
      </Button>
    </div>
  );
};
