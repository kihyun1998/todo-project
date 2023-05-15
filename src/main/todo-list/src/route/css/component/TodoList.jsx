import { NavLink } from "react-router-dom";
import styled from "styled-components";

const todoList = ({ className, to, text }) => {
  const divStyle = {
    display: "block",
    paddingLeft: "35px",
    fontSize: "25px",
    marginTop: "5px",
  }
  const linkStyle = {

  }
  return (
    <div style={divStyle}>
      <NavLink
      style={linkStyle}
      className={className}
      to={to}
      >
        • {text}
      </NavLink>
      <button>
      삭제
      </button>
    </div>
    
  );
}

export default todoList;