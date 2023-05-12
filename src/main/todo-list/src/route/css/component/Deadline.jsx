import { useEffect, useState } from "react";
import styled from "styled-components";

const Deadline = ({returnParam}) => {
  const inputStyle = {
    height: "100px",
    borderRadius: "20px",
    marginTop: "20px",
    fontFamily: "Sunflower, sans-serif",
    fontSize: "15px",
    fontWeight: "1000",
  }

  const [deadline, setDeadline] = useState("0000-00-00T00:00");

  useEffect(()=>{
    returnParam("deadline", deadline);
  }, [deadline])

  const onChangeDealine = (e) => {
    setDeadline(e.target.value);
  }

  return (
    <div>
      <input style={inputStyle} type="datetime-local" onChange={onChangeDealine}/>
    </div>
  );
}

export default Deadline