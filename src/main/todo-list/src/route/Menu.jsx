import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./css/Menu.module.css";


const Menu = () => {
  return (
    <div className={styles.menu}>
      <Link to={"/"}><h3>메인</h3></Link>
      <Link to={"/intro"}><h3>소개</h3></Link>
      <Link to={"/users/login"}><h3>로그인</h3></Link>
      <Link to={"/register"}><h3>회원가입</h3></Link>
      <Link to={"/account"}><h3>계정</h3></Link>
    </div>
  );
}

export default Menu;