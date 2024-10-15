import React from "react";
import { IVariant } from "../../../types/product.types";

import styles from "./variant.module.css";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  data: IVariant[];
  setData: React.Dispatch<React.SetStateAction<IVariant[]>>;
}
export const Variants = ({ data = [], setData }: Props) => {
  const handleRemoveVariant = (index: number) => {
    const localData = data ?? [];
    const updatedData = localData.filter((_, idx) => idx !== index);

    setData(updatedData);
  };

  return (
    <div className={styles.variantsList}>
      {data.map((variant, idx) => (
        <div key={idx} className={styles.variantItem}>
          <div className={styles.variantHeader}>
            <div
              className={styles.colorPalette}
              style={{ backgroundColor: variant.color?.hex }}
            >
              <span className={styles.colorHex}>{variant.color?.hex}</span>
            </div>
            <h3 className={styles.colorName}>{variant.color?.name}</h3>
            <CloseIcon
              className={styles.closeIcon}
              onClick={() => handleRemoveVariant(idx)}
            />
          </div>
          <div className={styles.sizeGrid}>
            {variant.sizes?.map((size, sizeIdx) => (
              <div key={sizeIdx} className={styles.sizeItem}>
                <span className={styles.sizeName}>{size.sizeName}</span>
                <span className={styles.quantity}>{size.availbleQuantity}</span>
              </div>
            ))}
          </div>
          <div className={styles.variantImageGrid}>
            {variant.images?.map((image, imgIdx) => (
              <img
                src={image.url}
                key={imgIdx}
                className={styles.variantImage}
                alt=""
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
