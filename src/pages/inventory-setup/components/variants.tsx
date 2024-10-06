import React from "react";
import { IVariant } from "../../../types/product.types";

import styles from "./varient.module.css";

import close from "../../../assets/icons/close.png";

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
    <div>
      {data.map((variant, idx) => {
        return (
          <div key={idx} className={styles.container}>
            <div className={styles.row}>
              <div
                className={styles.colorPalette}
                style={{ backgroundColor: variant.color?.hex }}
              >
                <h1 className={styles.colorHex}>{variant.color?.hex}</h1>
              </div>
              <h1 className={styles.colorName}>{variant.color?.name}</h1>
              <img
                src={close}
                alt=""
                className={styles.close}
                onClick={() => handleRemoveVariant(idx)}
              />
            </div>
            <div className={styles.row} style={{ marginTop: 10 }}>
              {variant.sizes?.map((size, idx) => {
                return (
                  <div key={idx} className={styles.sizeContainer}>
                    <p className={styles.size}>{size.sizeName}</p>
                    <p className={styles.quantity}>{size.availbleQuantity}</p>
                  </div>
                );
              })}
            </div>
            <div className={styles.row} style={{ marginTop: 10 }}>
              {variant.images?.map((image, idx) => {
                return (
                  <img src={image.url} key={idx} className={styles.image} />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
