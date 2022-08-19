import React from 'react';
import styles from './Pagination.module.scss';

type TPaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<TPaginationProps> = ({ currentPage, onChangePage }) => {
  const pagePlus = () => (currentPage <= 3 ? onChangePage(currentPage + 1) : null);
  const pageMinus = () => (currentPage > 1 ? onChangePage(currentPage - 1) : null);

  return (
    <div className={styles.root}>
      <button className={styles.button} onClick={() => pageMinus()}>
        prev
      </button>
      <ul className={styles.pages}>
        {[...new Array(3)].map((_, index) => (
          <li
            className={index + 1 === currentPage ? `${styles.button} ${styles.currentPage}` : styles.button}
            key={index}
            onClick={() => onChangePage(index + 1)}
          >
            {index + 1}
          </li>
        ))}
      </ul>
      <button className={styles.button} onClick={() => pagePlus()}>
        next
      </button>
    </div>
  );
}

export default Pagination;
