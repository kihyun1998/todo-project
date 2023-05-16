import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Input from "./Input"
import styled from "styled-components";

const StyledDiv = styled.div`
  ${props=>props.isEditing&&"display: flex;"}
  // margin-top: 5px;
  height: 33px;
  font-size: 1.2rem;
  justify-content: space-between;
`

const TodoList = ({ className, listId, text, isEditing }) => {

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [ETitle, setETitle] = useState(text);

  const linkStyle = {
    display: "inline-block",
    width: "90%",
    height: "100%",
    paddingLeft: "30px",
    overflow: "hidden",
  }

  const deleteStyle = {
    color: "rgb(0, 0, 0)",
    marginRight: "10px",
    marginTop: "3px",
    cursor:"pointer",
  }

  const listNameStyle = {
    display: "inline-block",
    width: "90%",
    paddingLeft: "30px",
    overflow: "hidden",
    borderBottom: "0px solid #d6d6d6",
    cursor:"pointer",
  }

  const editStyle = {
    paddingLeft: "40px",
    width: "150px",
    height: "30px",
    fontSize: "1.1rem",
    margin: "0"
  }

  const checkStyle = {
    color: "rgb(0, 0, 0)",
    marginLeft: "10px",
    marginTop: "3px",
    cursor:"pointer",
  }

  const closeStyle = {
    color: "rgb(0, 0, 0)",
    marginRight: "10px",
    marginTop: "3px",
    cursor:"pointer",
  }

  const deleteTodoList = async(e) => {
    console.log(`Try to delete listId:${e.target.parentNode.dataset.listid}`)
  }

  const changeTodoListTitle = async(e) => {
    console.log(`Try to change title ${text} to ${ETitle} listId:${e.target.parentNode.dataset.listid}`)
  }

  const onClickTitle = () => {
    setIsEditingTitle(pre=>!pre)
    setETitle(text)
  }
  const onChangeTitle = (e) => setETitle(e.target.value)

  useEffect(()=>{
    if(!isEditing)
      setIsEditingTitle(false)
  }, [isEditing])

  return (
    <StyledDiv data-listid={listId} isEditing={isEditing}>
      {!isEditing?
        <NavLink
          style={linkStyle}
          className={className}
          to={`/todo/${listId}`}
        >• {text}</NavLink>:
        !isEditingTitle?
          <motion.span 
            style={listNameStyle}
            whileHover={{
              scale:1.1
            }}
            onClick={onClickTitle}
          >
            • {text}
          </motion.span>:
          <Input 
            value={ETitle}
            onChange={onChangeTitle}
            style={editStyle}
          />
      }
      {isEditing && !isEditingTitle && (
        <motion.span 
          className="material-symbols-outlined" 
          style={deleteStyle} 
          onClick={deleteTodoList}
          whileHover={{
            color:"rgb(250, 0, 0)", 
            scale: 1.3
          }}
        >
          delete
        </motion.span>
      )}

      {isEditingTitle && isEditing && (
        <motion.span 
          className="material-symbols-outlined" 
          style={checkStyle} 
          // onClick={deleteTodoList}
          whileHover={{
            color:"rgb(0, 150, 0)", 
            scale: 1.3
          }}
          onClick={changeTodoListTitle}
        >
          check
        </motion.span>
      )}

      {isEditingTitle && isEditing && (
        <motion.span 
          className="material-symbols-outlined" 
          style={closeStyle} 
          // onClick={deleteTodoList}
          whileHover={{
            color:"rgb(200, 50, 50)", 
            scale: 1.3
          }}
          onClick={onClickTitle}
        >
          Close
        </motion.span>
      )}
    </StyledDiv>
  );
}

export default TodoList;