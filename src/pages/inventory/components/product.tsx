import React, { useState } from "react";
import { IProduct, IVariant } from "../../../types/product.types";

import styles from "../styles.module.css";
import close from "../../../assets/icons/close.png";
import add from "../../../assets/icons/add.png";
import ImageUpload from "../../login/components/image-upload";
import plus from "../../../assets/icons/plus.png";
import minus from "../../../assets/icons/remove.png";
import {
  updateProduct,
  updateQuantity,
  updateVariant,
} from "../../../apis/product.apis";
import { toast } from "react-toastify";

interface Props {
  data: IProduct;
  updateProducts: () => void;
}
export const Product = ({ data, updateProducts }: Props) => {
  const [editableProduct, setEditableProduct] = useState({
    name: data.name || "",
    brand: data.brand || "",
    description: data.description || "",
    price: data.price || 0,
    discountedPrice: data.discountedPrice || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableProduct({ ...editableProduct, [name]: value });
  };

  const handleUpdateProduct = async () => {
    const updatedProduct = { ...editableProduct };
    const res = await updateProduct(updatedProduct, data?._id ?? "");

    if (res.data._id) {
      toast("Product updated successfully", { type: "success" });
      updateProducts(); // refresh product list
    } else {
      toast("Error updating product", { type: "error" });
    }
  };

  const handleRemoveImage = async (variant: IVariant, index: number) => {
    const newImages = variant.images?.filter((_, i) => i !== index);
    const newVariant = { ...variant, images: newImages };
    console.log("new variant", newVariant);

    const res = await updateVariant({
      productId: data._id!,
      variantId: variant._id!,
      data: newVariant,
    });

    if (res.data._id) {
      toast("Variant updated successfully", { type: "success" });
      updateProducts();
    } else {
      toast("Error updating variant", { type: "error" });
    }
  };
  const handleAddImage = async (variant: IVariant, url: string) => {
    const newImages = [...(variant.images ?? []), { url }];
    const newVariant = { ...variant, images: newImages };
    console.log("new variant", newVariant);

    const res = await updateVariant({
      productId: data._id!,
      variantId: variant._id!,
      data: newVariant,
    });

    if (res.data._id) {
      toast("Variant updated successfully", { type: "success" });
      updateProducts();
    } else {
      toast("Error updating variant", { type: "error" });
    }
  };

  const handleUpdateQuantity = async (
    variantId: string,
    sizeId: string,
    quantity: number
  ) => {
    if (quantity < 0) {
      return;
    }

    const res = await updateQuantity({
      productId: data._id!,
      variantId: variantId,
      sizeId: sizeId,
      quantity: quantity,
    });

    if (res.data._id) {
      toast("Size updated successfully", { type: "success" });
      updateProducts();
    } else {
      toast("Error updating Size", { type: "error" });
    }
  };

  return (
    <div className={styles.product_container}>
      <div className={styles.row}>
        <img src={data.thumbnail} alt="" className={styles.image} />
        <div>
          <input
            name="name"
            value={editableProduct.name}
            onChange={handleChange}
            onBlur={handleUpdateProduct}
            className={styles.name + " " + styles.input}
          />

          <input
            name="brand"
            value={editableProduct.brand}
            onChange={handleChange}
            onBlur={handleUpdateProduct}
            className={styles.brand + " " + styles.input}
          />

          <textarea
            name="description"
            value={editableProduct.description}
            onChange={handleChange}
            onBlur={handleUpdateProduct}
            className={styles.description + " " + styles.input}
          />
          <div className={styles.row} style={{ marginTop: 10 }}>
            <h4 className={styles.price}>
              Price: ₹
              <input
                name="price"
                value={editableProduct.price}
                onChange={handleChange}
                onBlur={handleUpdateProduct}
                className={styles.input}
                style={{ display: "inline" }}
              />
            </h4>
            <h4 className={styles.price}>
              Discounted Price: ₹
              <input
                name="discountedPrice"
                value={editableProduct.discountedPrice}
                onChange={handleChange}
                onBlur={handleUpdateProduct}
                className={styles.input}
                style={{ display: "inline" }}
              />
            </h4>
          </div>
        </div>
      </div>
      <h2 className={styles.name} style={{ marginTop: "20px" }}>
        Variants
      </h2>

      {data?.variant?.map((variant, vIndex) => (
        <div key={vIndex} className={styles.variantContainer}>
          {/* <h2 className={styles.subHeader}>{variant.color?.name}</h2> */}
          <div
            className={styles.row}
            style={{ alignItems: "center", marginTop: 16 }}
          >
            <h2 className={styles.brand}>{variant.color?.name}</h2>
          </div>
          <div
            className={styles.row}
            style={{ alignItems: "center", marginTop: 16 }}
          >
            <h6 className={styles.subHeader}>Images</h6>
            {variant.images?.map((image, idx) => (
              <div
                key={idx}
                style={{ position: "relative" }}
                onClick={() => handleRemoveImage(variant, idx)}
              >
                <img src={image.url} alt="" className={styles.variantImage} />
                <img src={close} alt="" className={styles.close} />
              </div>
            ))}
            <ImageUpload
              title="Add Image"
              onUpload={(url) => handleAddImage(variant, url)}
              style={{ maxWidth: "160px" }}
              displayImage={false}
            />
          </div>
          <div
            className={styles.row}
            style={{ alignItems: "center", marginTop: 10 }}
          >
            <h6 className={styles.subHeader}>Sizes</h6>

            {variant.sizes?.map((size, idx) => (
              <div key={idx} className={styles.sizeContainer}>
                <p>{size.sizeName}</p>
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  <img
                    style={{ height: "16px", width: "16px", cursor: "pointer" }}
                    src={minus}
                    alt=""
                    onClick={() =>
                      handleUpdateQuantity(
                        variant._id!,
                        size._id!,
                        (size?.availbleQuantity ?? 0) - 1
                      )
                    }
                  />
                  <p>{size.availbleQuantity}</p>
                  <img
                    style={{ height: "16px", width: "16px", cursor: "pointer" }}
                    src={plus}
                    alt=""
                    onClick={() =>
                      handleUpdateQuantity(
                        variant._id!,
                        size._id!,
                        (size?.availbleQuantity ?? 0) + 1
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
