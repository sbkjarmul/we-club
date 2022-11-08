<script lang="ts" setup>
import * as content from '@/assets/content.json'
import TodoItem from '@/components/TodoItem.vue'
import { Todo } from '@/models/todo.model'
import { useLoteryStore } from '@/stores/loteryStore';
import { useTodoStore } from '@/stores/todoStore';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const todoListContent = content.components.todo

const LoteryStore = useLoteryStore()
const todoStore = useTodoStore()
const userStore = useUserStore()
const { allTodos } = storeToRefs(todoStore)
const { user } = storeToRefs(userStore)
const { assignTodo, unassignTodo, addTodo, removeTodo, getAllTodos } = todoStore

onMounted(() => {
  getAllTodos()
})

const todoDescription = ref('')

function assignTodoHandler(todoId: number) {
  const nickName = user.value.nickName
  assignTodo(todoId, nickName)
}

function unassignTodoHandler(todoId: number) {
  unassignTodo(todoId)
}

function addTodoHandler() {
  const newTodo: Todo = {
    description: todoDescription.value
  }
  addTodo(newTodo)
  todoDescription.value = ''
}

function removeTodoHandler(todoId: number) {
  removeTodo(todoId)
}
</script>

<template>
  <section class="todolist__wrapper">
    <div class="todolist__new-todo">
      <label class="todolist__label">Opis zadania</label>
      <input type="text" class="todolist__input" v-model="todoDescription" />
      <button class="todolist__button" @click="addTodoHandler" :class="{ 'disabled': !todoDescription }">{{
          todoListContent.addTodo
      }}</button>
    </div>
    <div class="todolist">
      <TodoItem v-for="todo in allTodos" @assignTodo="assignTodoHandler($event)"
        @unassignTodo="unassignTodoHandler($event)" @removeTodo="removeTodoHandler($event)" :todo="todo"
        :key="todo.description">
      </TodoItem>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.todolist__wrapper {
  display: flex;
  flex-direction: column;
}

.todolist__new-todo {
  display: flex;
  flex-direction: column;
  margin-bottom: $space-m;

  .todolist__input {
    margin-bottom: $space-xs;
    background: $color-dark-hover;
    border: 1px solid $color-block-text;
    width: 100%;
    outline: none;
    color: $color-burn;
    font-size: $text-s;
    font-weight: 400;
    letter-spacing: 2px;

    font-size: $text-xs;
    line-height: $text-s;
    padding: $space-xs $space-xs;

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px $color-dark-hover inset !important;
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: $color-burn !important;
    }
  }

  .todolist__label {
    user-select: none;
    color: $color-light-secondary;
  }

  .todolist__button {
    width: fit-content;
    padding: $space-xs;
    align-self: flex-end;
    user-select: none;

    background-color: $color-burn;
    border: 4px double $color-dark;

    &:hover {
      background-color: $color-light;
    }

    &.disabled {
      background-color: $color-block-text;
    }
  }
}

.todolist {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(auto, 1fr);
  grid-column-gap: $block-gap;
  grid-row-gap: $block-gap;

  @include for-desktop {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>