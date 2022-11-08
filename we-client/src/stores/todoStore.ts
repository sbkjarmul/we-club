import { defineStore } from "pinia"
import { Todo } from "@/models/todo.model"
import { ref } from "vue"
import todoApi from '@/network/todo'

export const useTodoStore = defineStore('TodoStore', () => {
  const allTodos = ref([] as Todo[])

  const getAllTodos = () => {
    todoApi.getAllTodos()
      .then(response => {
        allTodos.value = response.data
      })
  }

  const assignTodo = (todoId: number, nickName: string) => {
    todoApi.assignTodo(todoId)
      .then(() => {
        assignTodoInStore(todoId, nickName)
      })
  }

  const unassignTodo = (todoId: number) => {
    todoApi.unassignTodo(todoId)
      .then(() => {
        assignTodoInStore(todoId, '')
      })
  }

  const assignTodoInStore = (todoId: number, nickName: string) => {
    const indexOfTodoToAssign = allTodos.value.findIndex((todo) => todo.id === todoId)
    if (indexOfTodoToAssign !== -1) {
      allTodos.value.map(todo => {
        if (todo.id === todoId) {
          todo.assigned = nickName
        }
      })
    }
  }

  const addTodo = (todo: Todo) => {
    todoApi.addTodo(todo)
      .then(response => {
        allTodos.value.push(response.data)
      })
  }

  const removeTodo = (todoId: number) => {
    todoApi.removeTodo(todoId)
      .then(() => {
        removeTodoInStore(todoId)
      })
  }

  const removeTodoInStore = (todoId: number) => {
    const indexOfTodoToRemove = allTodos.value.findIndex((todo) => todo.id === todoId)
    if (indexOfTodoToRemove !== -1) {
      allTodos.value.splice(indexOfTodoToRemove, 1)
    }
  }

  return {
    getAllTodos,
    assignTodo,
    unassignTodo,
    removeTodo,
    addTodo,
    allTodos,
  }
})