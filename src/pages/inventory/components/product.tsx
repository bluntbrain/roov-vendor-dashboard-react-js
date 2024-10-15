import { useState, useRef } from "react";
import { IProduct, IVariant } from "../../../types/product.types";

import styles from "../styles.module.css";
import close from "../../../assets/icons/close.png";
import addIcon from "../../../assets/icons/add.png"; // Make sure this icon exists in your assets
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
      // toast("Product updated successfully", { type: "success" });
      // updateProducts(); // refresh product list
    } else {
      toast("Error updating product", { type: "error" });
    }
  };
  const [expandedVariant, setExpandedVariant] = useState<string | null>(null);
  const imageUploadRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

  const triggerImageUpload = (variantId: string) => {
    const uploadElement = imageUploadRefs.current[variantId];
    if (uploadElement) {
      const inputElement = uploadElement.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (inputElement) {
        inputElement.click();
      }
    }
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productHeader}>
        <img src={data.thumbnail} alt="" className={styles.productImage} />
        <div style={{marginLeft: "10px"}}>
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
      <div className={styles.variantsSection}>
        <h3 className={styles.variantsTitle}>Variants</h3>
        {data?.variant?.map((variant, vIndex) => (
          <div key={vIndex} className={styles.variantItem}>
            <div
              className={styles.variantHeader}
              onClick={() =>
                setExpandedVariant(
                  expandedVariant === variant._id ? null : variant._id || null
                )
              }
            >
              <h4 className={styles.variantColor}>{variant.color?.name}</h4>
              <span className={styles.expandIcon}>
                {expandedVariant === variant._id ? "▼" : "▶"}
              </span>
            </div>
            {expandedVariant === variant._id && (
              <div className={styles.variantDetails}>
                <div className={styles.variantImages}>
                  {variant.images?.map((image, idx) => (
                    <div key={idx} className={styles.imageWrapper}>
                      <img
                        src={image.url}
                        alt=""
                        className={styles.variantImage}
                      />
                      <img
                        src={close}
                        alt="Remove"
                        className={styles.removeImage}
                        onClick={() => handleRemoveImage(variant, idx)}
                      />
                    </div>
                  ))}
                  <div
                    className={styles.addImageButton}
                    onClick={() => triggerImageUpload(variant._id!)}
                  >
                    <img src={addIcon} alt="Add" className={styles.addIcon} />
                    <span className={styles.addImageText}>Add Image</span>
                  </div>
                  <div
                    style={{ display: "none" }}
                    ref={(el) => (imageUploadRefs.current[variant._id!] = el)}
                  >
                    <ImageUpload
                      title="Add Image"
                      onUpload={(url) => handleAddImage(variant, url)}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                <div className={styles.sizesList}>
                  {variant.sizes?.map((size, idx) => (
                    <div key={idx} className={styles.sizeItem}>
                      <span className={styles.sizeName}>{size.sizeName}</span>
                      <div className={styles.quantityControl}>
                        <button
                          className={styles.quantityButton}
                          onClick={() =>
                            handleUpdateQuantity(
                              variant._id!,
                              size._id!,
                              (size?.availbleQuantity ?? 0) - 1
                            )
                          }
                        >
                          -
                        </button>
                        <span className={styles.quantity}>
                          {size.availbleQuantity}
                        </span>
                        <button
                          className={styles.quantityButton}
                          onClick={() =>
                            handleUpdateQuantity(
                              variant._id!,
                              size._id!,
                              (size?.availbleQuantity ?? 0) + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
