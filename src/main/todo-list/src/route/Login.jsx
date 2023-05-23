import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./css/component/Input";
import Button from "./css/component/Button";
import { useCookies } from 'react-cookie';
import { motion } from "framer-motion";
import Loading from "./css/component/Loading"

import styles from "./css/Login.module.css"

const loginStyle = {
  margin: "0 auto",
  width: "40%",
  marginTop: "10%",
  height: "70%",
  borderRadius: "30px",
  boxShadow: "5px 5px 3px #737373 inset",
  // textAlign: "center",
  // color: "white",
}

const bgcoverStyle = {
  margin: "0 auto",
  width: "85%",
  height: "100%",
  borderRadius: "30px",
  paddingTop: "10%",
  paddingLeft: "15%",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
}

const Login = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const handlers = {
    onChangeId:(e) => setId(e.target.value),
    onChangePw:(e) => setPw(e.target.value),

    async onClickLogin(e) {
      e.preventDefault();
      let res;
      try{
        setLoading(true);
        res = await axios.post("/api/v1/user/login", {loginId:id, loginPw:pw});
        console.log(res)
        setCookie("accessToken", res.data);
        navigate("/");
        setLoading(false);
        
      } catch(err) {
        setLoading(false);
        switch(err.response.status) {
          case 404:
            alert("아이디가 존재하지 않습니다.")
            break;
          case 401:
            alert("비밀번호가 옳바르지 않습니다.");
            break;
          default:
            alert("오류!");
        }
      }
    }
  }

  return (
    <motion.div 
      className={styles.bg}
      style={loginStyle}
      // initial={{backgroundPositionX: "0",}}
      // aniamte={{backgroundPositionX: "100",}}
      // transition={{repeat:Infinity, repeatType:"reverse"}}
    >
      <div style={bgcoverStyle}>
      <form action="">
        <Input
          id="id"
          value={id}
          onChange={handlers.onChangeId}
          label={"아이디"}
          style={{marginBottom:"100px"}}
        />
          <br />
          <Input
            id="pw"
            type="password"
            value={pw}
            onChange={handlers.onChangePw}
            label={"비밀번호"}
            style={{marginBottom:"100px"}}
          /><br />
          <span
            style={{
              width: "30%",
              marginLeft:"270px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
            
          >
            {loading?
              <Loading />:
              <Button
                text={"로그인"}
                onClick={handlers.onClickLogin}
              />
            }
          </span>
          
          
        </form>
      </div>
    </motion.div>
  );
}

export default Login;