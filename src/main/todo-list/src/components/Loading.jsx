import { ClockLoader } from "react-spinners"
import styles from "../styles/Loading.module.css"
import { AnimatePresence, motion } from "framer-motion"

export default function Loading({isLoading}) {
  return(
    <AnimatePresence>
    {isLoading&&
    <motion.div 
      className={styles.loading}
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 0.3
      }}
      exit={{
        opacity: 0
      }}
    >
      <ClockLoader 
        color="#36d7b7" 
        size={100}
        loading={isLoading}
        cssOverride={{
          animationDelay: "0s",
        }}
      />
    </motion.div>
    }
    </AnimatePresence>
  )
}