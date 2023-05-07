import { useEffect, useState } from "react";

const TodoInput = ({iconName, description, Component}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isComponentHovered, setIsComponentHovered] = useState(false);

  const rootStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  }

  const descriptionStyle = {
    // width: "fit-content",
    fontFamily: 'Sunflower, sans',
    position: "absolute",
    // bottom:"5%",
    // left:"50%",
    transform: "translate(0, -200%)",
    fontSize:"1.5rem",
    fontWeight: 1000,
    transition: ".3s all",
    opacity: "1"
  }

  const disabled = {
    opacity: "0",
    display: "none"
  }

  const componentStyle = {
    backgroundColor: "rgba(230, 230, 230, 1)",
    borderRadius: "20px",
    position: "absolute",
    transition: ".3s all",
    height: "150px",
    width: "250px",
    transform: "translate(0, -110%)",
    padding: "5px",
    overflow: "hidden",
    opacity: "1"
  }

  // document.body.addEventListener("click", (e)=> {
  //   console.log(isComponentHovered, isClicked)
  //   if (!isComponentHovered && isClicked && !isHovered) {
  //     setIsClicked(false);
  //   }
  // })

  return (
    <div style={rootStyle}>
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