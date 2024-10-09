import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../components";
import { IOrder } from "../../types/order.types";
import { UserContext } from "../../context/user-context";
import { getOrders } from "../../apis/product.apis";
import { Order } from "./components/order";
import { OrderDetails } from "./components/order-details";

export const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder>({});

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

  return (
    <Layout style={{ display: "flex" }}>
      <div style={{ padding: "16px" }}>
        <h3 style={{paddingBlock: '12px'}}>Orders</h3>
        {orders.map((item, index) => (
          <Order
            key={index}
            data={item}
            onClick={() => setSelectedOrder(item)}
          />
        ))}
      </div>
      <OrderDetails data={selectedOrder} />
    </Layout>
  );
};
