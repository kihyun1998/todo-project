import { useEffect, useState } from "react";
import styled from "styled-components"

const TimeCaseStyle = styled.div`
  height: ${props=>props.clicked?"150px":"30px"};
  overflow-y: ${props=>props.clicked?"scroll":"hidden"};
  width: 80px;
  background-color: white;

  transition: .3s all;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TimeStyle = styled.div`
  height: 30px;
  background-color: ${params=>params.current?"darkgrey":"black"};
  cursor: pointer;
`;

const EstimatedTime = ({returnParam, defaultValue}) => {
  const estimatedTimeStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%",
    // paddingTop: "25px",
    
  }

  const [hoursClicked, setHoursClicked] = useState(true);
  const [minutesClicked, setMinutesClicked] = useState(true);
  
  const [hours, setHours] = useState(parseInt(defaultValue/60));
  const [minutes, setMinutes] = useState(defaultValue%60);

  useEffect(()=> {
    returnParam("estimatedTime", hours*60 + minutes)
  }, [hours, minutes])


  return (
    <div style={estimatedTimeStyle}>
      <TimeCaseStyle clicked={hoursClicked}>
        {Array.from(Array(106).keys()).map(i => {
          i -= 2;
          return (
            <TimeStyle 
              key={i}
              onClick={e=>{
                if (e.target.innerText !== "　"&&hoursClicked) {
                  setHours(Number(e.target.innerText))
                  e.target.parentNode.scrollTop = e.target.offsetTop-5
                }
                setHoursClicked(pre=>!pre);
              }}
              current={hours===i}>
              {i>-1&&i<100?String(i).padStart(2, '0'):"　"}
            </TimeStyle>
          );
        })}
      </TimeCaseStyle>
      <div>
        시간
      </div>
      <TimeCaseStyle clicked={minutesClicked}> 
        {Array.from(Array(66).keys()).map(i => {
          i -= 2;
          return (
            <TimeStyle 
              current={minutes===i}
              key={0-i}
              onClick={e=>{
                if (e.target.innerText !== "　"&& minutesClicked) {
                  setMinutes(Number(e.target.innerText))
                  e.target.parentNode.scrollTop = e.target.offsetTop-5
                }
                setMinutesClicked(pre=>!pre);
            }}>
              {i>-1&&i<60?String(i).padStart(2, '0'):"　"}
            </TimeStyle>
          );
        })}
      </TimeCaseStyle>
      <div>분</div>
    </div>
  );
}

export default EstimatedTime;


/*
1. 00~99시간
2. 
*/