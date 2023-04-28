import {useEffect, useState} from "react";

import styles from "./css/Todo.module.css"
import Input from "./css/component/Input"
import Button from "./css/component/Button"
import TodoInput from "./css/component/TodoInput";
import Importance from "./css/component/Importance";
import EstimatedTime from "./css/component/EstimatedTime";
import Deadline from "./css/component/Deadline";

const Todo = () => {
    const [content, setContent] = useState("")
    const [importance, setImportance] = useState(-1);
    const [deadline, setDeadline] = useState("0000-00-00");
    const [estimatedTime, setEstimatedTime] = useState("00:00:00");
    const [difficulty, setDifficulty] = useState(0);

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
            default:
                console.log("getParamErr");
        }
    }

    const onChangeContent = (e) => setContent(e.target.value)

    // useEffect(()=>console.log(importance), [importance])

    return (
        <div className={styles.test}>
            <div>
                <div>
                </div>
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
                    />
                    
                    <TodoInput 
                    iconName="event"
                    description="기한"
                    Component = {<Deadline
                        returnParam={getParam}
                    />}
                    />

                    <TodoInput 
                    iconName="timer"
                    description="예상 소요 시간"
                    Component={<EstimatedTime 
                        returnParam={getParam}
                    />}
                    />
                    
                    <TodoInput 
                    iconName="device_thermostat"
                    description="난이도"
                    />
                </div>
            </div>
        </div>
    );
}

export default Todo;