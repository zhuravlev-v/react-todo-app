import { FC } from 'react'
import { ITodoList, ITaskObject } from '../../types'
import styles from './TodoList.module.css'
// import { useState } from 'react'
import TodoItem from '../TodoItem/TodoItem'

const TodoList: FC<ITodoList> = ({ todoList, handleItemChange }) => {

  function handleChange(index: number) {
    const newTodoList = [...todoList]
    newTodoList[index] = { ...newTodoList[index], isDone: !newTodoList[index].isDone }
    handleItemChange(newTodoList)
  }

  return (
    <ul className={styles.list}>
      {
        todoList.map((todo: ITaskObject, index: number) => {
          return (
            <li className={styles.listItem} key={todo.text}>
              <TodoItem data={todo} onInputChange={() => { handleChange(index) }} />
            </li>
          )
        })
      }
    </ul>
  )
}

export default TodoList