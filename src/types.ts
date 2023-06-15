// TODO rewtire any
export interface ITodoList {
  todoList: any,
  handleItemChange: (newTodoList: Array<ITaskObject>) => void,
}

export interface ITaskObject {
  text: string,
  isDone: boolean,
}