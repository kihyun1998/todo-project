import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  // message 초기값 설정 (""로 설정)
  const [message, setMessage] = useState("");

  // useEffect(함수, 배열) : 컴포넌트가 화면에 나타났을 때 자동 실행
  useEffect(() => {
    // fetch(url, options) : Http 요청 함수
    fetch("/nowij")
      .then(response => response.text())
      .then(message => {
        setMessage(message);
      });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          nowij : {message}
        </p>
      </header>
    </div>
  );
}

export default App;