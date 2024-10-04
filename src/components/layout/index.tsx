import React from "react";
import { Navbar } from "../navbar";

interface Props {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  noNavBar?: boolean;
  handleActivityClick?: () => void;
}
export const Layout = ({ children, className, style, noNavBar }: Props) => {
  return (
    <>
      {!noNavBar && <Navbar />}
      <main style={{ minHeight: "100%", ...style }} {...{ className }}>
        {children}
      </main>
    </>
  );
};
