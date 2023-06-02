import dayjs from "dayjs";
import { useState } from "react"

const defaultTodoList = [
    {
        id: 1,
        content: "운동하기",
        date: dayjs(),
        isSuccess: true,
    },
    {
        id: 2,
        content: "ssssss",
        date: dayjs(),
        isSuccess: false,
    },
    {
        id: 3,
        content: "운동gsadffddfxgh하기",
        date: dayjs(),
        isSuccess: false,
    }
]

export const useTodoList = () => {
    const [todoList, setTodoList] = useState(defaultTodoList);
    const [input, setInput] = useState("");

    const addTodo = (selectedDate) => {
        const len = todoList.length;
        const lastId = len === 0 ? 0 : todoList[len - 1].id;

        const newTodoList = [
            ...todoList,
            {
                id: lastId + 1,
                content: input,
                date: selectedDate,
                isSuccess: false,
            }
        ]
        setTodoList(newTodoList);
    }

    const removeTodo = (todoId) => {
        const newTodoList = todoList.filter(todo => todo.id !== todoId);
        setTodoList(newTodoList)
     }

    const toggleTodo = (todoId) => {
        const newTodoList = todoList.map(todo => {
            if (todo.id !== todoId) return todo;
            return {
                ...todo,
                isSuccess: !todo.isSuccess,
            }
        });
        setTodoList(newTodoList);
    } 

    return {
        todoList,
        removeTodo,
        toggleTodo,
        input,
        setInput
    }
}