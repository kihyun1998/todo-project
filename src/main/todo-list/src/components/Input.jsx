import styles from "../styles/Input.module.css"

const Input = ({ type, label, value, id, name, onChange, onClick, style, placeholder, DC=false, min, max}) => {

  return (
    <div className={styles.input} style={style}>
      {label&&<label htmlFor={id}>{label}</label>}
      <input
        id={id}
        // style={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onClick={onClick}
        name = {name}
        defaultChecked = {DC}
        placeholder = {placeholder}
        min={min}
        max={max}
      />
    </div>

  );
}

export default Input;