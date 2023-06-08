import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import styled from "styled-components"

const Importance = ({returnParam}) => {

  const divStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "center",
  }

  // const inputStyle = {
  //   display: "none",
  // }

  // const labelStyle = {
  //   fontFamily: "'Sunflower', sans-serif",
  //   fontWeight: 1000,
  //   fontSize: "1.2rem",
  //   cursor: "pointer"
  // }

  // const starStyle = {
  //   fontSize: "2rem",
  //   cursor: "pointer"
  // }

  // const fullStar = {
  //   fontVariationSettings: `'FILL' 1`,
  // }

  // const selected = {
  //   color:"yellow"
  // }

  
  const [importance, setImportance] = useState(0);
  const [star, setStar] = useState("");

  // const onClickImportance = (e) => {
  //   switch(e.target.value) {
  //     case "emptyStar": 
  //       setImportance(0);
  //       break;
  //     case "halfStar":
  //       setImportance(1);
  //       break;
  //     case "fullStar":
  //       setImportance(2);
  //       break;
  //     default:
  //       setImportance(-1);
  //   }
  //   // console.log(importance)
  // }

  useEffect(()=>{
    if(importance<33){
      setStar("Star")
    } else if (importance < 66){
      setStar("Star Star")
    } else {
      setStar("Star Star Star")
    }
    returnParam("importance", importance)
  }, [importance])
  
  return (
    <div style={divStyle}>
      <motion.div 
        className="material-symbols-outlined"
        style={{
          color: "yellow",
          wordSpacing: "-20px",
          fontSize: "2rem",
        }}
      >
        {star}
      </motion.div>
      <input type="range" min="0" value={importance} max="100" onChange={(e)=>{
        setImportance(e.target.value)
      }}/>
      <div>
        {importance}
      </div>

      {/* <input 
        type="radio" 
        id="emptyStar" 
        name="importance" 
        value="emptyStar" 
        style={inputStyle}
        onChange={onClickImportance}
        />
      <label 
        htmlFor="emptyStar"
        className="material-symbols-outlined"
        style={Object.assign({}, starStyle, importance===0&&selected)}>
        Star
      </label>
      <label 
        htmlFor="emptyStar"
        style={labelStyle}>
        안해도 괜찮음
      </label> <br />

      <input 
        type="radio"
        id="halfStar"
        name="importance"
        value="halfStar"
        style={inputStyle}
        onChange={onClickImportance}/>
      <label 
        htmlFor="halfStar" 
        className="material-symbols-outlined" 
        style={Object.assign({}, starStyle, importance===1&&selected)}>
        Star_Half
      </label>
      <label 
        htmlFor="halfStar" 
        style={labelStyle}>
        안하면 곤란함
      </label> <br />

      <input 
        type="radio" 
        id="fullStar" 
        name="importance" 
        value="fullStar" 
        style={inputStyle}
        onChange={onClickImportance}/>
      <label 
        htmlFor="fullStar" 
        className="material-symbols-outlined" 
        style={Object.assign({}, fullStar, starStyle, importance===2&&selected)}>
        Star
      </label>
      <label 
        htmlFor="fullStar" 
        style={labelStyle}>
        안하면 죽음 뿐
      </label> <br /> */}
    </div>
  );
}

export default Importance;