import { FC } from 'react'
import styles from './TodoInput.module.css'

interface IInput {
  className: string,
  onInputEnter: (value: string) => void,
}

const TodoInput: FC<IInput> = ({ className, onInputEnter }) => {

  // find out why React.KeyboardEvent<HTMLInputElement> doesn't work
  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    console.log(event)
    // const value = event.target.value
    const value = (event.target as HTMLInputElement).value

    if (event.key === 'Enter' && value !== '') {
      onInputEnter(value);
      (event.target as HTMLInputElement).value = ''
    }
  }

  return (
    <input 
      onKeyDown={onKeyDown}
      className={`${styles.input} ${className}`}
      placeholder='what needs to be done?'
      type="text" 
      name="" 
      id=""
    />
  )
}

export default TodoInput