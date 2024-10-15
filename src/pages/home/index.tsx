import { Layout } from "../../components";
import { OrderCategory } from "./components/order-category";
import styles from "./styles.module.css";

export const Home = () => {
  return (
    <Layout>
      <div className={styles.homeContainer}>
        <div className={styles.orderCategoriesGrid}>
          <OrderCategory status="PENDING" title="Available Order Requests" />
          <OrderCategory status="MERCHANT_ACCEPTED" title="To Be Collected" />
          <OrderCategory status="IN_TRANSIT" title="In Transit" />
          <OrderCategory status="COMPLETED" title="Delivered" />
        </div>
      </div>
    </Layout>
  );
};
