import { ClockLoader } from "react-spinners"
import styles from "../styles/Loading.module.css"

export default function Loading({isLoading}) {
  return(isLoading&&
    <div className={styles.loading}>
      <ClockLoader 
        color="#36d7b7" 
        size={100}
        loading={isLoading}
        cssOverride={{
          animationDelay: "0s",
        }}
      />
    </div>
  )
}