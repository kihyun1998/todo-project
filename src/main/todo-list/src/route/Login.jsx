import axios from "axios";
import { useState } from "react";
import Input from "./css/component/Input";
import Button from "./css/component/Button";
import { useCookies } from 'react-cookie';

const Login = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handlers = {
    onChangeId:(e) => setId(e.target.value),
    onChangePw:(e) => setPw(e.target.value),

    async onClickLogin(e) {
      e.preventDefault();
      let res;
      try{
        res = await axios.post("/api/v1/user/login", {loginId:id, loginPw:pw});
        console.log(res)
        setCookie("accessToken", res.data);
        // window.location.href = "/todo";
        
      } catch(err) {
        console.log(err.response.data)
      }
      
      // if (res.data !== null) {
      //   window.location.href = "/todo"
      // }
    }
  }

  return (
    <div>
      <form action="">
        <Input
          id="id"
          value={id}
          onChange={handlers.onChangeId}
          label={"아이디"}
        />
        <br />
        <Input
          id="pw"
          type="password"
          value={pw}
          onChange={handlers.onChangePw}
          label={"비밀번호"}
        />
        <Button
          text={"로그인"}
          onClick={handlers.onClickLogin}
        />
      </form>

    </div>
  );
}

export default Login;