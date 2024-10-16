"use client";

import { useState, useEffect } from "react";
import { RefreshCwIcon } from "lucide-react";
import { Button } from "../../../components/button";
import styles from "./refresh.module.css";

interface RefreshComponentProps {
  onRefresh: () => void;
  autoRefreshInterval?: number;
}

export default function RefreshComponent({
  onRefresh,
  autoRefreshInterval = 300,
}: RefreshComponentProps) {
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(autoRefreshInterval);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilRefresh((prevTime) => {
        if (prevTime <= 1) {
          handleRefresh();
          return autoRefreshInterval;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onRefresh, autoRefreshInterval]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeUntilRefresh(autoRefreshInterval);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.refreshContainer}>
      <Button
        onClick={handleRefresh}
        style={{
          width: "100%",
          minWidth: "8rem",
          backgroundColor: "#000",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RefreshCwIcon
          className={`${styles.refreshIcon} ${isRefreshing ? styles.spin : ""}`}
        />
        Refresh
      </Button>
      <p className={styles.refreshTimer}>
        Auto-refresh in{" "}
        <span className={styles.refreshTime}>
          {formatTime(timeUntilRefresh)}
        </span>
      </p>
    </div>
  );
}
