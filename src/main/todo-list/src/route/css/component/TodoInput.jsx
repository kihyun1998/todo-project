import { useEffect, useState } from "react";

const TodoInput = ({iconName, description, Component}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isComponentHovered, setIsComponentHovered] = useState(false);

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

  const componentStyle = {
    backgroundColor: "rgba(230, 230, 230, 1)",
    position: "absolute",
    transition: ".3s all",
    transform: "translate(-35%, -120%)",
    padding: "20px 100px 30px 10px",
    opacity: "1"
  }

  return (
    <div>
      <div 
        style={Object.assign({}, componentStyle, !isClicked&&disabled)}
        onMouseEnter={()=>setIsComponentHovered(true)}
        onMouseLeave={()=>setIsComponentHovered(false)}
        className="todoComponent"
      >
        {Component}
      </div>
      <span className="material-symbols-outlined"
        onMouseEnter={()=>setIsHovered(true)}
        onMouseLeave={()=>setIsHovered(false)}
        onClick={()=>setIsClicked(pre=>!pre)}
        style={style}
      >
        {iconName}

      </span>
      <div style={Object.assign({}, descriptionStyle, !isHovered&&disabled)}>
        {description}
      </div>
      
      
    </div>
    
  );
}

export default TodoInput;