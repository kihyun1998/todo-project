import styles from "../styles/DarkMode.module.css"
import { motion } from "framer-motion"

export default function DarkMode ({darkMode, setDarkMode}) {
  

  return (
    <motion.div 
      className={styles.darkMode}
      onClick={()=>{
        setDarkMode(pre=>!pre)}}
      style={{
        justifyContent: darkMode?"end":"start"
      }}
    >
      <motion.div
        className={`material-symbols-outlined ${styles.ball}`}
        transition={{type: "spring"}}
        layout
      > 
        {
          darkMode?
          "dark_mode":
          "light_mode"
        }
      </ motion.div>
    </motion.div>
  )
}