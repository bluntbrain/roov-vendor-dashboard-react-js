import React, { useContext, useEffect } from "react";
import { Layout } from "../../components";

import styles from "./styles.module.css";
import { Button, TextField } from "@mui/material";
import { changeHandler } from "../login/utils";
import { Variants } from "./components/variants";
import { IVariant } from "../../types/product.types";
import { AddNewVariant } from "./components/add-new-variant";
import { createProduct } from "../../apis/product.apis";
import { UserContext } from "../../context/user-context";
import { toast } from "react-toastify";
import { navigate } from "../../utils/helpers";

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
  const [variants, setVariants] = React.useState<IVariant[]>([]);
  const [showAddNewVariant, setShowAddNewVariant] = React.useState(false);

  const { user } = useContext(UserContext);

  const handleAddNewVariant = (newVariant: IVariant) => {
    const localVariants = [...variants, newVariant];
    setVariants(localVariants);
  };

  const handleSubmit = async () => {
    console.log({
      brandName,
      productName,
      productDescription,
      category,
      subCategory,
      price,
      discountedPrice,
      variants,
    });

    const res = await createProduct({
      name: productName,
      brand: brandName,
      description: productDescription,
      category,
      subCategory,
      price: Number(price),
      discountedPrice: Number(discountedPrice),
      variant: variants ?? [],
      thumbnail: variants?.[0]?.images?.[0]?.url,
      vendor_id: user?._id,
    });

    if (res.data?._id) {
      toast("Product created successfully", { type: "success" });
      navigate("inventory");
    } else {
      toast("Something went wrong", { type: "error" });
    }
  };

  const buttonDisabled = !brandName || !productName || !category || !price || !variants.length;

  return (
    <Layout style={{ display: "flex" }}>
      <div className={styles.left}>
        <div className={styles.row} style={{ justifyContent: "space-between" }}>
          <h1 className={styles.header}>Add Product</h1>
          <Button
            style={{
              marginTop: "50px",
              width: 200,
              border:buttonDisabled ? "1px solid #0004" : "1px solid #1976d2",
            }}
            disabled={buttonDisabled}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
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
            onChange={(e) =>
              changeHandler(setDiscountedPrice, e.target.value, 50)
            }
            className={styles.input}
            style={commonTextStyles}
            label="Discounted Price (in rupees)"
            variant="outlined"
          />
        </div>
        <AddNewVariant
          show={showAddNewVariant}
          setShow={setShowAddNewVariant}
          onSubmit={handleAddNewVariant}
        />
      </div>
      <div className={styles.right}>
        <h1 className={styles.subHeader}>Variants {!variants.length && '(atleast 1 variant is required)'}</h1>
        <Variants data={variants} setData={setVariants} />
      </div>
    </Layout>
  );
};
