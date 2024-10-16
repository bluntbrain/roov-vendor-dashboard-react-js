"use client";

import { useState, useEffect } from "react";
import { RefreshCwIcon } from "lucide-react";
import { Button } from "../../../components/button";

interface RefreshComponentProps {
  onRefresh: () => void;
  autoRefreshInterval?: number;
}

export default function RefreshComponent({
  onRefresh,
  autoRefreshInterval = 300,
}: RefreshComponentProps) {
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(autoRefreshInterval);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilRefresh((prevTime) => {
        if (prevTime <= 1) {
          onRefresh();
          return autoRefreshInterval;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onRefresh, autoRefreshInterval]);

  const handleRefresh = () => {
    onRefresh();
    setTimeUntilRefresh(autoRefreshInterval);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const buttonStyle = {
    width: "100%",
    maxWidth: "20rem",
    backgroundColor: "#000",
    color: "#fff",
    padding: "0.1rem 0.1rem",
    borderRadius: "0.25rem",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    transition: "background-color 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.1rem",
      }}
    >
      <Button onClick={handleRefresh} style={buttonStyle}>
        <RefreshCwIcon
          style={{ marginRight: "0.5rem", width: "1rem", height: "1rem" }}
        />
        Refresh
      </Button>
      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
        Auto-refresh in{" "}
        <span style={{ fontWeight: 500 }}>{formatTime(timeUntilRefresh)}</span>
      </p>
    </div>
  );
}
