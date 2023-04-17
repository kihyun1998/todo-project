import { useEffect, useState } from "react";
import styles from "./css/Todo.module.css";
import Input from "./css/component/Input";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [deadline, setDeadlineDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [difficulty, setDifficulty] = useState("mid");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const dateStr = currentDate.toLocaleDateString('en-CA');
    setDeadlineDate(dateStr);
  }, [])

  const handlers = {
    onChangeTodo: (e) => setTodo(e.target.value),
    onChangeDeadlineDate: (e) => setDeadlineDate(e.target.value),
    onClickDifficulty: (e) => setDifficulty(e.target.value),
    onChangeEstimatedTime: (e) => setEstimatedTime(e.target.value),
    onClickSubmit: (e) => {
      e.preventDefault();
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          todo: todo,
          date: deadline,
          time: estimatedTime,
          difficulty: difficulty,
        },
      ]);
      setTodo("");
    },
  };

  return (
    <div className={styles.todo_list}>
      <form>
          <Input
            type = "text"
            label = "할 일"
            value = {todo}
            id = "todo"
            onChange = {handlers.onChangeTodo}
          /> <br />
          
          <Input
            type = "date"
            label = "마감기한"
            value = {deadline}
            id = "deadline"
            onChange = {handlers.onChangeTodo}
          /> <br />
          
          <Input
            type = "number"
            label = "예상소요시간"
            value = {estimatedTime}
            id = "estimatedTime"
            onChange = {handlers.onChangeEstimatedTime}
          /> <br />

          <h3>난이도</h3>
          <Input
            type = "radio"
            label = "high"
            name = "difficulty"
            id = "high"
            onChange = {handlers.onClickDifficulty}
          />

          <Input
            type = "radio"
            label = "mid"
            name = "difficulty"
            id = "mid"
            onChange = {handlers.onClickDifficulty}
            DC = {true}

          />

          <Input
            type = "radio"
            label = "low"
            name = "difficulty"
            id = "low"
            onChange = {handlers.onClickDifficulty}
          /> <br />


        <button
          onClick={handlers.onClickSubmit}
        >
          완료
        </button>
      </form>
      {todos.map((td, idx) => {
        return (
          <div key={idx}>
            <span>{idx + 1}</span>||
            <span>{td.todo}</span>||
            <span>{td.date}</span>||
            <span>{td.time}</span>||
            <span>{td.difficulty}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;