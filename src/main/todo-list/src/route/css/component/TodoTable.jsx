import { useCookies } from "react-cookie";
import Todo from "./Todo"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../TodoTable.module.css"
import Loading from "./Loading";

import { motion } from "framer-motion";

const hLineStyle = {
  width: "30%",
  height: "30px",
  marginLeft: "30px",
  marginTop: "30px",
  marginBottm: "10px",
  fontSize: "1.2rem",
  color: "coral",
  borderBottom: "2px solid grey"
}

const TodoTable = ({listId, reload}) => {
  const [cookies, setCookie] = useCookies(["accessToken", "toDoLists"]);
  const [todos, setTodos] = useState([]);
  // const [weight, setWeight] = useState(-0.5);
  // const [emergencyW, setEmergencyW] = useState(1-weight);
  // const [importanceW, setImportanceW] = useState(1+weight);
  const [listName, setListName] = useState("");

  const [loading, setLoading] = useState(false);
  // const [todosLoaded, setTodosLoaded] = useState(false);
  const [uncheckedTodos, setUncheckedTodos] = useState([]);
  const [checkedTodos, setCheckedTodos] = useState([]);
  const [toggleDone, setToggleDone] = useState(false);

  const [aiSorting, setAiSorting] = useState(false);
  const [aiHovered, setAiHovered] = useState(false);


  // let flags = [false, false, false, false, false]

  const chatGPT = async (messages, parameters = {}) => {
    const apikey = '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';
    if (messages[0].constructor === String) return await chatGPT([['user', messages[0]]]);
    messages = messages.map(line => ({ role: line[0], content: line[1].trim() }))
    console.log(1)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apikey}` },
        body: JSON.stringify({ model: 'gpt-3.5-turbo', messages, ...parameters }),
    });
    const data = await response.json();
    if (data?.error?.message) throw new Error(data.error.message);
    return data.choices[0].message.content.trim();
  };
  async function showOutput(inputText) {
    // const response = await chatGPT`할일 추천해줘 12. 2023-06-13T17:50:00.000까지 끝내야하는 XR 시험준비, 7. 2023-06-14T23:50:00.000까지 끝내야하는 `
  
  
    // var inputText = document.getElementById("input-text").value.trim();
    // if(!inputText)alert('묘사해주세요')
    inputText = `todoList :: ${inputText}`
    let response
    try{
      response = await chatGPT([ //In the last line, tell me the standard
          ['system', `The assistant's job is to recommend the priorities of the To Do provided by the user. The user will deliver ToDoId, ToDoTitle, ,deadlines ,difficulty ,importance, createdDate, estimatedTime. If deadline is a date prior to createdDate, set the priority much lower. This analyzes the priority and returns the All Todo in order. Return all of todo datas. Remove pre-text and post-text.`],
          ['user', 'todoList :: [{"toDoId":11,"todoTitle":"빨래하기","estimatedTime":1,"deadline":"2023-06-08T02:57:00","difficulty":0,"importance":100,"createdDate":"2023-06-09T22:54:46.929772"},{"toDoId":13,"todoTitle":"테스트3","estimatedTime":1200,"deadline":"1899-12-31T15:32:00","difficulty":2,"importance":50,"createdDate":"2023-06-09T23:56:09.711066"},{"toDoId":14,"todoTitle":"test","estimatedTime":60,"deadline":"2023-06-10T08:00:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T15:35:30.050454"},{"toDoId":15,"todoTitle":"test2","estimatedTime":0,"deadline":"2023-06-16T06:38:00","difficulty":0,"importance":100,"createdDate":"2023-06-10T15:39:30.819582"},{"toDoId":16,"todoTitle":"asdasd","estimatedTime":0,"deadline":"1899-12-31T15:32:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T15:44:15.377124"},{"toDoId":17,"todoTitle":"dfgdfgdfgdf","estimatedTime":0,"deadline":"1899-12-31T15:32:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T15:44:17.99492"},{"toDoId":18,"todoTitle":"werewrewfgegw","estimatedTime":0,"deadline":"1899-12-31T15:32:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T15:44:21.352215"},{"toDoId":19,"todoTitle":"gwewgsdfdsfdsf","estimatedTime":0,"deadline":"1899-12-31T15:32:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T15:44:29.320451"},{"toDoId":20,"todoTitle":"sdfsdfherher","estimatedTime":0,"deadline":"1899-12-31T15:32:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T15:44:42.153743"},{"toDoId":26,"todoTitle":"ㄴㅇㄹㄴㅇㄹㅇㄴ","estimatedTime":0,"deadline":"2023-06-10T09:40:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T18:39:41.184434"},{"toDoId":27,"todoTitle":"ㅇㅇㅇㅇㅇㅇ","estimatedTime":0,"deadline":"2023-06-10T09:40:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T18:40:02.298014"},{"toDoId":28,"todoTitle":"ㅇㅇㅁㅁ","estimatedTime":0,"deadline":"2023-06-10T09:42:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T18:41:27.130036"},{"toDoId":29,"todoTitle":"ㅂㅂㅈㄷㅂㅈㄷ","estimatedTime":0,"deadline":"2023-06-10T09:44:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T18:43:08.998283"},{"toDoId":30,"todoTitle":"11111111","estimatedTime":0,"deadline":"2023-06-10T09:45:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T18:43:45.609708"},{"toDoId":31,"todoTitle":"ㅂㅂㅈㄷㅂㄷ","estimatedTime":0,"deadline":"2023-06-10T09:52:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T18:49:29.293568"},{"toDoId":39,"todoTitle":"테스트2","estimatedTime":60,"deadline":"1899-12-31T23:59:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T22:20:43.620792"},{"toDoId":40,"todoTitle":"test3","estimatedTime":0,"deadline":"2023-06-14T22:21:00","difficulty":0,"importance":100,"createdDate":"2023-06-10T22:21:45.013878"},{"toDoId":41,"todoTitle":"test44","estimatedTime":0,"deadline":"1899-12-31T15:31:00","difficulty":0,"importance":50,"createdDate":"2023-06-10T22:21:57.179462"]'],
          ['assistant', '{"recommendList":[]}'],
          ['user', 'todoList :: [{"toDoId":42,"todoTitle":"test55","estimatedTime":0,"deadline":"1899-12-31T23:59:00","difficulty":0,"importance":65,"createdDate":"2023-06-10T22:22:27.247356"},{"toDoId":43,"todoTitle":"asdasda","estimatedTime":0,"deadline":"1899-12-31T23:59:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T22:25:14.409467"},{"toDoId":44,"todoTitle":"sdfdsdsss","estimatedTime":120,"deadline":"2023-06-19T22:21:00","difficulty":2,"importance":43,"createdDate":"2023-06-10T22:27:08.618271"},{"toDoId":45,"todoTitle":"asdasd","estimatedTime":300,"deadline":"2023-06-17T22:30:00","difficulty":1,"importance":73,"createdDate":"2023-06-10T22:30:56.176224"},{"toDoId":46,"todoTitle":"1일","estimatedTime":60,"deadline":"2023-06-10T14:41:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T22:41:53.243929"},{"toDoId":47,"todoTitle":"진짜 1일","estimatedTime":60,"deadline":"2023-06-11T02:42:00","difficulty":0,"importance":0,"createdDate":"2023-06-10T22:42:40.710337"},{"toDoId":48,"todoTitle":"2일","estimatedTime":0,"deadline":"2023-06-13T02:42:00","difficulty":0,"importance":100,"createdDate":"2023-06-10T22:42:57.762631"},{"toDoId":49,"todoTitle":"이것도 1일","estimatedTime":60,"deadline":"2023-06-11T12:02:00","difficulty":0,"importance":100,"createdDate":"2023-06-10T23:03:18.047792"},{"toDoId":50,"todoTitle":"이거는 어떻게 할래?","estimatedTime":60,"deadline":"2023-06-11T04:12:00","difficulty":0,"importance":70,"createdDate":"2023-06-10T23:04:09.129918"},{"toDoId":60,"todoTitle":"asdasdasdasd","estimatedTime":60,"deadline":"1899-12-31T23:59:00","difficulty":0,"importance":0,"createdDate":"2023-06-11T18:08:39.264978"}]'],
          ['assistant', '{"recommendList":[]}'],
          ['user', inputText],
      ], { temperature: 0.8 })
    }catch(e){
      console.log(e.message)
      return;
    }
    // var outputText = document.getElementById("output-text");
    // console.log(response)
    const color = JSON.parse(response);
    
    return color.recommendList
    // for (let i = 0; i < color.recommendList.length; i++) {
    //     const divElem = document.createElement('div');
    //     divElem.style.backgroundColor = color.recommendList[i];
    //     divElem.textContent = color.recommendList[i];
    //     outputText.appendChild(divElem);
    // }
    // const divElem = document.createElement('div');
    // divElem.textContent = color.reasonForRecommendation
    // outputText.appendChild(divElem);
  
  }

  const calcLeftDate = () => {
    todos.map((todo, idx)=> {
      let leftDate = new Date(todo.deadline) - new Date();
      todos[idx].leftDate = leftDate<0?-1:leftDate
    })

    // let leftDate = new Date(todo.deadline) - new Date();

    // return leftDate<0?-1:leftDate
  }

  // const calcScore = (leftDate, todo) => {
  //   if(leftDate<0) return -1
  //   if (todo.estimatedTime===0) todo.estimatedTime = 60
  //   let emer1 = todo.estimatedTime/(leftDate/1000/60)
  //   switch(todo.difficulty){
  //     case 1:
  //       emer1+=0.05;
  //       break;
  //     case 2:
  //       emer1+=0.1
  //       break;
  //     default:
  //       break;
  //   }
    
  //   const score = todo.importance*importanceW + parseInt(emer1*100*emergencyW)
  //   return score
  // }

  const seperateTodosByStatus = () => {
    let cTodos = []
    let ucTodos = []

    todos.map((todo)=> {
      if(todo.status===1) cTodos.push(todo)
      else ucTodos.push(todo)
    })

    setCheckedTodos([...cTodos])
    setUncheckedTodos([...ucTodos])
  }

  const getTodos = async() => {
    
    let res;
    try{
        res = await axios.get(`/api/v1/list/${listId}/todos`, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`
            }
        });
        let temp = res.data.toDoDtoList
        
        setTodos([...temp])
        // setTodosLoaded(true)
        setLoading(true)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    calcLeftDate()
    seperateTodosByStatus()
  }, [todos])

  const aiSort = async() => {
    setLoading(false)
    alert("서비스 중지")
    // let temp = await showOutput(JSON.stringify(uncheckedTodos));
    // setUncheckedTodos([...temp])
    // setAiSorting(false)
  }

  useEffect(()=>{
    console.log(uncheckedTodos)
    if(aiSorting){
      aiSort()
    }
  }, [uncheckedTodos])


  // useEffect(()=>{
  //   addScore([...todos]);
  // }, [todosLoaded])

  useEffect(()=>{
    setLoading(false)
    getTodos()
  }, [listId, reload])

  useEffect(()=>{
    if (cookies.toDoLists!==undefined){
      cookies.toDoLists.forEach((todo, idx)=>{
        if(todo.listId === listId){
          setListName(todo.listName)
        }
      })
    }
  }, [cookies.todoLists, listId])

  // const addScore = (tds) => {
    
  //   if(tds.length!==0&&todosLoaded){
      
  //     setEmergencyW(1-weight);
  //     setImportanceW(1+weight);
  //     tds.forEach((todo, idx) => {
  //       tds[idx].leftDate = calcLeftDate(todo)
  //       tds[idx].score = calcScore(tds[idx].leftDate, todo)
  //     });

  //     tds.sort((todo1, todo2)=>{
  //       if(todo1.createdDate>todo2.createdDate) return -1
  //       if(todo1.createdDate<todo2.createdDate) return 1
  //       return 0
  //     })
      

  //     tds.sort((todo1, todo2)=>{
  //       if(todo1.score>todo2.score) return -1
  //       if(todo1.score<todo2.score) return 1
  //       return 0
  //     })

  //     tds.sort((todo1, todo2)=>{
  //       let todo1LD = todo1.leftDate/1000/60/60/24
  //       let todo2LD = todo2.leftDate/1000/60/60/24

  //       if((todo1LD < 3 && todo1.leftDate>0)&&(todo2LD < 3 && todo2.leftDate>0)){
  //         if(Math.floor(todo1LD) < Math.floor(todo2LD)) return -1
  //         if(Math.floor(todo1LD) > Math.floor(todo2LD)) return 1
  //         else return 0
  //       }
  //       if(todo1LD < 3 && todo1.leftDate>0) return -1
  //       if(todo2LD < 3 && todo2.leftDate>0) return 1
  //       return 0
  //     })

  //     tds.sort((todo1, todo2)=>{
  //       if(todo1.status===1&&todo2.status===0)  return 1
  //       if(todo1.status===0&&todo2.status===1) return -1
  //       return 0
  //     })

  //     setTodos([...tds])
  //     setTodosLoaded(false)
  //     setLoading(true)
  //   }
    
  // }

  // const chengeWeight = async(td) => {
  //   let index;
  //   todos.forEach((todo, idx)=>{
  //     if(todo.todoId === td.todoId){
  //       index = idx
  //     }
  //   })
  //   let flag=false;
  //   todos.slice(index).forEach((todo)=> {
  //     if(weight > 0){
  //       if (todos[index].leftDate < todo.leftDate) {
  //         flag = true
  //       }
  //     } else {
        
  //       if (todos[index].importance > todo.importance) {
  //         flag = true
  //       }
  //     }
  //   })

  //   if (flag) {
  //     if(weight > 0){
  //       setWeight(pre=>pre-0.2)
  //     } else {
  //       setWeight(pre=>pre+0.2)
  //     }
  //     try{
  //       const res = await axios.put("/api/v1/user/weight", {
  //         weight: weight
  //       }, {
  //         headers:{
  //           Authorization: `Bearer ${cookies.accessToken}`
  //         }
  //       })
  //       console.log(res)
  //       getTodos()
  //     } catch(err) {
  //       console.log(err.response.data)
  //     }
  //   }
  // }

  
  return (
    
    <div
      style={{
        height: "100%",
      }}
    >   
      <div
        style={{
          marginLeft : "40px" , 
          marginTop:"50px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div 
          className={styles.a} 
          style={{
            fontSize: "2rem",
          }}
        >
            <Link to={`/todo/${listId}`}>
            {listName}</Link>
        </div>
        <div
          style={{
            display: "flex",
            width: "20%",
            justifyContent: "space-between",
            marginRight: "50px", 
          }}
        >
          <motion.div
            style={{
              backgroundColor: "rgba(100, 100, 100, 0.2)",
              color: "rgba()",
              fontSize: "1.8rem",
              borderRadius: "10px",
              padding: "5px",
              textAlign: "center",
              width: "100px",
              cursor: "pointer",

            }}
            whileHover={{
              scale:1.1,
            }}
            onClick={()=>{setToggleDone(pre=>!pre)}}
          >
            {toggleDone?"완료":"미완료"}
          </motion.div>
          {aiSorting?
            <Loading 
              styles={{
                fontSize: "3rem",
              }}
            />:
            <div>
              <motion.div
                style={{
                  fontSize: "3rem",
                  cursor: "pointer"
                }}
                whileHover={{
                  color: "rgba(0, 0, 200, 1)"
                }}
                onClick={()=>{
                  alert("서비스 중지")
                  // getTodos()
                  // setAiSorting(true)
                }}
                onMouseEnter={()=>setAiHovered(true)}
                onMouseLeave={()=>setAiHovered(false)}
                className="material-symbols-outlined"
              >
                magic_button
              </motion.div>
              {aiHovered&&
                <div
                  style={{
                    position: "absolute",
                    transform: "translateY(-350%)",
                  }}
                >
                  AI 정렬
                </div>
              }
            </div>
          }
        </div>
      </div>
      

      <div
          style={{
            width: "93%",
            marginLeft : "18px",
            borderBottom: "4px solid #aaa",
            lineHeight: "0.5em",}}
      />
      {loading&&
      <div style = {{ 
        height : "85%",
        marginTop : "15px",
        overflowY : todos.length > 4 ? "scroll" : "none" }}
      >
        {!aiSorting?<div>
          {toggleDone&&
            <div>
              {checkedTodos.map((todo, idx)=> {
                return <Todo
                key={idx}
                listId={listId}
                todo={todo}
                getTodos={getTodos}
              />
              })}
            </div>
          }
          {!toggleDone&&
            <div>
              {uncheckedTodos.map((todo, idx)=> {
                return <Todo
                key={idx}
                listId={listId}
                todo={todo}
                getTodos={getTodos}
              />
              })}
            </div>}
          </ div>:
          <div
            style={{
              // height: "100%",
              width: "fit-content",
              margin: "0 auto",
              marginTop: "15%",
              textAlign: "center"
            }}
          >
            <Loading 
              styles={{
                fontSize: "5rem"
              }}
            />
          </div>
          
        }
        

        {/* {todos.map((todo, idx)=>{
          return <Todo
            key={idx}
            listId={listId}
            todo={todo}
            getTodos={getTodos}
            // chengeWeight = {chengeWeight}
          />
          if(todo.leftDate/1000/60/60/24 < 1 && todo.leftDate/1000/60/60/24 > 0 && !flags[0]){
            flags = [true, false, false, false, false]
            return (
            <div key={-idx}> 
              <div style={hLineStyle}>1일 미만</div>
              <Todo
                key={idx}
                listId={listId}
                todo={todo}
                getTodos={getTodos}
              />
            </div>
            )
          } else if(todo.status===0 && todo.leftDate/1000/60/60/24 < 2 && todo.leftDate/1000/60/60/24 >= 1 && !flags[1]) {
            flags = [true, true, false, false, false]
            return (
            <div key={-idx}> 
              <div style={hLineStyle}>2일 미만</div>
              <Todo
                key={idx}
                listId={listId}
                todo={todo}
                getTodos={getTodos}
                //chengeWeight = {chengeWeight}
              />
            </div>
            )
          } else if(todo.status===0 && todo.leftDate/1000/60/60/24 < 3 && todo.leftDate/1000/60/60/24 >= 2 && !flags[2]) {
            flags = [true, true, true, false, false]
            return (
            <div key={-idx}> 
              <div style={hLineStyle}>3일 미만</div>
              <Todo
                key={idx}
                listId={listId}
                todo={todo}
                getTodos={getTodos}
                //chengeWeight = {chengeWeight}
              />
            </div>
            )
          } else if(todo.status===0 && todo.leftDate/1000/60/60/24 >= 3 && !flags[3]) {
            flags = [true, true, true, true, false]
            return (
            <div key={-idx}> 
              <div style={hLineStyle}>3일 이상</div>
              <Todo
                key={idx}
                listId={listId}
                todo={todo}
                getTodos={getTodos}
                //chengeWeight = {chengeWeight}
              />
            </div>
            )
          } else if(todo.status===1 && !flags[4]) {
            flags = [true, true, true, true, true]
            return (
            <div key={-idx}> 
              <div style={hLineStyle}>완료된 할일</div>
              <Todo
                key={idx}
                listId={listId}
                todo={todo}
                getTodos={getTodos}
                chengeWeight = {chengeWeight}
              />
            </div>
            )
          }
          } */}
      {/* )} */}
      </div>}
    </div>
  );
}

export default TodoTable;