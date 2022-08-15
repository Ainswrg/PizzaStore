import styles from './NotFoundPage.module.scss';
import { NotFoundBlock } from '../../components';

const NotFoundPage = () => {
  return (
    <div className={styles.root}>
      <NotFoundBlock />
    </div>
  );
};

export default NotFoundPage;
