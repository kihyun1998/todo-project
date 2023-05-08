import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import styles from "./css/Menu.module.css";

import Button from "./css/component/Button";
import axios from "axios";


const Menu = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  
  const [toDoListName, setToDoListName] = useState("");

  const tempLogin = () => {
    setCookie("accessToken", "temp");
  }

  const tempLogout = () => {
    removeCookie("accessToken", "temp");
  }

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

  const onChangeToDoListName = (e) => {
    setToDoListName(e.target.value);
  }

  return (
    <div className={styles.menu}>
      <Link to={"/"}><h3>메인</h3></Link>
      {cookies.accessToken==null?
      null:
      <Link to={"/todo"}><h3>Todo 리스트</h3></Link>}
      {cookies.accessToken==null?
      null:
      <Link to={"/mypage"}><h3>내정보</h3></Link>}
      {cookies.accessToken==null?
      null:
      <Link to={"/"}><h3>로그아웃(미구현)</h3></Link>}

      {cookies.accessToken==null?
      <Link to={"/users/login"}><h3>로그인</h3></Link>:
      null}
      {cookies.accessToken==null?
      <Link to={"/users/join"}><h3>회원가입</h3></Link>:
      null}
      
      {cookies.accessToken==null?
      <Button 
        text={"로그인 상태 만들기 (메뉴상에서만)"}
        onClick={tempLogin}
      />:
      <Button 
        text={"로그아웃 (임시)"}
        onClick={tempLogout}
      />}
      <br /><br /><br /> 
      <input onChange={onChangeToDoListName} value={toDoListName}></input>
      <button onClick={addToDoList}>ToDo리스트 추가</button>
    </div>
  );
}

export default Menu;