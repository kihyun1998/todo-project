import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./css/Register.module.css";

import Input from "./css/component/Input"
import Button from "./css/component/Button"
import Loading from "./css/component/Loading";

const dupButtonStyle = {
  position: "absolute",
  translateY: "-150%",
  translateX: "450%",
}

const Register = () => {
  const [id, setId] = useState("");
  const [idChecked, setIdChecked] = useState(false);
  const [name, setName] = useState("");
  const [nameChecked, setNameChecked] = useState(false);
  const [pw, setPw] = useState("");
  const [pwC, setPwC] = useState("");
  const [email, setEmail] = useState("");

  const [pwStr, setStr] = useState("");
  const [pwCStr, setPwCStr] = useState("");
  const [isPwSame, setIsPwSame] = useState(false);

  const [loading, setLoading] = useState(false);

  const handlers = {
    onChangeId:(e) => {
      setId(e.target.value)
      setIdChecked(false)
    },
    onChangeName:(e) => {
      setName(e.target.value)
      setNameChecked(false)
    },
    onChangePwC:(e) => setPwC(e.target.value),
    onChangeEmail:(e) => setEmail(e.target.value),

    onChangePw(e) {
      if (e.target.value.length < 8) {
        setStr("비밀번호는 8자리 이상으로 구성해주세요.");
        setPw(e.target.value);
        setIsPwSame(false);
      } else if (e.target.value.length > 20) {
        setStr("비밀번호는 20자리 이하로 구성해주세요.");
        setIsPwSame(false);
      } else {
        // 영문자 숫자 조합 확인과정 필요
        setStr("");
        setPw(e.target.value);
      }
    },

    async checkIdDup(e) {
      e.preventDefault();
      try{
        const res = await axios.post("/api/v1/user/join/id", {loginId:id})
        if(res.data){
          alert("아이디가 이미 존재합니다.")
        } else {
          setIdChecked(true);
        }
      } catch (err) {
        console.log(err.response.data)
      }
    },

    async checkNameDup(e) {
      e.preventDefault();
      try{
        const res = await axios.post("/api/v1/user/join/username", {userName:name})
        if(res.data){
          alert("해당 닉네임이 이미 존재합니다.")
        } else {
          setNameChecked(true);
        }
      } catch (err) {
        console.log(err.response.data)
      }
    },

    async submit (e) {
      e.preventDefault();
      setLoading(true)
      if(!isPwSame){
        alert("비밀번호가 바르지 않습니다.")
        setLoading(false)
      } else if(!idChecked){
        alert("아이디 중복확인을 해주세요.")
        setLoading(false)
      } else if(!nameChecked){
        alert("닉네임 중복확인을 해주세요.")
        setLoading(false)
      } else {
        try{
          const res = await axios.post("/api/v1/user/join", {
            loginId: id,
            loginPw: pw,
            loginPwCheck: pwC,
            userName: name,
            userEmail: email
          });

          window.location.href = "/user/login";
          setLoading(false)
        } catch (err) {
          switch (err.response.status){
            case 409:
              alert("아이디가 이미 존재합니다.");
              break;
            default:
              alert("오?류");
          }
          setLoading(false)
        }
      }
    }
  }

  useEffect(()=>{
    if (pwC.length>=8) {
      if (pwC!==pw) {
        setPwCStr("비밀번호가 일치하지 않습니다.");
        setIsPwSame(false);
      } else {
        setPwCStr("비밀번호가 일치합니다.");
        setIsPwSame(true);
      }
    } else {
      setPwCStr("");
      setIsPwSame(false);
    }
  }, [pw, pwC])

  return (
    <div className={styles.register}>
      <form action="">
        <Input
          id="id"
          label="아이디"
          onChange={handlers.onChangeId}
          value={id}
        />
        {!idChecked&&
        <Button
          text={"중복확인"}
          onClick={handlers.checkIdDup}
          styles={dupButtonStyle}
        />}
        <br />

        <Input
          id="name"
          label="닉네임"
          onChange={handlers.onChangeName}
          value={name}
        />
        {!nameChecked&&
        <Button
          text={"중복확인"}
          onClick={handlers.checkNameDup}
          styles={dupButtonStyle}
        />}
        <br />

        <Input
          id="pw"
          type="password"
          label="비밀번호"
          onChange={handlers.onChangePw}
          value={pw}
        />
        {pwStr}
        <br />

        <Input
          id="pwC"
          type="password"
          label="비밀번호 확인"
          onChange={handlers.onChangePwC}
          value={pwC}
        />
        {pwCStr}
        <br />

        <Input
          id="email"
          label="이메일"
          onChange={handlers.onChangeEmail}
          value={email}
        />
        <br />
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            width: "50%"
          }}
        >
          {loading?
            <Loading />:
            <Button
              text={"가입"}
              onClick={handlers.submit}
            />
          }
        </span>
        
      </form>
    </div>
  );
}

export default Register;