import { useCookies } from "react-cookie";
import Todo from "./Todo"
import axios from "axios";
import { useEffect, useState } from "react";

const TodoTable = ({todoId}) => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [todos, setTodos] = useState([]);

  const getTodos = async() => {
    let res;
    try{
        res = await axios.get(`/api/v1/list/${todoId}/todos`, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`
            }
        });
        setTodos([...res.data])
    } catch(err) {
        console.log(err.response)
    }
    
    // setTodos(res.data);
}
  useEffect(()=>{
    getTodos()
  }, [todoId])

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