import { motion } from "framer-motion";

const Button = ({ text, onClick, styles, disabled }) => {
  const style = {
    "minWidth":"80px",
    "minHeight": "30px",

    "color": "#606060",
    "border": "3px solid #d4d4d4",
    "padding": "10px",
    "fontWeight": "600",

    "backgroundColor": "rgba(0, 0, 0, 0)",
    "borderRadius": "5px",
  }

  return (
    <motion.button
      style={Object.assign({}, styles, style)}
      onClick={onClick}
      whileHover={{
        border: "3px solid #bf979c",
        scale: 1.1,
      }}
      disabled={disabled}
    >
      {text}
    </motion.button>
  );
}

export default Button;