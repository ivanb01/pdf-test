import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import styles from './styles.module.scss';

export const Button = ({ children, type, onClick, style, disabled, className }) => {
  const isPrimary = type === 'primary';
  const isPrimaryLight = type === 'primaryLight';
  const isSecondary = type === 'secondary';

  return (
    <button
      className={clsx(
        styles['button'],
        (isPrimary || isPrimaryLight) && styles['button--primary'],
        isPrimaryLight && styles['button--primary-light'],
        isSecondary && styles['button--secondary'],
        disabled && styles['button--disabled'],
        className,
      )}
      onClick={onClick}
      style={style ? style : undefined}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
};
