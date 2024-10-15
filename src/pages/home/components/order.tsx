import React from "react";
import { IOrder } from "../../../types/order.types";
import styles from "./order.module.css";
import { formatDateTime } from "../../../utils/helpers";

import box from "../../../assets/icons/box.png";
import { changeOrderStatus } from "../../../apis/product.apis";
import { toast } from "react-toastify";

interface Props {
  data: IOrder;
}

export const Order = ({ data }: Props) => {
  const handleOrderApproval = async (approvalStatus: boolean) => {
    const res = await changeOrderStatus(data._id ?? "", { approvalStatus });
    if (res.order?._id) {
      toast("Order " + (approvalStatus ? "Accepted" : "Rejected"));
    } else {
      toast("Something went wrong", { type: "error" });
    }
  };

  return (
    <div className={styles.orderContainer}>
      <div className={styles.orderHeader}>
        <img src={box} alt="" className={styles.boxIcon} />
        <div className={styles.orderInfo}>
          <span className={styles.orderId}>{data?._id}</span>
          <span className={styles.date}>{formatDateTime(data?.createdAt)}</span>
          <span className={styles.price}>₹ {data?.totalAmount}</span>
        </div>
      </div>
      <div className={styles.itemContainer}>
        {data?.items?.slice(0, 3).map((item, index) => (
          <img
            key={index}
            src={item.productId?.thumbnail}
            alt=""
            className={styles.itemImage}
          />
        ))}
        {data?.items && data.items.length > 3 && (
          <div className={styles.moreItems}>+{data.items.length - 3}</div>
        )}
      </div>
      <div className={styles.orderFooter}>
        {data.status === "PENDING" ? (
          <div className={styles.actionButtons}>
            <button
              className={`${styles.button} ${styles.acceptButton}`}
              onClick={() => handleOrderApproval(true)}
            >
              Accept
            </button>
            <button
              className={`${styles.button} ${styles.rejectButton}`}
              onClick={() => handleOrderApproval(false)}
            >
              Reject
            </button>
          </div>
        ) : (
          <div className={styles.statusBadge}>
            {data.status === "MERCHANT_ACCEPTED"
              ? "To Be Collected"
              : data.status === "IN_TRANSIT"
              ? "In Transit"
              : "Delivered"}
          </div>
        )}
      </div>
    </div>
  );
};
