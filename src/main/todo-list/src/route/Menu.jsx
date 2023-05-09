import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import styles from "./css/Menu.module.css";

import Button from "./css/component/Button";
import Input from "./css/component/Input"
import axios from "axios";
import styled from "styled-components";

const Expend = styled.span`
  cursor: pointer;
  transform: rotate(${props=>props.clicked?"0":props.degree}deg);
`

const ToDoListInput = styled.input`
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

const Menu = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken", "toDoLists"]);
  
  const [expended, setExpended] = useState(true);
  const [inputExpended, setInputExpended] = useState(false);
  const [toDoListName, setToDoListName] = useState("");
  const [toDoLists, setToDoLists] = useState([]);

  const tempLogin = () => setCookie("accessToken", "temp");
  const tempLogout = () => removeCookie("accessToken", "temp");
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
      console.log(res.data)
    } catch(err) {
      console.log(err.response.data)
    }
  }

  const getToDoListData = () => {
    if (cookies.toDoLists != null) {
        setToDoLists(cookies.toDoLists)
    }
  };

  useState(()=>{
    getToDoListData();
  }, [])

  useState(()=>{console.log(toDoLists)}, [toDoLists])

  const expendToDoList  = () => {
    setExpended(pre=>!pre)
  } 

  const expendInput = () => {
    setInputExpended(pre=>!pre)
  }

  return (
    <div className={styles.menu}>
      <Link to={"/"}>메인</Link>
      {cookies.accessToken==null?
      null:
      <div>
        <div>
          <a>Todo 리스트</a>
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
            {toDoLists.map((toDoList, idx) => {
              return (
                <div key={idx}>
                  <Link  className={styles.todoList} to={`/todos/${toDoList.toDoListId}`}>
                    {toDoList.toDoListName}
                  </Link>
                </div>
              )
            })}
            {inputExpended?
              <div>
                <ToDoListInput 
                  className={styles.todoList}/>
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
      <Link to={"/mypage"}>내정보</Link>}
      {cookies.accessToken==null?
      null:
      <div>
        <Link to={"/"} onClick={tempLogout}>로그아웃</Link>
      </div>
      }
      {cookies.accessToken==null?
      <Link to={"/users/login"}>로그인</Link>:
      null}
      {cookies.accessToken==null?
      <Link to={"/users/join"}>회원가입</Link>:
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