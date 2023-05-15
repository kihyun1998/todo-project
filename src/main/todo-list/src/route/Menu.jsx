import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useCookies } from 'react-cookie';
import styles from "./css/Menu.module.css";
import axios from "axios";
import styled from "styled-components";
import { motion, useAnimationControls } from "framer-motion";

import Button from "./css/component/Button";
import TodoList from "./css/component/TodoList";

const ToDoListInput = styled.input`
  margin-left: 35px;
  width: 180px;
`

const ToDoListAddBtn = styled.button`
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  border: 0px solid grey;
  height: 30px;
  margin-left: 15px;
  // font-family: 'Sunflower', sans-serif;
  // font-weight: 1000
  color: green;
`

const activeStyle = {
  backgroundColor : "#606060",
  color: "white"
}

const Menu = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken", "toDoLists"]);
  
  const [expended, setExpended] = useState(false);
  const [inputExpended, setInputExpended] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [toDoListName, setToDoListName] = useState("");
  const [toDoLists, setToDoLists] = useState([]);

  const controls = useAnimationControls();

  const tempLogin = () => setCookie("accessToken", "temp");
  const tempLogout = () => {
    removeCookie("accessToken");
    removeCookie("toDoLists");
    window.location.href = "/";
  }
  const onChangeToDoListName = (e) => setToDoListName(e.target.value);

  const addToDoList = async() => {
    let res;
    try {
      res = await axios.post("/api/v1/list/create", 
      {
        listName: toDoListName,
        sortBy: "ASC_Date"
      }, 
      {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`
        }
      })
      getToDoListData();
      expendInput();
      
    } catch(err) {
      console.log(err.response.data)
    }
  }

  const getToDoListData = async() => {
    if (cookies.accessToken != null) {
      let res;
      try{
        res = await axios.get("/api/v1/list/lists", {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`
          }
        });
        await setCookie("toDoLists", res.data);
      } catch(err) {
        console.log(err.response.data);
      }
      
    }
  };

  useEffect(()=>{
    if(cookies.toDoLists != null)
      setToDoLists([...cookies.toDoLists]);
  }, [cookies.toDoLists])

  useEffect(()=>{
    getToDoListData();
  }, [cookies.accessToken])

  const expendToDoList  = () => setExpended(pre=>!pre)
  const expendInput = () => setInputExpended(pre=>!pre)
  const edit = () => setIsEditing(pre=>!pre)

  const expendTodoLists = async() => {
    if(expended){
      await controls.set({display:"block"})
      controls.start({
        height: "auto",
      })
    } else {
      await controls.start({
        height: "0px",
        padding: "0px",
      })
      controls.set({display:"none"})
    }
  }

  useEffect(()=>{
    expendTodoLists();
  }, [controls, expended])

  return (
    <div className={styles.menu}>
      <NavLink style={({isActive}) => (isActive ? activeStyle:{})}  to={"/"}>메인</NavLink>
      {cookies.accessToken!=null && (
        <div>
          <div style={{marginBottom:"15px"}}>
            Todo 리스트
            <motion.span 
              className={`material-symbols-outlined ${styles.expend}`} 
              onClick={expendToDoList} 
              animate={{
                rotate: expended ? 90:0,
                transformOrigin: "15px 15px"
              }}
              whileHover={{
                cursor:"pointer",
                scale:1.2,
              }}  
            >
              expand_more
            </motion.span>
            {expended && (
              <motion.span 
                className={`material-symbols-outlined ${styles.plus}`}
                onClick={expendInput}
                animate={{
                  rotate: inputExpended ? 45:0,
                  transformOrigin: "10px 10px"
                }}
                whileHover={{
                  cursor:"pointer",
                  scale:1.2,
                }}
              >
                add
              </motion.span>
            )}
            {expended && (
              <motion.span 
                className={`material-symbols-outlined ${styles.edit}`}
                onClick={edit}
                animate={{
                  rotate: isEditing ? -45:0,
                  transformOrigin: "10px 10px"
                }}
                whileHover={{
                  cursor:"pointer",
                  scale:1.2,
                }}
              >
                edit
              </motion.span>
            )}
          </div>
          {toDoLists&&(
            <motion.div
              style={{backgroundColor:isEditing?"#a3a3a3":"#f2f2f0", overflow:"hidden"}}
              animate={controls}
            >
              {toDoLists.map((toDoList, idx) => 
                <TodoList 
                  key={idx}
                  className={styles.todoList} 
                  listId={toDoList.listId}
                  text={toDoList.listName}
                  isEditing={isEditing}
                />
              )}
              {inputExpended&&(
                <div>
                  <ToDoListInput 
                    onChange={onChangeToDoListName}
                    value={toDoListName}/>
                  <ToDoListAddBtn
                    className={`material-symbols-outlined`}
                    onClick={addToDoList}>
                    done
                  </ToDoListAddBtn>
                </div>)
                }
            </motion.div>
            )
          }
        </div>
      )}
      {cookies.accessToken!=null && (
        <NavLink style={({isActive}) => (isActive ? activeStyle:{})} to={"/mypage"}>내정보</NavLink>)}
      {cookies.accessToken!=null && (
        <NavLink onClick={tempLogout}>로그아웃</NavLink>)}
      {cookies.accessToken==null && (
        <NavLink style={({isActive}) => (isActive ? activeStyle:{})} to={"/user/login"}>로그인</NavLink>)}
      {cookies.accessToken==null && (
        <NavLink style={({isActive}) => (isActive ? activeStyle:{})} to={"/user/join"}>회원가입</NavLink>)}
      
      {cookies.accessToken==null && (
        <Button 
          text={"로그인 상태 만들기 (메뉴상에서만)"}
          onClick={tempLogin}
        />
      )}
    </div>
  );
}

export default Menu;