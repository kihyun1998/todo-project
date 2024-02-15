import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/styles.css"
import styles from "./styles/App.module.css";
import Menu from "./pages/Menu";
import Intro from "./pages/Intro";
import TodoBase from "./pages/TodoBase";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Mypage from "./pages/Mypage";
import DarkMode from "./components/DarkMode";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <BrowserRouter >
      <div className={`${styles.app} ${darkMode&&"dark-mode"}` }>
        <DarkMode 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <Menu />
        <div className={styles.main}>
          <Routes>
              <Route path="/todo/:listId" element={<TodoBase />}/>
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