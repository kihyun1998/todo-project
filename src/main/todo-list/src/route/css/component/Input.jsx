const Input = ({ type, label, value, id, onChange, onClick }) => {
  const styleInput = {
    "height": "30px",
    "width": "300px",
    "borderTop": "0",
    "borderLeft": "0",
    "borderRight": "0",
    "borderBottom": "2px solid #d6d6d6",
    // "backgroundColor": "#fafafa"
  }

  const styleLabel = {
    "display":"inline-block",
    "width": "200px",
    "fontSize": "1.3rem"
  }

  const styleSpan = {
    "display":"inline-block",
    "margin":"10px",
    "marginBottom": "30px"
  }

  return (
    <span style={styleSpan}>
      {label?<label id={id} style={styleLabel}>{label}</label>:null}
      <input
        id={id}
        style={styleInput}
        type={type}
        value={value}
        onChange={onChange}
        onClick={onClick}
      ></input>
    </span>

  );
}

export default Input;