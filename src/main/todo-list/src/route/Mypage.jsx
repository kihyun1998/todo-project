import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import ProfileInfo from "./css/component/ProfileInfo";

import Button from "./css/component/Button";
import PasswordChange from "./css/component/PasswordChange";

const Mypage = () => {
  const [userInfo,setUserInfo] = useState({});
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [changingPW, setChangingPW] = useState(false)

  const getUserInfo = async() => {
    let res;
    try {
      res = await axios.get(`/api/v1/user/info`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`
        }
      });
      setUserInfo(res.data)
    } catch(err) {
      console.log(err.response.data)
    } 
  }

  useEffect(()=>{
    
    getUserInfo();
    
  }, [])


  return (
    <div>
      <div>
        <ProfileInfo 
          name = {userInfo.userName}
          email = {userInfo.userEmail}
        />
        <span style={{marginLeft : "87px"}}>  
          <Button
            text={"비밀번호 변경"}
            onClick={()=>setChangingPW(true)}
          />
        </span>
      </div>
      {changingPW&& (
        <div style={{display:"flex", justifyContent:"center"}}>
          <PasswordChange
            setChangingPW={setChangingPW}
          />
        </div>
      )}
    </div>
  );
}

export default Mypage;