import React, { useContext, useEffect, useState } from "react";
import { IOrder } from "../../../types/order.types";
import { UserContext } from "../../../context/user-context";
import { getOrders } from "../../../apis/product.apis";
import { Order } from "./order";

import styles from "../styles.module.css";
import { Paginator } from "../../inventory/components/paginator";

interface Props {
  status: "PENDING" | "IN_TRANSIT" | "COMPLETED" | "MERCHANT_ACCEPTED";
}
export const OrderCategory = ({ status }: Props) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { user } = useContext(UserContext);
  const { token = "" } = user;

  const fetchOrders = async (pg: number) => {
    const res = await getOrders(token, pg, status);
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

  return (
    <div style={{ paddingLeft: "16px" }}>
      <h2 className={styles.header}>
        {status == "PENDING"
          ? "Available Order Requests"
          : status == "MERCHANT_ACCEPTED"
          ? "Running Orders - To Be Collected"
          : status == "IN_TRANSIT"
          ? "Running Orders - In Transit"
          : "Running Orders - Delivered"}
      </h2>
      {!!orders.length ? (
        <div style={{ overflowX: "auto", display: "flex" }}>
          {orders.map((order, index) => (
            <Order key={index} data={order} />
          ))}
        </div>
      ) : (
        <h4 className={styles.noOrders}>No Orders found</h4>
      )}

      {(hasNextPage || hasPreviousPage) && (
        <Paginator
          onPreviousPage={() => fetchOrders(page - 1)}
          onNextPage={() => fetchOrders(page + 1)}
          {...{ hasNextPage, hasPreviousPage, page }}
        />
      )}
    </div>
  );
};
