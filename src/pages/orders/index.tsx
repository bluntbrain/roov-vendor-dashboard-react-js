import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../components";
import { IOrder } from "../../types/order.types";
import { UserContext } from "../../context/user-context";
import { getOrders } from "../../apis/product.apis";
import { Order } from "./components/order";
import { OrderDetails } from "./components/order-details";
import styles from "./orders.module.css"; // We'll create this file

export const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const { user } = useContext(UserContext);
  const { token = "" } = user;

  const fetchOrders = async (pg: number) => {
    const res = await getOrders(token, pg);
    if (res.docs.length) {
      setOrders(res.docs);
      setHasNextPage(res.hasNextPage);
      setHasPreviousPage(res.hasPrevPage);
      setPage(res.page);
    }
  };

  useEffect(() => {
    token && fetchOrders(1);
  }, [token]);

  const handlePagination = (direction: "prev" | "next") => {
    const newPage = direction === "prev" ? page - 1 : page + 1;
    fetchOrders(newPage);
  };

  return (
    <Layout>
      <div className={styles.ordersContainer}>
        <div className={styles.ordersList}>
          <h2 className={styles.title}>Your Orders</h2>
          <div className={styles.ordersGrid}>
            {orders.map((item, index) => (
              <Order
                key={index}
                data={item}
                onClick={() => setSelectedOrder(item)}
                isSelected={selectedOrder?._id === item._id}
              />
            ))}
          </div>
          <div className={styles.pagination}>
            <button
              onClick={() => handlePagination("prev")}
              disabled={!hasPreviousPage}
              className={styles.paginationButton}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>Page {page}</span>
            <button
              onClick={() => handlePagination("next")}
              disabled={!hasNextPage}
              className={styles.paginationButton}
            >
              Next
            </button>
          </div>
        </div>
        <div className={styles.orderDetails}>
          {selectedOrder ? (
            <OrderDetails data={selectedOrder} />
          ) : (
            <div className={styles.noOrderSelected}>
              <h3>Select an order to view details</h3>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
