import styles from './Todo.module.css'
import { ITaskObject } from '../../types'
import { useMemo, useState } from 'react'
import TodoAccorderonTrigger from '../TodoAccorderonTrigger/TodoAccorderonTrigger'
import TodoInput from '../TodoInput/TodoInput'
import TodoList from '../TodoList/TodoList'

export default function Todo() {
  const [todoList, setTodoList] = useState([
    { text: 'mvp todo', isDone: true },
    { text: 'add typescript', isDone: true },
    { text: 'add tests', isDone: true },
    { text: 'get job', isDone: false },
  ])

  const [tabs, setTabs] = useState([
    { name: 'all', active: true },
    { name: 'active', active: false },
    { name: 'completed', active: false },
  ])

  const tabActive = tabs.find(tab => tab.active)

  const [accordeonOpen, setAccordeonOpen] = useState(true)

  function handleClickAccordeonTrigger(): void {
    setAccordeonOpen(!accordeonOpen)
  }

  function updateTodoList(newTodoList: Array<ITaskObject>) {
    setTodoList(newTodoList)
  }

  function handleInputEnter(value: string): void {
    addTask(value)
  }

  function addTask(value: string): void {
    const newTodoList = [...todoList]
    newTodoList.push({ text: value, isDone: false })
    setTodoList(newTodoList)
  }

  const leftItemsCounter = todoList.reduce((list, item) => {
    !item.isDone ? list += 1 : null
    return list
  }, 0)

  let leftItemsText = leftItemsCounter > 1 ? leftItemsCounter + ' items left' : leftItemsCounter + ' item left'

  function handleClickTab(index: number) {
    const newTabs = [...tabs]
    newTabs.forEach((tab, tabIndex) => tabIndex === index ? tab.active = true : tab.active = false)
    setTabs(newTabs)
  }

  const sortedTodoList = useMemo(() => {
    if (tabActive?.name === 'active') {
      return [...todoList].filter(task => !task.isDone)
    }
    else if (tabActive?.name === 'completed') {
      return [...todoList].filter(task => task.isDone)
    }
    else {
      return [...todoList]
    }
  }, [tabActive?.name, todoList])

  function clearCompleted(): void {
    const newTodoList = [...todoList].filter(task => task.isDone !== true)
    setTodoList(newTodoList)
  }

  return (
    <div className={styles.todoWrapper} data-testid="todoWrapper">
      <h1 className={styles.title}>Todos</h1>
      <div className={styles.todo}>
        <div className={styles.header}>
          <TodoAccorderonTrigger isOpen={accordeonOpen} onClick={handleClickAccordeonTrigger} />
          <TodoInput className={styles.todoInput} onInputEnter={handleInputEnter} />
        </div>
        <div className={`${styles.main} ${accordeonOpen ? `${styles.mainIsOpen}` : ""}`}>
          <TodoList todoList={sortedTodoList} handleItemChange={updateTodoList} />
        </div>
        <div className={styles.footer}>
          <p className={styles.leftItems}>{leftItemsText}</p>
          <div className={styles.tabs}>
            {
              tabs.map((tab, index) => {
                return (
                  <button
                    className={`${styles.tab} ${tab.active ? `${styles.tabActive}` : ""}`}
                    onClick={() => { handleClickTab(index) }}
                    key={tab.name}
                  >
                    {tab.name}
                  </button>
                )
              })
            }
          </div>
          <button className={styles.clearCompleted} onClick={clearCompleted}>Clear completed</button>
        </div>
      </div>
    </div>
  )
}