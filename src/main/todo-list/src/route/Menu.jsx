import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import styles from "./css/Menu.module.css";
import axios from "axios";
import styled from "styled-components";

import Button from "./css/component/Button";
import Input from "./css/component/Input"
import TodoList from "./css/component/TodoList";
import todoList from "./css/component/TodoList";


const Expend = styled.span`
  cursor: pointer;
  transform: rotate(${props=>props.clicked?"0":props.degree}deg);
`

const ToDoListInput = styled.input`
  margin-left: 35px;
  width: 180px;
`

const ToDoListAddBtn = styled.button`
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  border: 0px solid grey;
  height: 30px;
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
  
  const [expended, setExpended] = useState(true);
  const [inputExpended, setInputExpended] = useState(false);
  const [toDoListName, setToDoListName] = useState("");
  const [toDoLists, setToDoLists] = useState([]);
  const [_, set_] = useState(0);
  const navigate = useNavigate();

  const tempLogin = () => setCookie("accessToken", "temp");
  const tempLogout = () => {
    removeCookie("accessToken");
    removeCookie("toDoLists");
    navigate("/");
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

  const expendToDoList  = () => {
    setExpended(pre=>!pre)
  } 

  const expendInput = () => {
    setInputExpended(pre=>!pre)
  }

  return (
    <div className={styles.menu}>
      <NavLink style={({isActive}) => (isActive ? activeStyle:{})}  to={"/"}>메인</NavLink>
      {cookies.accessToken==null?
      null:
      <div>
        <div>
          Todo 리스트
          <Expend 
            className={`material-symbols-outlined ${styles.expend}`} 
            onClick={expendToDoList} 
            clicked={expended}
            degree="90">
            expand_more
          </Expend>
          {expended?
          <Expend 
            className={`material-symbols-outlined ${styles.plus}`}
            onClick={expendInput}
            clicked={!inputExpended}
            degree="45">
            add
          </Expend>:null
          }
          
        </div>
        {expended&&toDoLists?
          <div>
            {toDoLists.map((toDoList, idx) => 
              <TodoList 
                key={idx}
                className={styles.todoList} 
                to={`/todo/${toDoList.listId}`}
                text={toDoList.listName}
              />
            )}
            {inputExpended?
              <div>
                <ToDoListInput 
                  onChange={onChangeToDoListName}
                  value={toDoListName}/>
                <ToDoListAddBtn
                  className={`material-symbols-outlined`}
                  onClick={addToDoList}>
                  done
                </ToDoListAddBtn>
              </div>
              
              :null}
          </div>
          :null
        }
      </div>}
      {cookies.accessToken==null?
      null:
      <NavLink style={({isActive}) => (isActive ? activeStyle:{})} to={"/mypage"}>내정보</NavLink>}
      {cookies.accessToken==null?
      null:
      <NavLink to={"/"} onClick={tempLogout}>로그아웃</NavLink>
      }
      {cookies.accessToken==null?
      <NavLink style={({isActive}) => (isActive ? activeStyle:{})} to={"/user/login"}>로그인</NavLink>:
      null}
      {cookies.accessToken==null?
      <NavLink style={({isActive}) => (isActive ? activeStyle:{})} to={"/user/join"}>회원가입</NavLink>:
      null}
      
      {cookies.accessToken==null?
      <Button 
        text={"로그인 상태 만들기 (메뉴상에서만)"}
        onClick={tempLogin}
      />:
      null}
    </div>
  );
}

export default Menu;