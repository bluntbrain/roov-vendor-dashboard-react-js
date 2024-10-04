import React from "react";
import { Layout } from "../../components";

import styles from "./styles.module.css";
import { TextField } from "@mui/material";
import { changeHandler } from "../login/utils";

const commonTextStyles = {
  marginTop: "20px",
  backgroundColor: "#fff",
  width: "100%",
};

export const InventorySetup = () => {
  const [brandName, setBrandName] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [discountedPrice, setDiscountedPrice] = React.useState("");

  return (
    <Layout style={{ display: "flex" }}>
      <div className={styles.left}>
        <h1 className={styles.header}>Add Product</h1>
        <div className={styles.row}>
          <TextField
            autoFocus
            value={brandName}
            onChange={(e) => changeHandler(setBrandName, e.target.value, 50)}
            className={styles.input}
            style={commonTextStyles}
            label="Brand Name"
            variant="outlined"
          />
          <TextField
            value={productName}
            onChange={(e) => changeHandler(setProductName, e.target.value, 50)}
            className={styles.input}
            style={commonTextStyles}
            label="Product Name"
            variant="outlined"
          />
        </div>
        <TextField
          multiline
          minRows={3}
          value={productDescription}
          onChange={(e) =>
            changeHandler(setProductDescription, e.target.value, 260)
          }
          className={styles.input}
          style={commonTextStyles}
          label="Product Description"
          variant="outlined"
        />
        <div className={styles.row}>
          <TextField
            value={category}
            onChange={(e) => changeHandler(setCategory, e.target.value, 50)}
            className={styles.input}
            style={commonTextStyles}
            label="Category"
            variant="outlined"
          />
          <TextField
            value={subCategory}
            onChange={(e) => changeHandler(setSubCategory, e.target.value, 50)}
            className={styles.input}
            style={commonTextStyles}
            label="Sub Category"
            variant="outlined"
          />
        </div>
        <div className={styles.row}>
          <TextField
            value={price}
            onChange={(e) => changeHandler(setPrice, e.target.value, 50)}
            className={styles.input}
            style={commonTextStyles}
            label="Price (in rupees)"
            variant="outlined"
          />
          <TextField
            value={discountedPrice}
            onChange={(e) => changeHandler(setDiscountedPrice, e.target.value, 50)}
            className={styles.input}
            style={commonTextStyles}
            label="Discounted Price (in rupees)"
            variant="outlined"
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.subHeader}>Variants</h1>
      </div>
    </Layout>
  );
};
