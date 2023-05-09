import React, { useEffect, useState } from "react";
import Button from "./css/component/Button";
import ProfileInfo from "./css/component/ProfileInfo";
import axios from "axios";
const Mypage = () => {

  
  // const [res,setRes] = useState({}) 

  // useEffect(async()=>{

  //   setRes(await axios.get(`/Mypage?userName=${userName}`))
  //                           // 서버에서 정해주는 값을 넣어줘야함
  // }, [])


  const user = {
  name : '홍길동',
  email : 'abcd@bu.ac.kr'
  }

  return (
    <div>

    <ProfileInfo {...user} /> 
      {/* <ProfileInfo 
         naem = {res.data.userName}
         email = {res.data.userEmail}
      /> */}
      <span style={{marginLeft : "87px"}}>  
        <Button
          text={"비닐번호 변경"}
        />
      </span>

    </div>
  );
}

export default Mypage;