import React, { useEffect, useState } from "react";
import Button from "./css/component/Button";
import ProfileInfo from "./css/component/ProfileInfo";
import axios from "axios";
import { useCookies } from "react-cookie";

const Mypage = () => {
  const [userInfo,setUserInfo] = useState({});
  const [cookies, setCookie] = useCookies(["accessToken"]);

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
      <ProfileInfo 
         name = {userInfo.userName}
         email = {userInfo.userEmail}
      />
      <span style={{marginLeft : "87px"}}>  
        <Button
          text={"비밀번호 변경"}
        />
      </span>

    </div>
  );
}

export default Mypage;