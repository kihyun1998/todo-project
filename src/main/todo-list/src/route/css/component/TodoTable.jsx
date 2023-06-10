import { useCookies } from "react-cookie";
import Todo from "./Todo"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../TodoTable.module.css"

const TodoTable = ({todoId, reload}) => {
  const [cookies, setCookie] = useCookies(["accessToken", "toDoLists"]);
  const [todos, setTodos] = useState([]);
  const [weight, setWeight] = useState(0);
  const [emergencyW, setEmergencyW] = useState(1);
  const [importanceW, setImportanceW] = useState(1);
  const [listName, setListName] = useState("");

  const [loading, setLoading] = useState(false);

  const calc = (todo) => {
    const date = new Date(todo.deadline) - new Date();
    let emer1 = todo.estimatedTime/(date/1000/60)
    switch(todo.difficulty){
      case 1:
        emer1+=0.05;
        break;
      case 2:
        emer1+=0.1
        break;
      default:
        break;
    }
    
    const score = todo.importance*importanceW + parseInt(emer1*100)*emergencyW
    return score
  }

  const getTodos = async() => {
    setLoading(false)
    let res;
    try{
        res = await axios.get(`/api/v1/list/${todoId}/todos`, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`
            }
        });
        setTodos([...res.data.toDoDtoList])
        setWeight(res.data.weight)
        console.log(todos)
    } catch(err) {
        console.log(err.response)
    }
    
    // setTodos(res.data);
}
  useEffect(()=>{
    getTodos()
  }, [reload])

  useEffect(()=>{
    if (cookies.toDoLists!==undefined){
      cookies.toDoLists.forEach((todo, idx)=>{
        if(todo.listId === todoId){
          setListName(todo.listName)
        }
      })
    }
  }, [cookies.todoLists, todoId])

  useEffect(()=>{
    
    if(todos.length!==0&&!loading){
      setEmergencyW(1-weight);
      setImportanceW(1+weight);
      todos.forEach((todo, idx) => {
        todos[idx].score = calc(todo)
      });
      todos.sort((todo1, todo2)=>{
        if(todo1.score>todo2.score) return -1
        else if(todo1.score<todo2.score) return 1
        else return 0
      })
      setTodos(pre=>[...pre])
      setLoading(true)
    }
  }, [weight, loading])

  return (
    
    <div>    
      <h1 className={styles.a} style={{marginLeft : "40px" , marginTop:"50px"}}>
          <Link to={`/todo/${todoId}`}>
          
          {listName}</Link>
      </h1>

      <div
          style={{
            width: "93%",
            marginLeft : "18px",
            borderBottom: "4px solid #aaa",
            lineHeight: "0.5em",}}
      />

      <div style = {{
        maxHeight : "500px",
        marginTop : "15px",
        overflow : todos.length > 6 ? "auto" : "none" }}></div>
      {loading&&todos.map((todo, idx)=>
        <Todo
          key={idx}
          listId={todoId}
          todo={todo}
          getTodos={getTodos}
        />
      )}
    </div>
  );
}

export default TodoTable;