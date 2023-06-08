import Todo from "./Todo"
import { useState } from "react";

const TodoTable = ({todos}) => {

  const [todolist_title,setTodolist_title] = useState("To-Do-List 1");

  
  return (

    <div>    
      <h1 style={{marginLeft : "40px" , marginTop:"50px"}}>
          {todolist_title}
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
        overflow : a.length > 6 ? "auto" : "none" }}>


      {todos.map((todo, idx)=>
        <Todo
        key={idx}
        todo={todo}
        />
        )}

      </div>

    </div>
  );
}

export default TodoTable;