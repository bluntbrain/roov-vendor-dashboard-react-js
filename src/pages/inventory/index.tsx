import React, { useContext, useEffect, useState } from "react";
import { IProduct } from "../../types/product.types";
import { getProductByVendorId } from "../../apis/product.apis";
import { UserContext } from "../../context/user-context";
import { Layout } from "../../components";
import { Product } from "./components/product";
import { toast } from "react-toastify";

import styles from "./styles.module.css";
import { Paginator } from "./components/paginator";
import { navigate } from "../../utils/helpers";

export const Inventory = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { user } = useContext(UserContext);

  const fetchProducts = async (pg: number) => {
    const res = await getProductByVendorId(user._id!, pg);

    if (res.docs) {
      setProducts(res.docs);
      setHasNextPage(res.hasNextPage);
      setHasPreviousPage(res.hasPrevPage);
      setPage(res.page);
    } else toast("No products found", { type: "error" });
  };

  useEffect(() => {
    user._id && fetchProducts(1);
  }, [user._id]);

  return (
    <Layout>
      <div className={styles.inventoryContainer}>
        <div className={styles.inventoryHeader}>
          <h1 className={styles.title}>Inventory Management</h1>
          <button
            className={styles.addProductButton}
            onClick={() => navigate("inventory-setup")}
          >
            Add New Product
          </button>
        </div>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <Product
              key={product._id}
              data={product}
              updateProducts={() => fetchProducts(page)}
            />
          ))}
        </div>
        <Paginator
          onPreviousPage={() => fetchProducts(page - 1)}
          onNextPage={() => fetchProducts(page + 1)}
          {...{ hasNextPage, hasPreviousPage, page }}
        />
      </div>
    </Layout>
  );
};
