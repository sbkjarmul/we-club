import { defineStore } from "pinia"
import axios from 'axios'
import { Todo } from "@/models/todo.model"
import { ref } from "vue"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const useChristmassStore = defineStore('ChristmassStore', () => {
  const allTodos = ref([] as Todo[])

  const drawnUser = ref({
    email: '',
    firstName: '',
    lastName: '',
    nickName: ''
  })

  const draw = () => {
    const token = JSON.parse(String(localStorage.getItem('token')))
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(`${BASE_URL}/lotery/draw`, config).then((result) => {
      getDrawnUser()
    })
  }

  const getDrawnUser = () => {
    const config = createConfig()

    axios.get(`${BASE_URL}/lotery/whom`, config).then(response => {
      drawnUser.value = response.data
    })
  }

  const getAllTodos = () => {
    const config = createConfig()

    axios.get(`${BASE_URL}/todos/all`, config)
      .then(response => {
        allTodos.value = response.data
      })
  }

  const assignTodo = (todoId: number, nickName: string) => {
    const config = createConfig()

    axios.put(`${BASE_URL}/todos/assign`, {
      todoId
    }, config)
      .then(() => {
        assignTodoInStore(todoId, nickName)
      })
  }

  const unassignTodo = (todoId: number) => {
    const config = createConfig()

    axios.put(`${BASE_URL}/todos/unassign`, {
      todoId
    }, config)
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
    const config = createConfig()

    axios.post(`${BASE_URL}/todos/add`, {
      description: todo.description
    }, config)
      .then(response => {
        const todo = response.data
        allTodos.value.push(todo)
      })
  }

  const removeTodo = (todoId: number) => {
    const token = JSON.parse(String(localStorage.getItem('token')))
    const config = {
      data: {
        todoId
      },
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.delete(`${BASE_URL}/todos/delete`, config)
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

  const createConfig = (data?: any) => {
    const token = JSON.parse(String(localStorage.getItem('token')))
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      data
    };

    return config
  }

  return {
    draw,
    getDrawnUser,
    getAllTodos,
    assignTodo,
    unassignTodo,
    removeTodo,
    addTodo,
    drawnUser,
    allTodos,
  }
})