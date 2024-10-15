import styles from "../styles.module.css";

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
    <div className={styles.paginator}>
      <button
        className={styles.paginatorButton}
        disabled={!hasPreviousPage}
        onClick={onPreviousPage}
      >
        Previous
      </button>
      <span className={styles.pageInfo}>Page {page}</span>
      <button
        className={styles.paginatorButton}
        disabled={!hasNextPage}
        onClick={onNextPage}
      >
        Next
      </button>
    </div>
  );
};
