import React from "react";
import { IOrder } from "../../../types/order.types";
import { Order } from "./order";
import styles from "../styles.module.css";

interface Props {
  status: IOrder["status"];
  title: string;
  orders: IOrder[];
  onRefresh: () => void;
}

export const OrderCategory: React.FC<Props> = ({
  status,
  title,
  orders,
  onRefresh,
}) => {
  const filteredOrders = orders.filter((order) => order.status === status);

  return (
    <div className={styles.orderCategory}>
      <h2 className={styles.categoryHeader}>{title}</h2>
      {filteredOrders.length ? (
        <div className={styles.orderList}>
          {filteredOrders.map((order) => (
            <Order key={order._id} data={order} refresh={onRefresh} />
          ))}
        </div>
      ) : (
        <h4 className={styles.noOrders}>No Orders found</h4>
      )}
    </div>
  );
};
