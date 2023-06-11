import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import styled from "styled-components"

const Importance = ({returnParam, defaultValue}) => {

  const divStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "center",
  }

  const [importance, setImportance] = useState(defaultValue);
  const [star, setStar] = useState("");

  useEffect(()=>{
    if(importance<20){
      setStar("Star")
    } else if (importance < 40){
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
      <input type="range" min="0" value={importance} max="60" onChange={(e)=>{
        setImportance(e.target.value)
      }}/>
      {/* <div>
        {importance}
      </div> */}
    </div>
  );
}

export default Importance;