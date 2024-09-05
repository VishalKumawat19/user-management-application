import React from 'react';
import styles from './CustomAlert.module.css'; // Import the module CSS file

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.alertBox}>
        <p>{message}</p>
        <button onClick={onClose} className={styles.closeButton}>Ok</button>
      </div>
    </div>
  );
};

export default CustomAlert;
