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
import Theme from "./components/Theme";

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [theme, setTheme] = useState("theme__default")

  return (
    <BrowserRouter >
    <div className={`${styles.app__cover} ${darkMode&&"dark-mode"} ${theme}`}>
      <div className={`${styles.app}` }>
        <div
          className={styles.toolbar}
        >
          <DarkMode 
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          <Theme 
            theme={theme}
            setTheme={setTheme}
          />
        </div>
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
      </div>
    </BrowserRouter>
  );
}

export default App;