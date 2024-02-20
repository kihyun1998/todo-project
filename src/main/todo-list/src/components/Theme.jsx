import { useState } from "react";
import styles from "../styles/Theme.module.css"
import { AnimatePresence, motion } from "framer-motion";

const themes = [
  "default",
  "lavender",
  "mint",
  "orange",
  "pink",
  "deepblue",
  // "what"
] 

export default function Theme({theme, setTheme}) {
  const [selecting, setSelecting] = useState(false);
  return (
    <div>
      <motion.div 
        className= {`material-symbols-outlined ${styles.theme__btn}`}
        onClick={()=>setSelecting(pre=>!pre)}
        whileHover={{scale: 1.1}}
      >
        palette
      </motion.div>
      <AnimatePresence>
      {selecting&&
      <motion.div 
        className={styles.theme_selector}
        initial={{translateY: "100px"}}
        animate={{translateY: "0px"}}
        exit={{translateY: "100px"}}
      >
        {themes.map((theme, idx)=>{
          return(
          <div
            key={idx}
            onClick={()=>setTheme(`theme__${theme}`)}      
            className={styles[`theme__${theme}`]}    
          />)
        })}
      </motion.div>
      }
      </AnimatePresence>
    </div>
  )
}