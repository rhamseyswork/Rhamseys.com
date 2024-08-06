import React from 'react';
import styles from './DealBanner.module.css'; // Import your CSS file

const DealBanner = () => {
  return (
    <div className={styles.DealBanner}>
      <p className={styles.Slide}>Free shipping On Order Over $100</p>
    </div>
  );
};

export default DealBanner;
