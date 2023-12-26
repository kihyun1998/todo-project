import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Input from "./Input";
import Button from "./Button";
import Loading from "./Loading";

const mainStyle = {
  position: "absolute",
  width: "30%",
  height: "50%",
  // backgroundColor: "grey",
  border: "3px solid grey",
  borderRadius: "30px",
  paddingTop: "20px",
  paddingLeft: "50px",
  margin: "0 auto",
  top: "30%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  backgroundColor: "#e5e5e5",
}

const textStyle = {
  marginTop: "15px",
}

const PasswordChange = ({setChangingPW}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken", "toDoLists"]);
  const navigate = useNavigate();

  const [pw, setPw] = useState("");
  const [cPw, setCPw] = useState("");
  const [cPwC, setCPwC] = useState("");
  const [isPwSame, setIsPwSame] = useState(false);
  const [str, setStr] = useState("");
  const [cPwCStr, setCPwCStr] = useState("");
  const [loading, setLoading] = useState(false);

  const changePassword = async() => {
    if(isPwSame) {
      try {
        setLoading(true)
        const res = await axios.put("/api/v1/user/info", 
        {
          changePassword:cPw,
          password:pw,
        }, {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`
          }
        })
        await removeCookie("accessToken")
        await removeCookie("toDoLists")
        alert("비밀번호가 변경되었습니다.")
        window.location.href="/user/login"
        setLoading(false)
      } catch(e) {
        switch(e.response.status){
          case 401:
            alert("비밀번호가 다릅니다.")
            break;
          default:
            alert("오?류")
        }
        setLoading(false)
      }
    }
  }

  const onChangeCPw = (e) => {
    if (e.target.value.length < 8) {
      setStr("비밀번호는 8자리 이상으로 구성해주세요.");
      setCPw(e.target.value);
      setIsPwSame(false);
    } else if (e.target.value.length > 20) {
      setStr("비밀번호는 20자리 이하로 구성해주세요.");
      setIsPwSame(false);
    } else {
      // 영문자 숫자 조합 확인과정 필요
      setStr("");
      setCPw(e.target.value);
    }
  }

  const onChangePw = (e) => {setPw(e.target.value)}
  const onChangeCPwC = (e) => setCPwC(e.target.value)

  useEffect(()=>{
    if (cPwC.length>=8) {
      if (cPwC!==cPw) {
        setCPwCStr("비밀번호가 일치하지 않습니다.");
        setIsPwSame(false);
      } else {
        setCPwCStr("비밀번호가 일치합니다.");
        setIsPwSame(true);
      }
    } else {
      setCPwCStr("");
      setIsPwSame(false);
    }
  }, [cPw, cPwC])

  return (
    <div style={mainStyle}>
      <motion.span
        className="material-symbols-outlined"
        style={{
          position:"absolute",
          right:"10px",
          top: "10px",
        }}
        initial={{color:"rgb(0, 0, 0)"}}
        whileHover={{scale:1.3, color:"rgb(200, 50, 50)"}}
        onClick={()=>setChangingPW(false)}
      >
        close
      </motion.span>

      <div>
      <Input 
        label="기존 비밀번호"
        id="pw"
        value={pw}
        type="password"
        onChange={onChangePw}
      />
      </div>

      <div>
      <Input 
        label="변경할 비밀번호"
        id="cPw"
        value={cPw}
        type="password"
        onChange={onChangeCPw}
      /><br /><div style={textStyle}>{str}</div>
      </div>

      <div>
      <Input 
        label="변경할 비밀번호 확인"
        id="cPwC"
        value={cPwC}
        type="password"
        onChange={onChangeCPwC}
      /><br /><div style={textStyle}>{cPwCStr}</div>
      </div>
      
      <span>
        {loading?
          <Loading />:
          <Button 
            disabled = {!isPwSame}
            onClick={changePassword}
            styles={{width: "50px"}}
            text="변경"
          />
        }
      </span>
      
    </div>
  );
}

export default PasswordChange;