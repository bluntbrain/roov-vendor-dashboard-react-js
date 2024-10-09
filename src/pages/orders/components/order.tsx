import React from "react";
import { IOrder } from "../../../types/order.types";
import styles from "./order.module.css";
import { formatDateTime } from "../../../utils/helpers";

import box from "../../../assets/icons/box.png";
import { changeOrderStatus } from "../../../apis/product.apis";
import { toast } from "react-toastify";

interface Props {
  data: IOrder;
  onClick: () => void;
}
export const Order = ({ data, onClick }: Props) => {
  const handleOrderApproval = async (approvalStatus: boolean) => {
    const res = await changeOrderStatus(data._id ?? "", { approvalStatus });
    if (res.order?._id) {
      toast("Order " + approvalStatus ? "Accepted" : "Rejected");
    } else {
      toast("Something went wrong", { type: "error" });
    }
  };

  return (
    <div className={styles.orderContainer} onClick={onClick}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <img src={box} alt="" className={styles.box} />
        <div>
          <h6 className={styles.orderId}>{data?.razorPayOrderId}</h6>
          <h5 className={styles.date}>{formatDateTime(data?.createdAt)}</h5>
          <h5 className={styles.price}>₹ {data?.totalAmount}</h5>
        </div>
      </div>
      <div className={styles.itemContainer}>
        {data?.items?.map((item, index) => (
          <div key={index}>
            <img
              src={item.productId?.thumbnail}
              alt=""
              className={styles.itemImage}
            />
          </div>
        ))}
      </div>
      {data.status == "PENDING" ? (
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            className={styles.button}
            style={{ backgroundColor: "#4CAF50" }}
            onClick={() => handleOrderApproval(true)}
          >
            Accept
          </button>
          <button
            className={styles.button}
            style={{ backgroundColor: "#FF4141" }}
            onClick={() => handleOrderApproval(false)}
          >
            Reject
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", marginTop: "10px" }}>
          <div className={styles.button} style={{ backgroundColor: "#4CAF50" }}>
            Order Accepted
          </div>
        </div>
      )}
    </div>
  );
};
