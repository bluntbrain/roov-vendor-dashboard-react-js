import { useState, useCallback, useEffect, useContext } from "react";
import { Layout } from "../../components";
import { OrderCategory } from "./components/order-category";
import RefreshComponent from "./components/refresh";
import styles from "./styles.module.css";
import { UserContext } from "../../context/user-context";
import { getAllOrders, getOrders } from "../../apis/product.apis";
import { IOrder } from "../../types/order.types";

export const Home = () => {
  const [allOrders, setAllOrders] = useState<IOrder[]>([]);

  const { user } = useContext(UserContext);
  const { token = "" } = user;

  const fetchOrders = useCallback(async () => {
    if (!token) return;

    try {
      const res = user?.isAdmin
        ? await getAllOrders(token)
        : await getOrders(token);

      if (res.docs.length) {
        setAllOrders(res.docs);
      }
    } catch (err) {
      console.error("Home: Error fetching orders", err);
    }
  }, [token, user?.isAdmin]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleRefresh = useCallback(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <Layout>
      <div className={styles.homeContainer}>
        <div className={styles.header}>
          <h3 className={styles.title}>Order Categories</h3>
          <RefreshComponent
            onRefresh={handleRefresh}
            autoRefreshInterval={300}
          />
        </div>
        <div className={styles.orderCategoriesGrid}>
          {[
            "PENDING",
            "MERCHANT_ACCEPTED",
            "IN_TRANSIT",
            "DELIVERED",
            "MERCHANT_REJECTED",
          ].map((status) => (
            <OrderCategory
              key={`order-category-${status}`}
              status={status as IOrder["status"]}
              title={getStatusTitle(status)}
              orders={allOrders}
              onRefresh={handleRefresh}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

const getStatusTitle = (status: string): string => {
  switch (status) {
    case "PENDING":
      return "Available Order Requests";
    case "MERCHANT_ACCEPTED":
      return "To Be Collected";
    case "IN_TRANSIT":
      return "In Transit";
    case "DELIVERED":
      return "Delivered";
    case "MERCHANT_REJECTED":
      return "Rejected";
    default:
      return "Unknown Status";
  }
};
