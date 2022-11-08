<script lang="ts" setup>
import * as content from '@/assets/content.json'
import { useTodoStore } from '@/stores/todoStore';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
const myTodosContent = content.components.todo

const todoStore = useTodoStore()
const userStore = useUserStore()
const { allTodos } = storeToRefs(todoStore)
const { user } = storeToRefs(userStore)

const { getAllTodos } = todoStore

onMounted(() => {
  getAllTodos()
})

const myTodos = computed(() => (
  allTodos.value.filter(todo => todo.assigned === user.value?.nickName)
))
</script>

<template>
  <div class="my-todos__wrapper">
    <h1 class="my-todos__header">{{ myTodosContent.myTasks }}</h1>
    <div class="my-todos">
      <p class="my-todos__task" v-for="todo in myTodos">{{ todo.description }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.my-todos__wrapper {
  padding: $space-s;
}

.my-todos__header {
  text-align: center;
  font-size: $text-m;
  color: $color-burn;
  user-select: none;

  @include for-mobile {
    font-size: $text-s;
  }
}

.my-todos {
  margin-top: $space-s;
}

.my-todos__task {
  position: relative;
  margin-bottom: $space-xs;
  letter-spacing: 1px;
  user-select: none;

  &::before {
    position: absolute;
    content: '*';
    color: $color-burn-dark;
    font-size: $text-l;
    top: $space-xxs;
    left: -$space-s;
  }
}
</style>