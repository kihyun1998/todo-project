import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./route/css/App.module.css";
import Menu from "./route/Menu";
import Intro from "./route/Intro";
import TodoBase from "./route/TodoBase";
import Login from "./route/Login";
import Register from "./route/Register";
import Mypage from "./route/Mypage"


function App() {

  return (
    <BrowserRouter >
      <div className={styles.app}>
        <Menu />
        <div className={styles.main}>
          <Routes>
              <Route path="/todo/:todoId" element={<TodoBase />}/>
              <Route path="/" element={<Intro />}/>
              <Route path="/user/login" element={<Login />}/>
              <Route path="/user/join" element={<Register />}/>
              <Route path="/mypage" element={<Mypage />} />
          </Routes>
        </div>
        <div style={{flex: "1 1 0"}}></div>
      </div>
    </BrowserRouter>
  );
}

export default App;