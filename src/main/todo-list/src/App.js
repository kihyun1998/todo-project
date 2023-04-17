import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./route/css/App.module.css";
import Menu from "./route/Menu";
import Intro from "./route/Intro";
import Todo from "./route/Todo";
import Login from "./route/Login";
import Register from "./route/Register";
import Account from "./route/Account"
import Test from "./route/Test"

function App() {

  return (
    <BrowserRouter >
      <div className={styles.app}>
        <Menu />
        <Routes>
          <Route path="/Todo" element={<Todo />}/>
          <Route path="/" element={<Intro />}/>
          <Route path="/users/login" element={<Login />}/>
          <Route path="/users/join" element={<Register />}/>
          <Route path="/account" element={<Account />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;