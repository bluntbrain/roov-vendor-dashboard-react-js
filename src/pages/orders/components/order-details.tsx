import React from "react";
import { IOrder } from "../../../types/order.types";
import VerticalLinearStepper from "../../../components/stepper";
import { formatDateTime } from "../../../utils/helpers";

import styles from "./order.module.css";

interface Props {
  data: IOrder;
}
export const OrderDetails = ({ data }: Props) => {
  if (!data._id) return null;
  return (
    <div style={{ width: "100%", padding: 20 }}>
      <h4>Order Details</h4>
      <VerticalLinearStepper
        activeStep={
          data.status == "PENDING"
            ? 0
            : data.status == "IN_TRANSIT"
            ? 1
            : data.status == "COMPLETED"
            ? 2
            : 0
        }
      />
      <h5 style={{marginTop: 30}}>Created at {formatDateTime(data.createdAt)}</h5>
      <div className={styles.itemContainer}>
        {data?.items?.map((item, index) => (
          <div key={index} style={{ display: "flex", gap: "12px" }}>
            <img
              src={item.productId?.thumbnail}
              alt=""
              className={styles.itemImage}
            />
            <div>
              <h5>Price: {item.price}</h5>
              <h5>Quantity : {item.quantity}</h5>
            </div>
          </div>
        ))}
      </div>
      <h5 style={{marginTop: 30}}>Payment Details</h5>
      {data.items?.map((item, idx) => (
        <div key={idx} className={styles.paymentRow}>
          <h6>Item {idx + 1}</h6>
          <h6>₹ {item.price}</h6>
        </div>
      ))}
      <div className={styles.paymentRow}>
        <h6>Shipping</h6>
        <h6>₹ {data.shippingCharge}</h6>
      </div>
      <div className={styles.paymentRow}>
        <h6>Total</h6>
        <h6>₹ {data.totalAmount}</h6>
      </div>
    </div>
  );
};
