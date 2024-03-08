import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import axios from "axios";

import styles from "../styles/TodoList.module.css";

import Deadline from "./Deadline";
import Difficulty from "./Difficulty";
import EstimatedTime from "./EstimatedTime";
import Importance from "./Importance";
import TodoInput from "./TodoInput";
import Button from "./Button";
import Input from "./Input";

const Todo = ({listId, todo, getTodos, deleteTodo}) => {

  const [cookies, setCookie] = useCookies(["accessToken"])

  const [deadline, setDeadline] = useState(new Date(Date.parse(todo.deadline)))
  const [difficulty, setDifficulty] = useState(todo.difficulty)
  const [estimatedTime, setEstimatedTime] = useState(todo.estimatedTime)
  const [importance, setImportance] = useState(todo.importance)
  const [todoId, setTodoId] = useState(todo.toDoId)
  const [todoTitle, setTodoTitle] = useState(todo.todoTitle)
  const [status, setStatus] = useState(todo.status);
  const [createdDate, setCreatedDate] = useState(new Date(Date.parse(todo.createdDate)))
  const [leftDay, setLeftDay] = useState(parseInt(todo.leftDate/1000/60/60/24))
  const [leftHours, setLeftHours] = useState(parseInt(todo.leftDate/1000/60/60%24))
  const [leftMinutes, setLeftMinutes] = useState(parseInt(todo.leftDate/1000/60%60))

  const [isEditing, setIsEditing] = useState(false)
  const [backClicked, setBackClicked] = useState(false);
  const [dateHovered, setDateHovered] = useState(false);
  const navigator = useNavigate();

  // 별 / 얼굴 임티 스타일
  const faceStyle = {
    fontSize: "1.0rem", 
  }

  // 할 일 상세 정보 show/hide
  const [isOpen, setMenu] = useState(false);
  const titleClick = () =>{
    setMenu(isOpen => !isOpen)
  }

  const editTodo = async() => {
    try {
      let timezoneOffset = deadline.getTimezoneOffset() * 60000; // 분을 밀리초로 변환
      let convertedDate = new Date(deadline.getTime() - timezoneOffset);

      let formattedDate = convertedDate.toISOString().slice(0, 16);
      const res = await axios.put(`/api/v1/list/${listId}/${todoId}`, 
      {
        todoTitle,
        estimatedTime,
        deadline:formattedDate,
        difficulty,
        importance
      }, {
        headers: {Authorization: `Bearer ${cookies.accessToken}`}
      })

      getTodos()
      navigator(".")
      setIsEditing(pre=>!pre)
    } catch(err) {
      console.log(err.response.data)
    }
  }

  const _deleteTodo = async() => {
    if(window.confirm("할 일을 삭제하시겠습니까?")){
      const res = await axios.delete(`/api/v1/list/${listId}/${todoId}`, {
        headers: {Authorization: `Bearer ${cookies.accessToken}`}
      })
      if(res.status === 200)
        deleteTodo(todoId)
        // getTodos()
    }
  }

  const changeStatus = async() => {
    try{
      const res = await axios.put(`/api/v1/list/${listId}/${todoId}/status`,
      {
        status:status===0?1:0
      }, 
      {
        headers:{Authorization: `Bearer ${cookies.accessToken}`}
      })
      // if(status===0) {
      //   await chengeWeight(toDo);
      // }
      // setStatus(pre=>pre===1?0:1)
      getTodos()
      setStatus(pre=>(pre+1)%2)
    } catch(err) {
      console.log(err)
    }
  }

  const getParam = (todoType, param) => {
    switch (todoType) {
        case "importance":
            setImportance(param);
            break;
        case "estimatedTime":
            setEstimatedTime(param);
            break;
        case "difficulty":
            setDifficulty(param);
            break;
        case "deadline":
            setDeadline(param);
            break;
        default:
            console.log("getParamErr");
    }
  }


  return (

    <div 
      className={styles.todoapp__item}
      onClick={()=>{
        setBackClicked(pre=>!pre)
      }}
    >

        {/* 할 일 제목 & 별 */}
        
        <div className={styles['todoapp__item-ctx']}>

          <div className={styles.star__con}>
            <div 
                  htmlFor="emptyStar"
                  className={`${styles.star} material-symbols-outlined`}
                  >
                  { importance < 20 ? "Star ": importance < 40 ? "Star Star" : "Star Star Star" }
            </div>
            {dateHovered&&
              <motion.div
                style={{
                  fontSize: "1rem",
                  opacity: dateHovered?1:0,
                  backgroundColor:"",
              }}
              >
                {`${deadline.getFullYear()}년 ${deadline.getMonth()+1}월 ${deadline.getDate()}일 ${deadline.getHours()}시 ${deadline.getMinutes()}분`}
              </motion.div>
            }
          </div> 

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: "60%"
              }}  
            >
              <span className={styles['todoapp__item-checkbox']} >
                <div 
                  className="material-symbols-outlined"
                  onClick={changeStatus}
                >
                  {status===0?"check_box_outline_blank":"check_box"} 

                </div>

                
              </span>
              <span className={status===0 ? styles.todoName : styles.todoName_checked} onClick={titleClick}>
                {todoTitle}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}  
            >
              <div
                className={styles['todoapp__item-deadline']}
                style={{
                  marginRight: "20px"
                }}
              >
                {/* {`${todo.leftDate>0?leftDay>0?leftDay+"일 전":leftHours>0?leftHours+"시간 전":leftMinutes>0?leftMinutes+"분 전":"시간초과":""}`} */}
              </div>
            
              {/* 수정 버튼 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around"
                }}
              >
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <motion.span 
                  className="material-symbols-outlined"
                  onMouseEnter={()=>setDateHovered(true)}
                  onMouseLeave={()=>setDateHovered(false)}
                  whileHover={{
                    scale:1.3,
                    color: "rgb(0, 0, 0)"
                  }}
                  // style={{color: "rgb(100, 100, 100)"}}
                >
                  {deadline>createdDate?"Event":""}
                </motion.span>
                </span>
                <span className={styles['todoapp__item-edit-btn']}>
                    <motion.span 
                      className="material-symbols-outlined"
                      onClick={()=>setIsEditing(pre=>!pre)}
                      whileHover={{
                        scale: 1.3,
                      }}
                      animate={{
                        rotate:isEditing?-45:0
                      }}
                    >
                        edit
                    </motion.span>
                </span>

                {/* 삭제 버튼 */}
                <span className={styles['todoapp__item-delete-btn']}>
                  <motion.span 
                    className="material-symbols-outlined"
                    onClick={_deleteTodo}
                    whileHover={{
                      scale: 1.3,
                      color: "rgb(230, 0, 0)"
                    }}
                  >
                      delete
                  </motion.span>
                </span>
              </div>
            </div>
          </div>
        </div>

      {isEditing&&
      <div>
        <div
          className={styles.edit__cover}
        >
          <motion.div
            className={styles.edit__box}       
          >
            <Input 
              type="text" 
              value={todoTitle} 
              onChange={(e)=>{
                setTodoTitle(e.target.value)
              }}
              style={{
                marginBottom:0,
                width: "80%",
              }}
            />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "70%",
              fontSize: "1.3rem",
            }}
            className={styles.icon}
            
          >
          <TodoInput
            iconName="hotel_class"
            description="중요도"
            Component={<Importance
                returnParam={getParam}
                defaultValue={importance}
            />}
            backClicked = {backClicked}
          />
          <TodoInput 
              iconName="event"
              description="기한"
              Component = {<Deadline
                  returnParam={getParam}
                  defaultValue={deadline}
              />}
              backClicked = {backClicked}
              setBackClicked={setBackClicked}
          />
          <TodoInput 
              iconName="timer"
              description="예상 소요 시간"
              Component={<EstimatedTime 
                  returnParam={getParam}
                  defaultValue={estimatedTime}
              />}
              backClicked = {backClicked}
              setBackClicked={setBackClicked}
          />
          <TodoInput 
              iconName="Mood"
              description="난이도"
              Component={<Difficulty 
                  returnParam={getParam}
                  defaultValue={difficulty}
              />}
              backClicked = {backClicked}
              setBackClicked={setBackClicked}
          />
          </div>
          <div>
            <Button 
              text={"저장"}
              onClick={editTodo}
              styles={{
                marginRight:"50px"
              }}
            />
            <Button 
              text={"취소"}
              onClick={()=>{
                setDeadline(new Date(Date.parse(todo.deadline)))
                setDifficulty(todo.difficulty)
                setEstimatedTime(todo.estimatedTime)
                setImportance(todo.importance)
                setTodoTitle(todo.todoTitle)
                setIsEditing(pre=>!pre)
              }}
            />
          </div>
          </motion.div>

        </div>
        </div>
      }
    </div>
    
  );
}

export default Todo;