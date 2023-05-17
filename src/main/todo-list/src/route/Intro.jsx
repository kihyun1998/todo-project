import { useEffect, useState } from "react";

import styles from "./css/Intro.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const userNameStyle = {
  fontSize: "3rem",
  color: "darkblue",
}

const Intro = () => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [userName, setUserName] = useState("당신")

  const getUserName = async() => {
    if(cookies.accessToken != null) {
      try{
        const res = await axios.get("/api/v1/user/info", {headers:{Authorization: `Bearer ${cookies.accessToken}`}})
        setUserName(res.data.userName)
      } catch(e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    getUserName()
  }, [])

  return (
    <div className={styles.intro}>
      <h1 style={{marginTop:"100px"}}><span style={userNameStyle}>{userName}</span>의 하루</h1>
      <h3>사용자 맞춤형 할 일 관리 서비스입니다.</h3>
    </div>
  );
}

export default Intro;