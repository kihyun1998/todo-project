import { useCookies } from "react-cookie";
import Todo from "./Todo"
import axios from "axios";
import { useEffect, useState } from "react";

const TodoTable = ({todoId}) => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [todos, setTodos] = useState([]);
  const [weight, setWeight] = useState(0);
  const [emergencyW, setEmergencyW] = useState(1);
  const [importanceW, setImportanceW] = useState(1);

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
    let res;
    try{
        res = await axios.get(`/api/v1/list/${todoId}/todos`, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`
            }
        });
        setTodos([...res.data.toDoDtoList])
        setWeight(res.data.weight)
    } catch(err) {
        console.log(err.response)
    }
    
    // setTodos(res.data);
}
  useEffect(()=>{
    getTodos()
  }, [todoId])

  useEffect(()=>{
    
    if(todos.length!==0){
      setEmergencyW(1-weight);
      setImportanceW(1+weight);
      todos.forEach((todo, idx) => {
        todos[idx].score = calc(todo)
      });
      todos.sort((todo1, todo2)=>{
        if(todo1.score>todo2.score) return 1
        else if(todo1.score<todo2.score) return -1
        else return 0
      })
    }
  }, [weight])

  return (
    <div>
      {todos.map((todo, idx)=>
        <Todo
          key={idx}
          todo={todo}
        />
      )}
    </div>
  );
}

export default TodoTable;