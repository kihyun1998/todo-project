const Button = ({ text, onClick }) => {
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
    <button
      style={style}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;