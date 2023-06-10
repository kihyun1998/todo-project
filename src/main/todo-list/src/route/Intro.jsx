import { useEffect, useState } from "react";
import styles from "./css/Intro.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";

import TodoTable from "./css/component/TodoTable";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "./css/component/Loading";
import styled from "styled-components";

const userNameStyle = {
  fontSize: "3rem",
  color: "darkblue",
}


const Intro = () => {
  const [cookies, setCookie] = useCookies(["accessToken", "toDoLists"]);
  const [userName, setUserName] = useState("당신");
  const [logined, setLogined] = useState(false);
  const [setting, setSetting] = useState(false);
  const [mainList, setMainList] = useState(0);
  const [tempMainList, setTempMainList] = useState(0);
  const [loading, setLoading] = useState(false);

  const getMainInfo = async() => {
    if(cookies.accessToken != null) {
      try{
        const res = await axios.get("/api/v1/user/main", 
          {headers:{Authorization: `Bearer ${cookies.accessToken}`}})
        setUserName(res.data.userName)
        setMainList(res.data.mainToDoListId)
        setTempMainList(res.data.mainToDoListId)
        setLogined(true);
      } catch(e) {
        console.log(e)
      }
    }
  }

  const changeMainList = async() => {
    try{
      setLoading(true)
      const res = await axios.put("/api/v1/user/main",
        {mainToDoListId:tempMainList},
        {headers:{Authorization: `Bearer ${cookies.accessToken}`}}
      )
      await setMainList(tempMainList)
      getMainInfo();
      setLoading(false)
      setSetting(false)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getMainInfo()
  }, [])

  return (
    <div className={styles.intro}>
      <h1 style={{marginTop:"100px"}}><span style={userNameStyle}>{userName}</span>의 하루</h1>
      <AnimatePresence>
      {logined?
        <motion.div
          style={{
            backgroundColor: "rgb(245, 245, 245)",
            borderRadius: "30px",
            boxShadow: "7px 7px 10px #737373 inset",
            minHeight: "60vh",
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
              width: "98%",
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
                    translateY: "-60%",
                    translateX: "20%",
                    backgroundColor: "rgba(240, 240, 240, 0.9)",
                    borderRadius: "20px",
                    boxShadow: "0px 0px 7px grey",
                    // display: "flex",
                    padding: "20px",
                  }}
                  initial={{
                    scaleY: 0,
                  }}
                  animate={{
                    scaleY: 1,
                  }}
                >
                  <div
                    className={styles.scroll}
                    style={{
                      display: "flex",
                      margin: "0 auto",
                      flexDirection: "column",
                      alignItems: "baseline",
                      overflowY: "scroll",
                      overflowX: "hidden",
                      width: "80%",
                      height: "80%",
                    }}
                  >
                    {cookies.toDoLists.map((todoList, idx)=> {
                      return(
                        <motion.div 
                          key={idx} 
                          style={{
                            fontSize: "1.2rem",
                            width: "100%",
                            cursor: "pointer",
                            height: "40px",
                            backgroundColor:tempMainList===todoList.listId ?
                              "rgba(0, 0, 0, 0.3)":"rgba(0, 0, 0, 0)",
                          }}


                          onClick={()=>{
                            setTempMainList(todoList.listId)
                          }}
                        >
                          {todoList.listName}
                        </motion.div>
                      );
                    })}
                  </div>
                  {!loading?
                  <motion.div
                    className="material-symbols-outlined"
                    style={{
                      color: "rgb(0, 0, 0)",
                      cursor:"pointer",
                      //flex: "1 1 0",
                      textAlign: "center"
                    }}
                    whileHover={{
                      color:"rgb(50, 150, 50)",
                      scale: 1.3
                    }}
                    onClick={changeMainList}
                  >
                    check
                  </motion.div>:
                  <Loading />
                  }
                  
                </motion.div>
              }
            </div>
          </div>
          <div
            style={{
              textAlign: "left",
              transform:"translateY(-30%)",
            }}
          >
          {mainList!==null?
            <TodoTable 
              todoId={mainList}/>:
            <div
              style={{marginTop: "20%"}}
            >메인 화면에 띄울 Todo List를 선택 해 주세요.↗️</div>
          }
          </div>
        </motion.div>:
        <div>
          <h3>사용자 맞춤형 할 일 관리 서비스입니다.</h3>
        </div>
      }
      </AnimatePresence>
      
    </div>
  );
}

export default Intro;