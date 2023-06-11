import { useCookies } from "react-cookie";
import Todo from "./Todo"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../TodoTable.module.css"

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
  const [weight, setWeight] = useState(-0.5);
  const [emergencyW, setEmergencyW] = useState(1-weight);
  const [importanceW, setImportanceW] = useState(1+weight);
  const [listName, setListName] = useState("");

  const [loading, setLoading] = useState(false);
  const [todosLoaded, setTodosLoaded] = useState(false);
  let flags = [false, false, false, false, false]

  const calcLeftDate = (todo) => {
    let leftDate = new Date(todo.deadline) - new Date();

    return leftDate<0?-1:leftDate
  }

  const calcScore = (leftDate, todo) => {
    if(leftDate<0) return -1
    if (todo.estimatedTime===0) todo.estimatedTime = 60
    let emer1 = todo.estimatedTime/(leftDate/1000/60)
    switch(todo.difficulty){
      case 1:
        emer1+=0.05;
        break;
      case 2:
        emer1+=0.1
        break;
      default:
        break;
    }
    
    const score = todo.importance*importanceW + parseInt(emer1*100*emergencyW)
    return score
  }

  const getTodos = async() => {
    
    let res;
    try{
        res = await axios.get(`/api/v1/list/${listId}/todos`, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`
            }
        });
        let temp = [...res.data.toDoDtoList];
        // await setWeight(res.data.weight)
        console.log(res.data)
        setTodos([...temp])
        setTodosLoaded(true)
    } catch(err) {
        console.log(err.response)
    }
    
    // setTodos(res.data);
  }

  useEffect(()=>{
    addScore([...todos]);
  }, [todosLoaded])

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

  const addScore = (tds) => {
    
    if(tds.length!==0&&todosLoaded){
      
      setEmergencyW(1-weight);
      setImportanceW(1+weight);
      tds.forEach((todo, idx) => {
        tds[idx].leftDate = calcLeftDate(todo)
        tds[idx].score = calcScore(tds[idx].leftDate, todo)
      });

      tds.sort((todo1, todo2)=>{
        if(todo1.createdDate>todo2.createdDate) return -1
        if(todo1.createdDate<todo2.createdDate) return 1
        return 0
      })
      

      tds.sort((todo1, todo2)=>{
        if(todo1.score>todo2.score) return -1
        if(todo1.score<todo2.score) return 1
        return 0
      })

      tds.sort((todo1, todo2)=>{
        let todo1LD = todo1.leftDate/1000/60/60/24
        let todo2LD = todo2.leftDate/1000/60/60/24

        if((todo1LD < 3 && todo1.leftDate>0)&&(todo2LD < 3 && todo2.leftDate>0)){
          if(Math.floor(todo1LD) < Math.floor(todo2LD)) return -1
          if(Math.floor(todo1LD) > Math.floor(todo2LD)) return 1
          else return 0
        }
        if(todo1LD < 3 && todo1.leftDate>0) return -1
        if(todo2LD < 3 && todo2.leftDate>0) return 1
        return 0
      })

      tds.sort((todo1, todo2)=>{
        if(todo1.status===1&&todo2.status===0)  return 1
        if(todo1.status===0&&todo2.status===1) return -1
        return 0
      })

      setTodos([...tds])
      setTodosLoaded(false)
      setLoading(true)
      // console.log("긴급도 가중치 : " + String(emergencyW))
      // console.log("중요도 가중치 : " + String(importanceW))
      // tds.map((todo)=>{
      //   console.log(todo.todoTitle, todo.score)
      //   console.log(todo.leftDate, todo.estimatedTime)
      //   console.log("")
      // })
    }
    
  }

  const chengeWeight = async(td) => {
    let index;
    todos.forEach((todo, idx)=>{
      if(todo.todoId === td.todoId){
        index = idx
      }
    })
    let flag=false;
    todos.slice(index).forEach((todo)=> {
      if(weight > 0){
        if (todos[index].leftDate < todo.leftDate) {
          flag = true
        }
      } else {
        
        if (todos[index].importance > todo.importance) {
          flag = true
        }
      }
    })

    if (flag) {
      if(weight > 0){
        setWeight(pre=>pre-0.2)
      } else {
        setWeight(pre=>pre+0.2)
      }
      try{
        const res = await axios.put("/api/v1/user/weight", {
          UpdateWeight: weight
        }, {
          headers:{
            Authorization: `Bearer ${cookies.accessToken}`
          }
        })
        console.log(res)
        getTodos()
      } catch(err) {
        console.log(err.response.data)
      }
    }
  }

  
  return (
    
    <div
      style={{
        height: "100%",
      }}
    >    
      <h1 className={styles.a} style={{marginLeft : "40px" , marginTop:"50px"}}>
          <Link to={`/todo/${listId}`}>
          
          {listName}</Link>
      </h1>

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
        overflowY : todos.length > 5 ? "scroll" : "none" }}>
      
        {todos.map((todo, idx)=>{
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
                chengeWeight = {chengeWeight}
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
                chengeWeight = {chengeWeight}
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
                chengeWeight = {chengeWeight}
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
          return <Todo
            key={idx}
            listId={listId}
            todo={todo}
            getTodos={getTodos}
            chengeWeight = {chengeWeight}
        />}
      )}
      </div>}
    </div>
  );
}

export default TodoTable;