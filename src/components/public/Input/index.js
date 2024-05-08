import styles from './styles.module.scss';

export const Input = ({ placeholder, onChange, id, name, type, value, label }) => {
  return (
    <div className={styles['input__wrapper']}>
      {!!label && <label>{label}</label>}
      <input
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
        name={name}
        type={type}
        value={value}
      />
    </div>
  );
};
