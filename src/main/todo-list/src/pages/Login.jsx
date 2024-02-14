import axios from "axios"
import { useCookies } from 'react-cookie'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import styles from "../styles/Login.module.css"

import Input from "../components/Input"
import Button from "../components/Button"
import Spinner from "../components/Spinner"

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
        await setCookie("accessToken", res.data);
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
      className={styles.login}
    >
      <div>
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
          className={styles["login-button"]}
          >
            {loading?
              <Spinner />:
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