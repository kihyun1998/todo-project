import { motion } from "framer-motion";

const Button = ({ text, onClick, styles, disabled }) => {
  const style = {
    "minWidth":"80px",
    "minHeight": "30px",
    "cursor": disabled?"default":"pointer",

    "color": "#606060",
    "border": "3px solid #d4d4d4",
    "padding": "10px",
    "fontWeight": "600",

    "backgroundColor": disabled?"rgba(0, 0, 0, 0.1)":"rgba(0, 0, 0, 0)",
    "borderRadius": "5px",
  }

  return (
    <motion.button
      style={Object.assign({}, styles, style)}
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