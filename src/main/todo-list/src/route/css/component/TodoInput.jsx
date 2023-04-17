import { useState } from "react";

const TodoInput = ({iconName, description}) => {
  const [isHover, setIsHover] = useState(false);

  const style = {
    textAlign: "center"
  }

  const descriptionStyle = {
    width: "fit-content",
    fontFamily: 'Sunflower, sans',
    position: "absolute",
    bottom:"5%",
    left:"50%",
    transform: "translate(-50%, -50%)",
    fontSize:"1.5rem",
    fontWeight: 1000,
    transition: ".3s all",
    opacity: "1"
  }

  const disabled = {
    opacity: "0"
  }

  return (
    <span className="material-symbols-outlined"
      onMouseEnter={()=>setIsHover(true)}
      onMouseLeave={()=>setIsHover(false)}
      style={style}
    
    >
      {iconName}

      <div style={Object.assign({}, descriptionStyle, !isHover&&disabled)}>
      {description}
      </div>
    </span>
  );
}

export default TodoInput;