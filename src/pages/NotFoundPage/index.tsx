import React from 'react';
import styles from './NotFoundPage.module.scss';
import { NotFoundBlock } from '../../components';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.root}>
      <NotFoundBlock />
    </div>
  );
};

export default NotFoundPage;
