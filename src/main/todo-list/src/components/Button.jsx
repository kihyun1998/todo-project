import { motion } from "framer-motion";
import styles_ from "../styles/Button.module.css"

const Button = ({ text, onClick, styles, disabled }) => {

  return (
    <motion.button
    className={styles_.btn}
      style={styles}
      onClick={onClick}
      whileHover={{
        border: disabled?"3px solid #d4d4d4":"3px solid #bf979c",
        scale: disabled?1:1.1,
      }}
      disabled={disabled}
    >
      {text}
    </motion.button>
  );
}

export default Button;