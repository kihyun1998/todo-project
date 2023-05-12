const ToDoTable = ({todos}) => {

  return (
    <div>
      {todos.map((todo, idx)=>{
        return(
          <div key={idx}>
            <span>{todo.todoTitle}</span>
            <span>{todo.difficulty}</span>
            <span>{todo.importance}</span>
            <span>{todo.status}</span>
            <span>{todo.deadline}</span>
          </div>
        )
      })}
    </div>
  );
}

export default ToDoTable;