import { useEffect, useState } from "react";

import styles from "./css/Intro.module.css";

const Intro = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    // fetch(url, options) : Http 요청 함수
    fetch("/nowij")
      .then(response => response.text())
      .then(message => {
        setMessage(message);
      });
  }, [])

  return (
    <div className={styles.intro}>
      <h1>시하</h1>
      <h3>시온이의 하루라는 뜻</h3>
      {message}
    </div>
  );
}

export default Intro;