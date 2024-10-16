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
  const [previousPendingCount, setPreviousPendingCount] = useState(0);

  const { user } = useContext(UserContext);
  const { token = "" } = user;

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const fetchOrders = useCallback(async () => {
    if (!token) return;

    try {
      const res = user?.isAdmin
        ? await getAllOrders(token)
        : await getOrders(token);

      if (res.docs.length) {
        setAllOrders(res.docs);
        checkForNewOrders(res.docs);
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

  const checkForNewOrders = (orders: IOrder[]) => {
    const pendingOrders = orders.filter((order) => order.status === "PENDING");
    if (pendingOrders.length > previousPendingCount) {
      sendNotification(
        "New Order Requests",
        `You have ${
          pendingOrders.length - previousPendingCount
        } new order request(s) available.`
      );
    }
    setPreviousPendingCount(pendingOrders.length);
  };

  const sendNotification = (title: string, body: string) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/path/to/icon.png", // Add an icon path if you have one
      });
      console.log("[home] Notification sent:", title); // Added log
    }
  };

  const requestNotificationPermission = () => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        }
      });
    }
  };

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
