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
  isSelected: boolean;
}

export const Order = ({ data, onClick, isSelected }: Props) => {
  const handleOrderApproval = async (
    approvalStatus: boolean,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const res = await changeOrderStatus(data._id ?? "", { approvalStatus });
    if (res.order?._id) {
      toast("Order " + (approvalStatus ? "Accepted" : "Rejected"));
    } else {
      toast("Something went wrong", { type: "error" });
    }
  };

  return (
    <div
      className={`${styles.orderContainer} ${
        isSelected ? styles.selected : ""
      }`}
      onClick={onClick}
    >
      <div className={styles.orderHeader}>
        <img src={box} alt="" className={styles.box} />
        <div className={styles.orderInfo}>
          <span className={styles.orderId}>{data?._id}</span>
          <span className={styles.date}>{formatDateTime(data?.createdAt)}</span>
        </div>
        <span className={styles.price}>₹ {data?.totalAmount}</span>
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
      {data.status === "PENDING" ? (
        <div className={styles.actionButtons}>
          <button
            className={`${styles.button} ${styles.acceptButton}`}
            onClick={(e) => handleOrderApproval(true, e)}
          >
            Accept
          </button>
          <button
            className={`${styles.button} ${styles.rejectButton}`}
            onClick={(e) => handleOrderApproval(false, e)}
          >
            Reject
          </button>
        </div>
      ) : (
        <div className={styles.statusBadge}>
          {data.status === "IN_TRANSIT" ? "In Transit" : "Completed"}
        </div>
      )}
    </div>
  );
};
