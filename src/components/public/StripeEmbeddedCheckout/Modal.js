import ReactDOM from 'react-dom';
import styles from './modal.module.scss';

const Modal = ({ onClose, children, title }) => {
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-wrapper']}>
        <div className={styles['modal']}>
          <div className={styles['modal-header']}>
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div>
          {title && <h1>{title}</h1>}
          <div className={styles['modal-body']}>{children}</div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
};

export default Modal;
