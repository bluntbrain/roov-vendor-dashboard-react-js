import React, { useContext } from "react";
import { IOrder } from "../../../types/order.types";
import styles from "./order.module.css";
import { formatDateTime } from "../../../utils/helpers";

import box from "../../../assets/icons/box.png";
import {
  adminChangeOrderStatus,
  changeOrderStatus,
} from "../../../apis/product.apis";
import { toast } from "react-toastify";
import { UserContext } from "../../../context/user-context";

interface Props {
  data: IOrder;
  refresh: () => void;
}

export const Order = ({ data, refresh }: Props) => {
  const { user } = useContext(UserContext);
  //user.isAdmin

  const handleOrderApproval = async (approvalStatus: boolean) => {
    const res = await changeOrderStatus(data._id ?? "", { approvalStatus });
    if (res.order?._id) {
      toast("Order " + (approvalStatus ? "Accepted" : "Rejected"));
      refresh();
    } else {
      toast("Something went wrong", { type: "error" });
    }
  };
  const handleAdminOrderChange = async (
    status:
      | "PENDING"
      | "IN_TRANSIT"
      | "COMPLETED"
      | "MERCHANT_ACCEPTED"
      | "MERCHANT_REJECTED"
      | "DELIVERED"
  ) => {
    const res = await adminChangeOrderStatus(data._id ?? "", {
      status,
    });
    if (res.order?._id) {
      toast("Order moved to " + status);
      refresh();
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
        ) : data.status === "MERCHANT_ACCEPTED" && user.isAdmin ? (
          <button
            className={`${styles.button} ${styles.acceptButton}`}
            onClick={() => handleAdminOrderChange("IN_TRANSIT")} // You might want to modify this handler for transit.
          >
            Move to Transit
          </button>
        ) : data.status === "IN_TRANSIT" && user.isAdmin ? (
          <button
            className={`${styles.button} ${styles.acceptButton}`}
            onClick={() => handleAdminOrderChange("DELIVERED")} // You might want to modify this handler for transit.
          >
            Move to Delivered
          </button>
        ) : data.status === "MERCHANT_REJECTED" ? (
          <div
            className={styles.statusBadge}
            style={{ backgroundColor: "#f00" }}
          >
            Rejected
          </div>
        ) : (
          <div className={styles.statusBadge}>
            {data.status === "MERCHANT_ACCEPTED"
              ? "To Be Collected"
              : data.status === "IN_TRANSIT"
              ? "In Transit"
              : data.status === "DELIVERED"
              ? "Delivered"
              : "Rejected"}
          </div>
        )}
      </div>
    </div>
  );
};
