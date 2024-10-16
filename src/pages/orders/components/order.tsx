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
  onStatusChange?: () => void;
}

export const Order = ({ data, onClick, isSelected, onStatusChange }: Props) => {
  const handleOrderApproval = async (
    approvalStatus: boolean,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    try {
      const res = await changeOrderStatus(data._id ?? "", { approvalStatus });
      if (res.order?._id) {
        toast(`Order ${approvalStatus ? "Accepted" : "Rejected"}`);
        if (onStatusChange) {
          onStatusChange();
        }
      } else {
        toast("Something went wrong", { type: "error" });
      }
    } catch (error) {
      console.error("Error changing order status:", error);
      toast("Failed to change order status", { type: "error" });
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "#4CAF50";
      case "MERCHANT_REJECTED":
        return "#FF4141";
      default:
        return "#FFA500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "Delivered";
      case "MERCHANT_REJECTED":
        return "Rejected";
      default:
        return status.replace(/_/g, " ");
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
      <div className={styles.itemContainerWrapper}>
        <div className={styles.itemContainer}>
          {data?.items?.map((item, index) => (
            <img
              key={index}
              src={item.productId?.thumbnail}
              alt=""
              className={styles.itemImage}
            />
          ))}
        </div>
      </div>
      <div
        className={styles.statusBadge}
        style={{ backgroundColor: getStatusBadgeColor(data.status) }}
      >
        {getStatusText(data.status)}
      </div>
      {data.status === "PENDING" && (
        <div className={styles.actionButtons}>
          <button
            onClick={(e) => handleOrderApproval(true, e)}
            className={styles.acceptButton}
          >
            Accept
          </button>
          <button
            onClick={(e) => handleOrderApproval(false, e)}
            className={styles.rejectButton}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};
