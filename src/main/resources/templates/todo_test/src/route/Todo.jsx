import { useEffect, useState } from "react";
import styles from "./css/Home.module.css";

const Todo = () => {
  const [selectedCategory, setSelectedCategory] = useState("x");
  const [todoInputValue, setTodoInputValue] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState("mid");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const dateStr = currentDate.toLocaleDateString('en-CA');
    setDeadlineDate(dateStr);
  }, [])

  const handlers = {
    onClickCategory: (e) => setSelectedCategory(e.target.value),
    onChangeTodoInput: (e) => setTodoInputValue(e.target.value),
    onChangeDeadlineDate: (e) => setDeadlineDate(e.target.value),
    onClickDifficulty: (e) => setSelectedDifficulty(e.target.value),
    onChangeEstimatedTime: (e) => setEstimatedTime(e.target.value),
    onClickSubmit: (e) => {
      e.preventDefault();
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          todo: todoInputValue,
          category: selectedCategory,
          date: deadlineDate,
          time: estimatedTime,
          difficulty: selectedDifficulty,
        },
      ]);
      setTodoInputValue("");
    },
  };

  return (
    <div className={styles.todo_list}>
      <form>
        <label>
            할 일
        </label>
        <div className={styles.element}>
          <input
            name="todo"
            onChange={handlers.onChangeTodoInput}
            value={todoInputValue}
          />
        </div>

        <label> 카테고리</label>
        <div className={styles.element}>
          <label htmlFor="x">X</label>
          <input
            type="radio"
            id="x"
            name="category"
            value="x"
            onClick={handlers.onClickCategory}
            defaultChecked
          />
          <label htmlFor="study">Study</label>
          <input
            type="radio"
            id="study"
            name="category"
            value="study"
            onClick={handlers.onClickCategory}
          />
          <label htmlFor="work">Work</label>
          <input
            type="radio"
            id="work"
            name="category"
            value="work"
            onClick={handlers.onClickCategory}
          />
        </div>

        <label>
          마감기한
        </label>
        <div className={styles.element}>
          <input
            name="date"
            type="date"
            onChange={handlers.onChangeDeadlineDate}
            value={deadlineDate}
          />
        </div>
      
        <label>
          예상소요시간
        </label>
        <div>
          <input
            name="time"
            type="number"
            onChange={handlers.onChangeEstimatedTime}
            value={estimatedTime}
          />
        </div>

        <label>난이도 : </label>
        <div className={styles.element}>
          <label htmlFor="high">High</label>
          <input
            type="radio"
            id="high"
            name="difficulty"
            value="high"
            onClick={handlers.onClickDifficulty}
          />
          <label htmlFor="mid">Mid</label>
          <input
            type="radio"
            id="mid"
            name="difficulty"
            value="mid"
            onClick={handlers.onClickDifficulty}
            defaultChecked
          />
          <label htmlFor="low">Low</label>
          <input
            type="radio"
            id="low"
            name="difficulty"
            value="low"
            onClick={handlers.onClickDifficulty}
          />
        </div>
        <button
          onClick={handlers.onClickSubmit}
        >
          완료
        </button>
      </form>
      {todos.map((td, idx) => {
        return (
          <div key={idx}>
            <span>{idx + 1}</span>
            <span>{td.todo}</span>
            <span>{td.category}</span>
            <span>{td.date}</span>
            <span>{td.time}</span>
            <span>{td.difficulty}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;