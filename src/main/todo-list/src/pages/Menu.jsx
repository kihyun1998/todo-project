import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import styled from "styled-components";
import axios from "axios";

import styles from "../styles/Menu.module.css";

import TodoList from "../components/TodoList";
import Spinner from "../components/Spinner";

const ToDoListInput = styled.input`
  margin-left: 35px;
  width: 180px;
`

const activeStyle = {
  backgroundColor : "#606060",
  color: "white"
}

const menuStyle = {
  // display: "flex",
  // flexDirection: "column",
  // flex: "1 1 0",
  // paddingTop: "100px",
  // height: "70vh",
  // position: "sticky",
  // backgroundColor: "#bfbdbd",
  // borderRadius: "100px 0px 0px 0px",
  // boxShadow: "7px 7px 10px #737373 inset",
  // zIndex: 0,
}


const Menu = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken", "toDoLists"]);
  
  const [expended, setExpended] = useState(false);
  const [inputExpended, setInputExpended] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [toDoListName, setToDoListName] = useState("");
  const [toDoLists, setToDoLists] = useState([]);
  const [menuExpended, setMenuExpended] = useState(false);
  const [addListLoading, setAddListLoading] = useState(false);

  const controls = useAnimationControls();

  const linkVariants = {
    hidden:{opacity:0},
    show:{opacity: menuExpended ? 1:0, transition:{delay: menuExpended ? 0.2:0}},
  }

  const logout = () => {
    removeCookie("accessToken");
    removeCookie("toDoLists");
    alert("로그아웃 되었습니다.")
    window.location.href="/"
  }

  const onChangeToDoListName = (e) => setToDoListName(e.target.value);

  const addToDoList = async() => {
    let res;
    try {
      setAddListLoading(true);
      res = await axios.post("/api/v1/list/create", 
      {
        listName: toDoListName,
        sortBy: "ASC_Date"
      }, 
      {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`
        }
      })
      getToDoListData();
      expendInput();
      setAddListLoading(false);
    } catch(err) {
      switch(err.response.status){
        case 409:
          alert("이미 존재하는 리스트 이름입니다.")
          break;
        default:
          alert("오?류");
          break;
      }
      setAddListLoading(false);
    }
  }

  const getToDoListData = async() => {
    if (cookies.accessToken != null) {
      let res;
      try{
        res = await axios.get("/api/v1/list/lists", {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`
          }
        });
        
        setCookie("toDoLists", res.data? res.data:"");
      } catch(err) {
        console.log(err.response?.data);
      }
      
    }
  };

  useEffect(()=>{
    if(cookies.toDoLists != null)
      setToDoLists([...cookies.toDoLists]);
  }, [cookies.toDoLists])

  useEffect(()=>{
    getToDoListData();
  }, [cookies.accessToken])

  const expendToDoList  = () => setExpended(pre=>!pre)
  const expendInput = () => setInputExpended(pre=>!pre)
  const edit = () => setIsEditing(pre=>!pre)
  const expandMenu = () => setMenuExpended(true)
  const closeMenu = () => {setMenuExpended(isEditing)}

  const expendTodoLists = async() => {
    if(expended){
      await controls.set({display:"block"})
      controls.start({
        height: "auto"
      })
    } else {
      await controls.start({
        height: "0px",
      })
      controls.set({display:"none"})
    }
  }

  useEffect(()=>{
    expendTodoLists();
  }, [controls, expended])

  return (
    <motion.div 
      className={styles.menu} 
      // style={menuStyle}
      animate={{
        width: menuExpended ? "280px": "100px", 
        flexGrow: menuExpended ? 2:1,
      }}
      transition = {{delay: menuExpended ? 0:0.2}}
      // whileHover={{flexGrow:2}}
      onMouseEnter={expandMenu}
      onMouseLeave={closeMenu}
    >
      <motion.div
        variants={linkVariants}
        initial="hidden"
        animate="show"
      >
        <NavLink className={styles.menuLink} style={({isActive}) => (isActive ? activeStyle:{})}  to={"/"}>메인</NavLink>
      </motion.div>
      {cookies.accessToken!=null && (
        <motion.div 
          className={styles.todoList}
          variants={linkVariants}
          initial="hidden"
          animate="show"
        >
          <div style={{marginBottom:"15px"}}>
            Todo 리스트
            <motion.span 
              className={`material-symbols-outlined ${styles.expend}`} 
              onClick={expendToDoList} 
              animate={{
                rotate: expended ? 90:0,
                transformOrigin: "15px 15px"
              }}
              whileHover={{
                cursor:"pointer",
                scale:1.2,
              }}  
            >
              expand_more
            </motion.span>
            <AnimatePresence>
            {expended && (
              <motion.span 
                className={`material-symbols-outlined ${styles.plus}`}
                onClick={expendInput}
                animate={{
                  rotate: inputExpended ? 45:0,
                  transformOrigin: "10px 10px",
                  opacity:1,
                }}
                whileHover={{
                  cursor:"pointer",
                  scale:1.2,
                }}
                initial={{opacity:0}}
                exit={{opacity:0}}
              >
                add
              </motion.span>
            )}
            </AnimatePresence>
            <AnimatePresence>
            {expended && (
              <motion.span 
                className={`material-symbols-outlined ${styles.edit}`}
                onClick={edit}
                animate={{
                  rotate: isEditing ? -45:0,
                  transformOrigin: "10px 10px",
                  opacity:1
                }}
                whileHover={{
                  cursor:"pointer",
                  scale:1.2,
                }}
                initial={{opacity:0}}
                exit={{opacity:0}}
              >
                edit
              </motion.span>
            )}
            </AnimatePresence>
          </div>

          {toDoLists&&(
            <motion.div
              style={{overflow:"hidden"}}
              initial={{display:"none", height:"0px"}}
              animate={controls}
            >
              {toDoLists.map((toDoList, idx) => 
                <TodoList 
                  key={idx}
                  className={styles.todoList} 
                  listId={toDoList.listId}
                  text={toDoList.listName}
                  isEditing={isEditing}
                  getToDoListData = {getToDoListData}
                />
              )}
              {inputExpended&&(
                <div style={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)", 
                    paddingBottom: "5px",
                  }}>
                  <ToDoListInput 
                    onChange={onChangeToDoListName}
                    value={toDoListName}
                  />
                  <span style={{textAlign:"center"}}>
                    {addListLoading?
                      <Spinner styles={{fontSize:"24px", x:"80%"}}/>:
                      <motion.span
                        className={`material-symbols-outlined`}
                        onClick={addToDoList}
                        initial={{
                          color:"rgb(0, 0, 0)",
                          pointer: "cursor",
                          paddingLeft: "15px",
                        }}
                        whileHover={{color:"rgb(100, 250, 100)", scale: 1.3}}
                      >
                        done
                      </motion.span>
                    }
                  </span>
                  
                </div>)
                }
            </motion.div>
            )
          }
        </motion.div>
      )}
      {cookies.accessToken!=null && (
        <motion.div
          variants={linkVariants}
          initial="hidden"
          animate="show"
        >
          <NavLink className={styles.menuLink} style={({isActive}) => (isActive ? activeStyle:{})} to={"/mypage"}>내정보</NavLink>
        </motion.div>)}

      {cookies.accessToken!=null && (
        <motion.div
          variants={linkVariants}
          initial="hidden"
          animate="show"
        >
          <NavLink 
            className={styles.menuLink} 
            onClick={()=>{
              logout()
            }}
          >로그아웃</NavLink>
        </motion.div>)}
        
      {cookies.accessToken==null && (
        <motion.div
          variants={linkVariants}
          initial="hidden"
          animate="show"
        >
          <NavLink className={styles.menuLink} style={({isActive}) => (isActive ? activeStyle:{})} to={"/user/login"}>로그인</NavLink>
        </motion.div>)}

      {cookies.accessToken==null && (
        <motion.div
          variants={linkVariants}
          initial="hidden"
          animate="show"
        >
          <NavLink className={styles.menuLink} style={({isActive}) => (isActive ? activeStyle:{})} to={"/user/join"}>회원가입</NavLink>
        </motion.div>)}
      
      {/* {cookies.accessToken==null && (
        <Button 
          text={"로그인 상태 만들기 (메뉴상에서만)"}
          onClick={tempLogin}
        />
      )} */}
    </motion.div>
  );
}

export default Menu;