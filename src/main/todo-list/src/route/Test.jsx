import {useState} from "react";

import styles from "./css/Test.module.css"
import Input from "./css/component/Input"
import TodoInput from "./css/component/TodoInput";
import Importance from "./css/component/Importance";

const Test = () => {
    const [todoContent, setTodoContent] = useState("")

    return (
        <div className={styles.test}>
            <div>
                <div>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>
                <Importance />
            </div>
            <div className={styles.inputs}>
                <Input />
                <div>
                    <TodoInput 
                    iconName="hotel_class"
                    description="중요도"
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