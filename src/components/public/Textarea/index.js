import styles from './styles.module.scss';

export const Textarea = ({ placeholder, onChange, id, name, value, label }) => {
  return (
    <div className={styles['textarea__wrapper']}>
      {!!label &&  <label>{label}</label>}
      <textarea className={styles.textarea}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
        name={name}
        value={value} />
    </div>
  );
};
