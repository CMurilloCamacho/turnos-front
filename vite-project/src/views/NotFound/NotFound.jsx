import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.errorCode}>404</h1>
        <p className={styles.message}>Esta página no existe</p>
        <Link to="/">Volver al INICIO</Link>
      </div>
    </div>
  );
};

export default NotFound;
