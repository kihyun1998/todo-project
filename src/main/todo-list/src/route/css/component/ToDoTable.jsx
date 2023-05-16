import Todo from "./Todo"

const TodoTable = ({todos}) => {
  return (
    <div>
      toDoId, todoTitle, estimatedTime, deadline, difficulty, importance, status
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