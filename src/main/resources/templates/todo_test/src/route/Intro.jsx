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
      <h1>스마트 To do List</h1>
      <h3>여기에는 소개가 들어갈 예정</h3>
      {message}
    </div>
  );
}

export default Intro;