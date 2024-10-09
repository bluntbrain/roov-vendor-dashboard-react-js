import React, { useContext, useEffect, useState } from "react";
import { IProduct } from "../../types/product.types";
import { getProductByVendorId } from "../../apis/product.apis";
import { UserContext } from "../../context/user-context";
import { Layout } from "../../components";
import { Product } from "./components/product";
import { toast } from "react-toastify";

import styles from "./styles.module.css";
import { Paginator } from "./components/paginator";

export const Inventory = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { user } = useContext(UserContext);

  const fetchProducts = async (pg: number) => {
    const res = await getProductByVendorId(user._id!, pg);

    console.log("products :: ", res);
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
      <h1 className={styles.header}>Products</h1>
      {products.map((product) => {
        return (
          <Product
            key={product._id}
            data={product}
            updateProducts={() => fetchProducts(page)}
          />
        );
      })}
      <Paginator
        onPreviousPage={() => fetchProducts(page - 1)}
        onNextPage={() => fetchProducts(page + 1)}
        {...{ hasNextPage, hasPreviousPage, page }}
      />
    </Layout>
  );
};
