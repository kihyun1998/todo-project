import { useState } from "react";
import styles from "../TodoLast.module.css";
const Todo = ({todo}) => {
  console.log(todo)

  const todo_date = new Date (Date.parse(todo.deadline))

  // 별 / 얼굴 임티 스타일
  const starStyle = {
    fontSize: "1.3rem",
    wordSpacing:"-20px",
    color : "aqua"
  }
  const faceStyle = {
    fontSize: "1.0rem", 
  }

  // 할 일 상세 정보 show/hide
  const [isOpen, setMenu] = useState(false);
  const titleClick = () =>{
    setMenu(isOpen => !isOpen)
  }

  // 할 일 상태 
  const [isOK, setNO] = useState(true);
  const check = () =>{
    setNO(isOK => !isOK)
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


  return (

    <div className={styles.todoapp__item}>
      
  
        {/* 할 일 제목 & 별 */}
        <div className={styles['todoapp__item-ctx']}>

              <div className={styles.star}>
                <label 
                      htmlFor="emptyStar"
                      className="material-symbols-outlined"
                      style={starStyle}>
                     { todo.importance < 33 ? "Star ": todo.importance < 66 ? "Star Star" : "Star Star Star" }
                </label>
              </div> 

          <div>
              <label className={styles['todoapp__item-checkbox']} onClick={check} >
                {{} = isOK ? <span class="material-symbols-outlined">
                              check_box_outline_blank </span>  : 
                              <span class="material-symbols-outlined">
                              check_box </span>
                }
              </label>
              
              <span style={isOK ? titleStyle : titleStyleCheck}>
              {/* onClick={titleClick} */}
                {todo.todoTitle}_
              </span>

              <span className={styles['todoapp__item-deadline']}>
                {(todo_date.getMonth()+1)}월_
                {todo_date.getDate()}일_
                {todo_date.getHours()}시:
                {todo_date.getMinutes()}분
              
              {/* 수정 버튼 */}
                <span className={styles['todoapp__item-edit-btn']}>
                  <span class="material-symbols-outlined">
                      edit
                  </span>
              </span>

              {/* 삭제 버튼 */}
                <span className={styles['todoapp__item-delete-btn']}>
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                </span>
              
              </span>

            </div>
            
        </div>

    </div>
    
  );

}

export default Todo;