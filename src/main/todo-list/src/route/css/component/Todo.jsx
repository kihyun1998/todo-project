import { useEffect, useState } from "react";
import styles from "../TodoLast.module.css";
import axios from "axios";
import { motion } from "framer-motion";

import Deadline from "./Deadline";
import Difficulty from "./Difficulty";
import EstimatedTime from "./EstimatedTime";
import Importance from "./Importance";
import TodoInput from "./TodoInput";
import { useCookies } from "react-cookie";


const Todo = ({listId, todo, getTodos}) => {

  const [cookies, setCookie] = useCookies(["accessToken"])
  const [toDo, setTodo] = useState(todo);

  const [deadline, setDeadline] = useState(new Date(Date.parse(toDo.deadline)))
  const [difficulty, setDifficulty] = useState(toDo.difficulty)
  const [estimatedTime, setEstimatedTime] = useState(toDo.estimatedTime)
  const [importance, setImportance] = useState(toDo.importance)
  const [todoId, setTodoId] = useState(todo.toDoId)
  const [todoTitle, setTodoTitle] = useState(todo.todoTitle)
  const [status, setStatus] = useState(toDo.status);

  const [isEditing, setIsEditing] = useState(false)
  const [backClicked, setBackClicked] = useState(false);


  // 별 / 얼굴 임티 스타일
  const starStyle = {
    fontSize: "1.3rem",
    wordSpacing:"-20px",
    // color : "aqua"
    color: "#edf01a"
  }
  const faceStyle = {
    fontSize: "1.0rem", 
  }

  // 할 일 상세 정보 show/hide
  const [isOpen, setMenu] = useState(false);
  const titleClick = () =>{
    setMenu(isOpen => !isOpen)
  }


  // 할 일 상태에 따른 스타일
  const titleStyle = {
    flex : "1",
    // cursor: "pointer"
  }
  const titleStyleCheck = {
    flex : "1",
    color : "rgba(169, 169, 169, 0.521)",
    textDecorationLine : "line-through",
    // cursor: "pointer"
  }

  const editTodo = async() => {
    try {
      const res = await axios.put(`/api/v1/list/${listId}/${todoId}`, 
      {
        todoTitle,
        estimatedTime,
        deadline:deadline.toISOString().slice(0, 16),
        difficulty,
        importance
      }, {
        headers: {Authorization: `Bearer ${cookies.accessToken}`}
      })
      getTodos()
    } catch(e) {
      console.log(e.response.data)
    }
  }

  const deleteTodo = async() => {
    if(window.confirm("할 일을 삭제하시겠습니까?")){
      try {
        const res = await axios.delete(`/api/v1/list/${listId}/${todoId}`, {
          headers: {Authorization: `Bearer ${cookies.accessToken}`}
        })
        getTodos()
      } catch(e) {
        if(e.status===404)
          getTodos()
      }
    }
    
  }

  const changeStatus = async() => {
    try{
      const res = await axios.put(`/api/v1/list/${listId}/${todoId}/status`,
      {
        status
      }, 
      {
        headers:{Authorization: `Bearer ${cookies.accessToken}`}
      })
      setStatus(pre=>pre===1?0:1)
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

          <div className={styles.star}>
            <label 
                  htmlFor="emptyStar"
                  className="material-symbols-outlined"
                  style={starStyle}>
                  { importance < 33 ? "Star ": importance < 66 ? "Star Star" : "Star Star Star" }
            </label>
          </div> 

          <div>
            {isEditing?
              <input type="text" value={todoTitle} onChange={(e)=>{
                setTodoTitle(e.target.value)
              }}/>:
              <div
                style={{
                  display: "inline-block",
                  width: "60%"
                }}  
              >
                <label className={styles['todoapp__item-checkbox']} >
                  <span 
                    className="material-symbols-outlined"
                    onClick={changeStatus}
                  >
                    {status===0?"check_box_outline_blank":"check_box"} 

                  </span>
                </label>
                <span style={status===0 ? titleStyle : titleStyleCheck} onClick={titleClick}>
                  {todoTitle}
                </span>
              </div>
            } 

              <div className={styles['todoapp__item-deadline']}>
                {isEditing?
                  <div
                    style={{
                      display: "flex",
                      width: "50%",
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
                  :
                  `${deadline.getMonth()+1}월 ${deadline.getDate()}일 ${deadline.getHours()}시 ${deadline.getMinutes()}분`
                }
                
            
              {/* 수정 버튼 */}
              <div>
                <span className={styles['todoapp__item-edit-btn']}>
                    <motion.span 
                      className="material-symbols-outlined"
                      onClick={()=>{
                        if(isEditing){
                          if(window.confirm("수정된 사항을 저장하시겠습니까?")){
                            editTodo()
                          } else {
                            setDeadline(new Date(Date.parse(toDo.deadline)))
                            setDifficulty(toDo.difficulty)
                            setEstimatedTime(toDo.estimatedTime)
                            setImportance(toDo.importance)
                            setTodoTitle(toDo.todoTitle)
                          }
                        }
                        setIsEditing(pre=>!pre)
                      }}
                      whileHover={{
                        scale: 1.3
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
                    onClick={deleteTodo}
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
    </div>
  );
}

export default Todo;