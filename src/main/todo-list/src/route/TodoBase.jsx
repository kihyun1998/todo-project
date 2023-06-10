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
    const {todoId} = useParams();

    const [content, setContent] = useState("")
    const [importance, setImportance] = useState(0);
    const [deadline, setDeadline] = useState(new Date("1900-01-01T00:00"));
    const [estimatedTime, setEstimatedTime] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const [loading, setLoading] = useState(false);
    const [backClicked, setBackClicked] = useState(false);

    const [reload, setReload] = useState(false);

    

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
            res = await axios.post(`/api/v1/list/${todoId}/create`, {
                todoTitle: content,
                importance: importance,
                estimatedTime: estimatedTime,
                difficulty: difficulty,
                deadline: deadline.toISOString().slice(0, 16),
            }, {
                headers : {
                    Authorization: `Bearer ${cookies.accessToken}`
                }
            })
            setContent("")
            setImportance(0);
            setDeadline(new Date("1900-01-01T00:00"));
            setEstimatedTime(0);
            setDifficulty(0);
            setLoading(false);
            setReload(pre=>!pre)
        } catch(err) {
            console.log(err)
            switch(err.status){
                case 409:
                    alert("날짜를 선택해주세요.");
                    break;
                default:
                    alert("오?류");
            }
            setLoading(false);
        }
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
                    todoId={parseInt(todoId)}
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
                            defaultValue={importance}
                        />}
                        backClicked = {backClicked}
                        setBackClicked={setBackClicked}
                    />
                    
                    <TodoInput 
                        iconName="event"
                        description="기한"
                        Component = {<Deadline
                            returnParam={getParam}
                            defaultValue={deadline}
                        />}
                        backClicked = {backClicked}
                        setBackClicked={setBackClicked}
                    />

                    <TodoInput 
                        iconName="timer"
                        description="예상 소요 시간"
                        Component={<EstimatedTime 
                            returnParam={getParam}
                            defaultValue={estimatedTime}
                        />}
                        backClicked = {backClicked}
                        setBackClicked={setBackClicked}
                    />
                    
                    <TodoInput 
                        iconName="Mood"
                        description="난이도"
                        Component={<Difficulty 
                            returnParam={getParam}
                            defaultValue={difficulty}
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
                                reload={reload}
                            />
                        }
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TodoBase;