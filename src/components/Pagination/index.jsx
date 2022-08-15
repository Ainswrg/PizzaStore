import styles from './Pagination.module.scss';

function Pagination({ page, setPage }) {
  const pagePlus = () => (page <= 3 ? setPage(page + 1) : null);
  const pageMinus = () => (page > 1 ? setPage(page - 1) : null);

  return (
    <div className={styles.root}>
      <button className={styles.button} onClick={() => pageMinus()}>
        prev
      </button>
      <ul className={styles.pages}>
        {[...new Array(3)].map((_, index) => (
          <li
            className={index + 1 === page ? `${styles.button} ${styles.currentPage}` : styles.button}
            key={index}
            onClick={() => setPage(index + 1)}
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
