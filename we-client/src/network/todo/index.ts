import { Todo } from "@/models/todo.model"
import httpClient from "@/network/httpClient"

function getAllTodos() {
  return httpClient.get(`/todos/all`)
}

function addTodo(todo: Todo) {
  return httpClient.post(`/todos/add`, {
    description: todo.description
  })
}

function assignTodo(todoId: number) {
  return httpClient.put(`/todos/assign`, {
    todoId
  })
}

function unassignTodo(todoId: number) {
  return httpClient.put(`/todos/unassign`, {
    todoId
  })
}

function removeTodo(todoId: number) {
  return httpClient.delete(`todos/delete`, {
    data: {
      todoId
    }
  })
}

export default {
  getAllTodos,
  addTodo,
  assignTodo,
  unassignTodo,
  removeTodo
}
