import { useCookies } from "react-cookie"
import styles from "../styles/DarkMode.module.css"
import { motion } from "framer-motion"
import { useEffect } from "react"

export default function DarkMode ({darkMode, setDarkMode}) {
  const [cookies, setCookies] = useCookies()

  useEffect(()=>{
    if (cookies.darkMode === "true") {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [])

  useEffect(()=>{
    setCookies("darkMode", darkMode)
  }, [darkMode])

  return (
    <motion.div 
      className={styles.darkMode}
      onClick={()=>{
        setDarkMode(pre=>!pre)
      }}
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