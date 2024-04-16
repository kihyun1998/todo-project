import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "../styles/TodoTable.module.css"

import Todo from "./Todo"

const TodoTable = ({listId, reload, setIsLoading}) => {
  const [todos, setTodos] = useState([]);
  const [listName, setListName] = useState("");

  const [toggleDone, setToggleDone] = useState(false);

  const calcLeftDate = () => {
    todos.map((todo, idx)=> {
      let leftDate = new Date(todo.deadline) - new Date();
      todos[idx].leftDate = leftDate<0?-1:leftDate
    })
  }

  const deleteTodo = (todoId) => {
    setIsLoading(true)
    setTodos(pre=>[...pre.filter(todo=>todo.toDoId !== todoId)])
    setIsLoading(false)
  }

  const getTodos = async() => {
    let res;
    setIsLoading(true)
    try{
        res = await axios.get(`/api/v1/list/${listId}/todos`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        });
        setListName(res.data.list.listName)
        setTodos([...res.data.todos])
    } catch(err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  useEffect(()=>{
    calcLeftDate()
  }, [todos])

  useEffect(()=>{
    setIsLoading(false)
    getTodos()
  }, [listId, reload])


  const Todos = () => {
    return (
      todos.map((todo, idx)=> {
        return Boolean(todo.status)===toggleDone&&
          <Todo
            key={idx}
            listId={listId}
            todo={todo}
            getTodos={getTodos}
            deleteTodo={deleteTodo}
          />
      })
    )
  }

  return (
    
    <div className={styles.todoTable}>
      <div className={styles.funcBar}>
        <div className={styles.a}>
            <Link to={`/todo/${listId}`}>
              {listName}
            </Link>
        </div>
        <div className={styles.func}>
          <motion.div
            className={styles["func-btn"]}
            whileHover={{
              scale:1.1,
            }}
            onClick={()=>{setToggleDone(pre=>!pre)}}
          >
            {toggleDone?"완료":"미완료"}
          </motion.div>
        </div>
      </div>
      
      <div className={styles.hr} />

      <div 
        className={styles.table}
        style = {{ 
          overflowY : todos.length > 4 ? "scroll" : "none" 
        }}
      >
        <div>
          <Todos />
        </ div>
      </div>
    </div>
  );
}

export default TodoTable;