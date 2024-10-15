import { useState } from "react";
import { Layout } from "../../components";
import { OrderCategory } from "./components/order-category";
import styles from "./styles.module.css";

export const Home = () => {
  const [refresh, setRefresh] = useState(new Date().getTime());
  return (
    <Layout>
      <div className={styles.homeContainer}>
        <div className={styles.orderCategoriesGrid}>
          <OrderCategory
            key={"order category pending" + refresh}
            status="PENDING"
            title="Available Order Requests"
            refresh={() => setRefresh(new Date().getTime())}
          />
          <OrderCategory
            key={"order category accept" + refresh}
            status="MERCHANT_ACCEPTED"
            title="To Be Collected"
            refresh={() => setRefresh(new Date().getTime())}
          />
          <OrderCategory
            key={"order category transit" + refresh}
            status="IN_TRANSIT"
            title="In Transit"
            refresh={() => setRefresh(new Date().getTime())}
          />
          <OrderCategory
            key={"order category completed" + refresh}
            status="DELIVERED"
            title="Delivered"
            refresh={() => setRefresh(new Date().getTime())}
          />
          <OrderCategory
            key={"order category rejected" + refresh}
            status="MERCHANT_REJECTED"
            title="Rejected"
            refresh={() => setRefresh(new Date().getTime())}
          />
        </div>
      </div>
    </Layout>
  );
};
