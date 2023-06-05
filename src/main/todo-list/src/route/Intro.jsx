import { useEffect, useState } from "react";
import styles from "./css/Intro.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";

import TodoTable from "./css/component/TodoTable";
import { AnimatePresence, color, motion } from "framer-motion";

const userNameStyle = {
  fontSize: "3rem",
  color: "darkblue",
}

const Intro = () => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [userName, setUserName] = useState("당신");
  const [logined, setLogined] = useState(false);
  const [setting, setSetting] = useState(false);

  const getUserName = async() => {
    if(cookies.accessToken != null) {
      try{
        const res = await axios.get("/api/v1/user/info", {headers:{Authorization: `Bearer ${cookies.accessToken}`}})
        setUserName(res.data.userName)
        setLogined(true);
      } catch(e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    getUserName()
  }, [])

  return (
    <div className={styles.intro}>
      <h1 style={{marginTop:"100px"}}><span style={userNameStyle}>{userName}</span>의 하루</h1>
      <h3>사용자 맞춤형 할 일 관리 서비스입니다.</h3>

      <AnimatePresence>
      {logined?
        <motion.div
          style={{
            backgroundColor: "rgb(245, 245, 245)",
            borderRadius: "30px",
            boxShadow: "7px 7px 10px #737373 inset",
            minHeight: "50vh",
            minWidth: "60vw",
            border: "2px solid rgba(0, 0, 0, 0.2)",
            paddingTop: "10px",
          }}
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            type: "spring", 
            stiffness: 100, 
            damping: 20
          }}
        >
          <div
            style={{
              textAlign: "center",
              width: "95%",
              display: "flex",
              justifyContent: "end"

            }}
          >
            <div>
              <motion.span
                className="material-symbols-outlined"
                style={{
                  cursor: "pointer",
                }}
                whileHover={{
                  scale: 1.3,
                  color: "rgb(10, 10, 10)",
                  rotate: "60deg"
                }}
                onClick={()=>setSetting(pre=>!pre)}
              >
                Settings
              </motion.span>
              
              {setting && 
                <motion.div
                  style={{
                    position: "absolute",
                    height: "200px",
                    width: "300px",
                    translateY: "-130%",
                    backgroundColor: "rgba(10, 10, 10, 0.2)",
                    borderRadius: "20px",
                    boxShadow: "0px 0px 7px grey",
                  }}
                >
                </motion.div>
              }
            </div>
          </div>
          {<TodoTable 
            todos={[]}
          />}
        </motion.div>:
        <div></div>
      }
      </AnimatePresence>
      
    </div>
  );
}

export default Intro;