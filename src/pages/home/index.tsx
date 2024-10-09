import React from "react";
import { Layout } from "../../components";

import { OrderCategory } from "./components/order-category";

export const Home = () => {
  return (
    <Layout>
      <OrderCategory status="PENDING" />
      <OrderCategory status="MERCHANT_ACCEPTED" />
      <OrderCategory status="IN_TRANSIT" />
      <OrderCategory status="COMPLETED" />
    </Layout>
  );
};
