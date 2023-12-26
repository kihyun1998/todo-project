import { useEffect, useState } from "react"

const Difficulty = ({returnParam, defaultValue}) => {

  const divStyle = {
    textAlign: "left",
    paddingLeft: "50px",
    paddingTop: "5px",
  }

  const inputStyle = {
    display: "none",
  }

  const labelStyle = {
    fontFamily: "'Sunflower', sans-serif",
    fontWeight: 1000,
    fontSize: "1.2rem",
    cursor: "pointer"
  }

  const faceStyle = {
    fontSize: "2rem",
    cursor: "pointer"
  }

  const selected = {
    color:"blue"
  }
  
    
  const [difficulty, setDifficulty] = useState(defaultValue);

  const onClickDifficulty = (e) => {
    switch(e.target.value) {
      case "easy": 
        setDifficulty(0);
        break;
      case "normal":
        setDifficulty(1);
        break;
      case "hard":
        setDifficulty(2);
        break;
      default:
        setDifficulty(-1);
    }

  }
  
  useEffect(()=>returnParam("difficulty", difficulty), [difficulty])

  return (
    <div style={divStyle}>
      <input 
        type="radio" 
        id="easy" 
        name="difficulty" 
        value="easy" 
        style={inputStyle}
        onChange={onClickDifficulty}
        />
      <label 
        htmlFor="easy"
        className="material-symbols-outlined"
        style={Object.assign({}, faceStyle, difficulty===0&&selected)}>
       sentiment_very_satisfied
      </label>
      <label 
        htmlFor="easy"
        style={labelStyle}>
        쉬움
      </label> <br />

      <input 
        type="radio"
        id="normal"
        name="difficulty"
        value="normal"
        style={inputStyle}
        onChange={onClickDifficulty}/>
      <label 
        htmlFor="normal" 
        className="material-symbols-outlined" 
        style={Object.assign({}, faceStyle, difficulty===1&&selected)}>
        sentiment_Neutral
      </label>
      <label 
        htmlFor="normal" 
        style={labelStyle}>
        보통
      </label> <br />

      <input 
        type="radio" 
        id="hard" 
        name="difficulty" 
        value="hard" 
        style={inputStyle}
        onChange={onClickDifficulty}/>
      <label 
        htmlFor="fullStar" 
        className="material-symbols-outlined" 
        style={Object.assign({}, faceStyle, difficulty===2&&selected)}>
        mood_bad
      </label>
      <label 
        htmlFor="hard" 
        style={labelStyle}>
        어려움
      </label> <br />
    </div>
  );

}

export default Difficulty;