import {useState} from "react";

import styles from "./css/Todo.module.css"
import Input from "./css/component/Input"
import TodoInput from "./css/component/TodoInput";
import Importance from "./css/component/Importance";

const Test = () => {
    const [todoContent, setTodoContent] = useState("")

    return (
        <div className={styles.test}>
            <div>
                <div>
                </div>
            </div>
            <div className={styles.inputs}>
                <Input />
                <div>
                    <TodoInput 
                    iconName="hotel_class"
                    description="중요도"
                    Component={<Importance />}
                    />
                    <TodoInput 
                    iconName="event"
                    description="기한"
                    />
                    <TodoInput 
                    iconName="timer"
                    description="예상 소요 시간"
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

export default Test;