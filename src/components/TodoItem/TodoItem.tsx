import styles from './TodoItem.module.css'
import { ITaskObject } from '../../types'
import { FC } from 'react'

interface ITodoItem {
  data: ITaskObject,
  onInputChange: () => void,
}

const TodoItem: FC<ITodoItem> = ({ data, onInputChange }) => {
  return (
    <label className={styles.label} onChange={onInputChange}>
      <input 
        className={styles.checkbox} 
        defaultChecked={data.isDone}
        type="checkbox" 
      />
      <p className={`${styles.text} ${data.isDone ? `${styles.isDone}` : ""}`}>
        {data.text}
      </p>
    </label>
  )
}

export default TodoItem