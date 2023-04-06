import axios from "axios";
import { useState } from "react";
import Input from "./css/component/Input";
import Button from "./css/component/Button";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handlers = {
    onChangeId:(e) => setId(e.target.value),
    onChangePw:(e) => setPw(e.target.value),

    async onClickLogin(e) {
      e.preventDefault();
      const res = await axios.post("/api/v1/users/login", {loginId:id, loginPw:pw});
      console.log(res)
      if (res.data !== null) {
        window.location.href = "/todo"
      }
    }
  }

  return (
    <div>
      <form action="">
        {/* <label htmlFor="id">아이디</label>
        <input type="text" id="id" value={id} onChange={handlers.onChangeId}/> <br /> */}
        <Input
          id="id"
          value={id}
          onChange={handlers.onChangeId}
          label={"아이디"}
        />
        <br />
        {/* <label htmlFor="pw">비밀번호</label>
        <input type="password" id="pw" value={pw} onChange={handlers.onChangePw}/> <br /> */}
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