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

  const getStatusStep = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return 3;
      case "MERCHANT_REJECTED":
        return 0;
      case "IN_TRANSIT":
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div style={{ width: "100%", padding: 20 }}>
      <h4>Order Details</h4>
      <div className={styles.orderInfo}>
        <p>
          <strong>Order ID:</strong> {data._id}
        </p>
        <p>
          <strong>Status:</strong> {data.status.replace(/_/g, " ")}
        </p>
        <p>
          <strong>Delivery Time:</strong> {data.deliveryTime}
        </p>
      </div>
      <VerticalLinearStepper activeStep={getStatusStep(data.status)} />
      <h5 style={{ marginTop: 30 }}>
        Created at {formatDateTime(data.createdAt)}
      </h5>
      <div className={styles.itemContainer}>
        {data?.items?.map((item, index) => (
          <div key={index} style={{ display: "flex", gap: "12px" }}>
            <img
              src={item.productId?.thumbnail}
              alt=""
              className={styles.itemImage}
            />
            <div>
              <h5>{item.productId?.name}</h5>
              <p>Brand: {item.productId?.brand}</p>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <h5 style={{ marginTop: 30 }}>Payment Details</h5>
      <div className={styles.paymentInfo}>
        <p>
          <strong>Payment Status:</strong> {data.paymentStatus}
        </p>
        <p>
          <strong>Razorpay Order ID:</strong> {data.razorPayOrderId}
        </p>
      </div>
      {data.items?.map((item, idx) => (
        <div key={idx} className={styles.paymentRow}>
          <h6>{item.productId?.name}</h6>
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
