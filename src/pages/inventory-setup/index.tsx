import React, { useContext } from "react";
import { Layout } from "../../components";

import styles from "./styles.module.css";
import { TextField, Button as MuiButton } from "@mui/material";
import { changeHandler } from "../login/utils";
import { Variants } from "./components/variants";
import { IVariant } from "../../types/product.types";
import { AddNewVariant } from "./components/add-new-variant";
import { createProduct } from "../../apis/product.apis";
import { UserContext } from "../../context/user-context";
import { toast } from "react-toastify";
import { navigate } from "../../utils/helpers";

const commonTextStyles = {
  marginBottom: "20px",
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
    setVariants([...variants, newVariant]);
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

  const buttonDisabled =
    !brandName || !productName || !category || !price || !variants.length;

  return (
    <Layout>
      <div className={styles.inventorySetupContainer}>
        <div className={styles.formSection}>
          <h1 className={styles.header}>Add New Product</h1>
          <div className={styles.formGrid}>
            <TextField
              autoFocus
              value={brandName}
              onChange={(e) => changeHandler(setBrandName, e.target.value, 50)}
              style={commonTextStyles}
              label="Brand Name"
              variant="outlined"
              fullWidth
            />
            <TextField
              value={productName}
              onChange={(e) =>
                changeHandler(setProductName, e.target.value, 50)
              }
              style={commonTextStyles}
              label="Product Name"
              variant="outlined"
              fullWidth
            />
            <TextField
              multiline
              minRows={3}
              value={productDescription}
              onChange={(e) =>
                changeHandler(setProductDescription, e.target.value, 260)
              }
              style={commonTextStyles}
              label="Product Description"
              variant="outlined"
              fullWidth
            />
            <TextField
              value={category}
              onChange={(e) => changeHandler(setCategory, e.target.value, 50)}
              style={commonTextStyles}
              label="Category"
              variant="outlined"
              fullWidth
            />
            <TextField
              value={subCategory}
              onChange={(e) =>
                changeHandler(setSubCategory, e.target.value, 50)
              }
              style={commonTextStyles}
              label="Sub Category"
              variant="outlined"
              fullWidth
            />
            <TextField
              value={price}
              onChange={(e) => changeHandler(setPrice, e.target.value, 50)}
              style={commonTextStyles}
              label="Price (in rupees)"
              variant="outlined"
              type="number"
              fullWidth
            />
            <TextField
              value={discountedPrice}
              onChange={(e) =>
                changeHandler(setDiscountedPrice, e.target.value, 50)
              }
              style={commonTextStyles}
              label="Discounted Price (in rupees)"
              variant="outlined"
              type="number"
              fullWidth
            />
          </div>
          <AddNewVariant
            show={showAddNewVariant}
            setShow={setShowAddNewVariant}
            onSubmit={handleAddNewVariant}
          />
          <MuiButton
            variant="contained"
            color="primary"
            disabled={buttonDisabled}
            onClick={handleSubmit}
            className={styles.submitButton}
          >
            Add Product
          </MuiButton>
        </div>
        <div className={styles.variantsSection}>
          <h2 className={styles.subHeader}>Product Variants</h2>
          {!variants.length && (
            <p className={styles.variantNote}>
              At least one variant is required
            </p>
          )}
          <Variants data={variants} setData={setVariants} />
        </div>
      </div>
    </Layout>
  );
};
