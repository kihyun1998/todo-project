import { useEffect, useState } from "react"

const Deadline = ({returnParam, defaultValue}) => {
  const inputStyle = {
    height: "100px",
    // borderRadius: "20px",
    border: "0",
    backgroundColor: "darkgrey",
    color: "white",
    marginTop: "20px",
    fontFamily: "Sunflower, sans-serif",
    fontSize: "15px",
    fontWeight: "1000",
  }

  const [deadline, setDeadline] = useState(new Date(defaultValue));

  useEffect(()=>{
    
    returnParam("deadline", deadline);
  }, [deadline])

  const onChangeDealine = (e) => {
    setDeadline(new Date(e.target.value));
  }

  return (
    <div>
      <input style={inputStyle} type="datetime-local" onChange={onChangeDealine}/>
    </div>
  );
}

export default Deadline