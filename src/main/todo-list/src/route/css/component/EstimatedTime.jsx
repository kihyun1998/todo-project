import { useState } from "react";
import styled from "styled-components"

const TimeCaseStyle = styled.div`
  overflow-y: ${props=>props.clicked?"scroll":"hidden"};
  width: 80px;
  height: ${props=>props.clicked?"150px":"30px"};
  background-color: white;

  transition: .3s all;

  // scroll-behavior: smooth;
  // scroll-snap-type: mandatory;
  //   -webkit-overflow-scrolling: touch;
  //   -webkit-scroll-snap-type: mandatory;
  //   -ms-scroll-snap-type: mandatory;

  // &::-webkit-scrollbar {
  //   width: 20px;
  //   height: 10px;
  // }
`;

const TimeStyle = styled.div`
  height: 30px;
  background-color: ${params=>params.current?"darkgrey":"white"};
`;

const EstimatedTime = () => {
  const estimatedTimeStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%",
    // paddingTop: "25px",
    
  }

  const [hoursClicked, setHoursClicked] = useState(true);
  const [minutesClicked, setMinutesClicked] = useState(true);
  
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);


  return (
    <div style={estimatedTimeStyle}>
      <TimeCaseStyle clicked={hoursClicked}>
        {Array.from(Array(106).keys()).map(i => {
          i -= 2;
          return (
            <TimeStyle 
              key={i}
              onClick={e=>{
                if (e.target.innerText !== "　") {
                  setHours(Number(e.target.innerText))
                  e.target.parentNode.scrollTop = e.target.offsetTop-5
                  
                  setHoursClicked(pre=>!pre);
                }
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
                if (e.target.innerText !== "　") {
                  setMinutes(Number(e.target.innerText))
                  e.target.parentNode.scrollTop = e.target.offsetTop-5
                  
                  setMinutesClicked(pre=>!pre);
                }
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