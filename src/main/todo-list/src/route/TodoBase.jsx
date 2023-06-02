import {useEffect, useState} from "react";

import styles from "./css/Todo.module.css"
import Input from "./css/component/Input"
import Button from "./css/component/Button"
import TodoInput from "./css/component/TodoInput";
import Importance from "./css/component/Importance";
import EstimatedTime from "./css/component/EstimatedTime";
import Deadline from "./css/component/Deadline";
import Difficulty from "./css/component/Difficulty";
import TodoTable from "./css/component/TodoTable";
import Loading from "./css/component/Loading";

import axios from "axios";
import { useCookies } from 'react-cookie';
import { useParams } from "react-router-dom";


const TodoBase = () => {
    const [cookies, setCookie] = useCookies(["accessToken"]);
    const {toDoId} = useParams();

    const [todos, setTodos] = useState([]);
    const [content, setContent] = useState("")
    const [importance, setImportance] = useState(-1);
    const [deadline, setDeadline] = useState("0000-00-00");
    const [estimatedTime, setEstimatedTime] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const [loading, setLoading] = useState(false);
    const [backClicked, setBackClicked] = useState(false);

    

    const getParam = (todoType, param) => {
        switch (todoType) {
            case "importance":
                setImportance(param);
                break;
            case "estimatedTime":
                setEstimatedTime(param);
                break;
            case "difficulty":
                setDifficulty(param);
                break;
            case "deadline":
                setDeadline(param);
                break;
            default:
                console.log("getParamErr");
        }
    }

    const onChangeContent = (e) => setContent(e.target.value)

    // useEffect(()=>console.log(importance), [importance])
    const submit = async(e) => {
        e.preventDefault();
        let res;
        try {
            setLoading(true);
            res = await axios.post(`/api/v1/list/${toDoId}/create`, {
                todoTitle: content,
                importance: importance,
                estimatedTime: estimatedTime,
                difficulty: difficulty,
                deadline: deadline,
            }, {
                headers : {
                    Authorization: `Bearer ${cookies.accessToken}`
                }
            })
            getTodos()
            setContent("")
            setImportance(-1);
            setDeadline("0000-00-00");
            setEstimatedTime(0);
            setDifficulty(0);
            setLoading(false);
        } catch(err) {
            switch(err.response.status){
                case 409:
                    alert("날짜를 선택해주세요.");
                    break;
                default:
                    alert("오?류");
            }
            setLoading(false);
        }
    }

    useEffect(()=> {
        setTodos([]);
        getTodos();
    }, [toDoId])

    const getTodos = async() => {
        let res;
        try{
            res = await axios.get(`/api/v1/list/${toDoId}/todos`, {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`
                }
            });
            setTodos([...res.data])
        } catch(err) {
            console.log(err.response)
        }
        
        // setTodos(res.data);
    }

    return (
        <div 
            className={styles.test}
            onClick={()=>{
                setBackClicked(pre=>!pre)
            }}
        >
            <div>
                <TodoTable 
                    todos={todos}
                />
            </div>
            <div className={styles.inputs}>
                <Input 
                    value={content}
                    id="content"
                    onChange={onChangeContent}
                />
                
                <div>
                    <TodoInput 
                        iconName="hotel_class"
                        description="중요도"
                        Component={<Importance 
                            returnParam={getParam}
                        />}
                        backClicked = {backClicked}
                        setBackClicked={setBackClicked}
                    />
                    
                    <TodoInput 
                        iconName="event"
                        description="기한"
                        Component = {<Deadline
                            returnParam={getParam}
                        />}
                        backClicked = {backClicked}
                        setBackClicked={setBackClicked}
                    />

                    <TodoInput 
                        iconName="timer"
                        description="예상 소요 시간"
                        Component={<EstimatedTime 
                            returnParam={getParam}
                        />}
                        backClicked = {backClicked}
                        setBackClicked={setBackClicked}
                    />
                    
                    <TodoInput 
                        iconName="Mood"
                        description="난이도"
                        Component={<Difficulty 
                            returnParam={getParam}
                        />}
                        backClicked = {backClicked}
                        setBackClicked={setBackClicked}
                    />
                    <span style={{textAlign:"center", width:"80px"}}>
                        {loading?
                            <Loading styles={{fontSize:"36px"}}/>:
                            <Button 
                                text="추가"
                                onClick={submit}
                            />
                        }
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TodoBase;