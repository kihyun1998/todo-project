import { useEffect, useState } from "react";
import { Link,NavLink } from "react-router-dom";

import styles from "./css/Menu.module.css";


const Menu = () => {

  const activeStyle = {
    backgroundColor : "#606060",
    color: "white"
  }


  return (
    <div className={styles.menu}>
      <NavLink style={({isActive}) => (isActive ? activeStyle:{})} to={"/"}><h3>메인</h3></NavLink>
      <NavLink style={({isActive}) => (isActive ? activeStyle:{})} to={"/todo"}><h3>Todo 리스트</h3></NavLink>
      <NavLink style={({isActive}) => (isActive ? activeStyle:{})} to={"/users/login"}><h3>로그인</h3></NavLink>
      <NavLink style={({isActive}) => (isActive ? activeStyle:{})} to={"/users/join"}><h3>회원가입</h3></NavLink>
      <NavLink style={({isActive}) => (isActive ? activeStyle:{})} to={"/mypage"}><h3>내 정보</h3></NavLink>
    </div>
  );
}

export default Menu;