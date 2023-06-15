import { FC } from 'react'
import styles from './TodoAccorderonTrigger.module.css'

interface ITrigger {
  isOpen: boolean,
  onClick: () => void;
}

const TodoAccorderonTrigger: FC<ITrigger> = ({isOpen, onClick}) => {
  return (
    <button 
      className={`${styles.button} ${isOpen ? `${styles.isOpen}` : ""}`} 
      onClick={onClick}
    >
      <img 
        className={`${styles.arrow} ${isOpen ? `${styles.arrowIsOpen}` : ""}`} 
        src="/arrow-down.svg" 
        alt="open todo list"
      />
    </button>
  )
}

export default TodoAccorderonTrigger