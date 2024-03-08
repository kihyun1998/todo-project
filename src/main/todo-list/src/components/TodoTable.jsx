import { useCookies } from "react-cookie";
import { motion, useForceUpdate } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "../styles/TodoTable.module.css"

import Todo from "./Todo"
import Spinner from "./Spinner";
import Loading from "./Loading";

const TodoTable = ({listId, reload}) => {
  const [cookies] = useCookies(["accessToken", "toDoLists"]);
  const [todos, setTodos] = useState([]);
  const [listName, setListName] = useState("");

  const [loading, setLoading] = useState(false);
  const [toggleDone, setToggleDone] = useState(false);

  const calcLeftDate = () => {
    todos.map((todo, idx)=> {
      let leftDate = new Date(todo.deadline) - new Date();
      todos[idx].leftDate = leftDate<0?-1:leftDate
    })
  }

  const deleteTodo = (todoId) => {
    setLoading(true)
    setTodos(pre=>[...pre.filter(todo=>todo.toDoId !== todoId)])
    setTodos(pre=>[...pre])
    setLoading(false)
  }

  const getTodos = async() => {
    let res;
    setLoading(true)
    try{
        res = await axios.get(`/api/v1/list/${listId}/todos`, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`
            }
        });
        setTodos([...res.data])
    } catch(err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(()=>{
    calcLeftDate()
  }, [todos])

  useEffect(()=>{
    setLoading(false)
    getTodos()
  }, [listId, reload])

  useEffect(()=>{
    if (cookies.toDoLists!==undefined){
      cookies.toDoLists.forEach((todo, idx)=>{
        if(todo.listId === listId){
          setListName(todo.listName)
        }
      })
    }
  }, [cookies.todoLists, listId])

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
      <Loading 
        isLoading={loading}
      />
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