const Input = ({ type, label, value, id, name, onChange, onClick, style, DC=false }) => {

  let styleInput = {
    borderTop: "0",
    borderLeft: "0",
    borderRight: "0",
    borderBottom: "2px solid #d6d6d6",
    width: "100%",
    height: "100%",
    fontFamily: "Sunflower, sans-serif",
    fontWeight: "1000",
    color: "#949494",
    fontSize: "100%",
    backgroundColor:"rgba(0, 0, 0, 0)"
    // "backgroundColor": "#fafafa"
  }

  const styleLabel = {
    display:"inline-block",
    width: "200px",
    fontSize: "1.3rem"
  }

  let styleSpan = {
    display:"inline-block",
    height: "50px",
    margin:"10px",
    marginBottom: "30px",
  }

  if (type === "radio") {
    styleInput["width"] = "100px"
    styleLabel["width"] = "fit-content"
  }

  return (
    <span style={Object.assign({}, styleSpan, style)}>
      {label&&<label style={styleLabel} htmlFor={id}>{label}</label>}
      <input
        id={id}
        style={styleInput}
        type={type}
        value={value}
        onChange={onChange}
        onClick={onClick}
        name = {name}
        defaultChecked = {DC}
      ></input>
    </span>

  );
}

export default Input;