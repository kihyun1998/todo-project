import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCookies } from "react-cookie";
import axios from "axios";

import ProfileInfo from "../components/ProfileInfo";
import Button from "../components/Button";
import PasswordChange from "../components/PasswordChange";

const coverStyle = {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  top:0,
  left:0,
  zIndex:1
}

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
      <AnimatePresence>
      {changingPW&&(<motion.div
        style={coverStyle}
        initial={{backgroundColor:"rgba(0, 0, 0, 0)"}}
        animate={{backgroundColor:"rgba(0, 0, 0, 0.3)"}}
        exit={{backgroundColor:"rgba(0, 0, 0, 0)"}}
      />)}
      </AnimatePresence>
      <div>
        <ProfileInfo 
          name = {userInfo.userName}
          email = {userInfo.userEmail}
        />
          
        <Button
          styles={{marginLeft:"70px"}}
          text={"비밀번호 변경"}
          onClick={()=>setChangingPW(true)}
        />
      </div>
      <AnimatePresence>
      {changingPW&& (
        <motion.div 
          style={{display:"flex", justifyContent:"center", position: "absolute", width:"100%", height: "100%", top:"0%", left: "0%", zIndex:2}}
          initial={{scale:0}}
          animate={{scale:1}}
          exit={{scale:0}}
        >
          <PasswordChange
            setChangingPW={setChangingPW}
          />
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

export default Mypage;