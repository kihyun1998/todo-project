import { motion } from "framer-motion"

const loadingStyle = {
  fontSize: "30px",
}

const Spinner = ({styles}) => {
  return(
    <motion.span 
      className="material-symbols-outlined"
      animate={{rotate: 180}}
      transition={{repeat:Infinity, duration:1}}
      style={Object.assign({}, loadingStyle, styles)}
    >
      cached
    </motion.span>
  )
}

export default Spinner