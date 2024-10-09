import React from "react";

interface Props {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}
export const Paginator = ({
  hasNextPage,
  hasPreviousPage,
  page,
  onNextPage,
  onPreviousPage,
}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <button disabled={!hasPreviousPage} onClick={onPreviousPage}>
        Previous
      </button>
      <p style={{ margin: "0 10px" }}>Page {page}</p>
      <button disabled={!hasNextPage} onClick={onNextPage}>
        Next
      </button>
    </div>
  );
};
