<script lang="ts" setup>
import * as content from '@/assets/content.json'
import Block from '@/components/Block.vue'
import { NickNames } from '@/enum/nick-name.enum';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const todoContent = content.components.todo
const props = defineProps(['todo', 'isMyTodo'])
const emit = defineEmits(['assignTodo', 'unassignTodo', 'removeTodo'])

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const assignTodoHandler = (todoId: number) => {
  emit('assignTodo', todoId)
}

const unassignTodoHandler = (todoId: number) => {
  emit('unassignTodo', todoId)
}

const removeTodoHandler = (todoId: number) => {
  emit('removeTodo', todoId)
}

const classObject = computed(() => ({
  'color-sbk': props.todo.assigned === NickNames.SBK,
  'color-suchy': props.todo.assigned === NickNames.SUCHY,
  'color-krycha': props.todo.assigned === NickNames.KRYCHA,
  'color-ozia': props.todo.assigned === NickNames.OZIA,
  'color-radek': props.todo.assigned === NickNames.RADEK,
  'color-mati': props.todo.assigned === NickNames.MATI,
  'color-zabek': props.todo.assigned === NickNames.ZABEK,
  'color-marcin': props.todo.assigned === NickNames.MARCIN,
  'color-piter': props.todo.assigned === NickNames.PITER,
  'color-cichy': props.todo.assigned === NickNames.CICHY,
  'color-rafcio': props.todo.assigned === NickNames.RAFCIO,
}))
</script>

<template>
  <Block class="todo__wrapper" :class="classObject">
    <p class="todo__description">{{ props.todo.description }}</p>
    <div class="todo__footer" :class="{ 'todo__footer--my-todo': isMyTodo }">
      <span class="todo__asigned">
        {{ todoContent.assigned }}
        <span class="todo__username" :class="classObject">
          {{ props.todo.assigned }}
        </span>
      </span>
      <div class="todo__buttons__wrapper" v-if="!isMyTodo">
        <button class="todo__button" @click="assignTodoHandler(todo.id)" v-if="todo.assigned !== user.nickName">{{
            todoContent.assignToYou
        }}</button>
        <button class="todo__button" @click="unassignTodoHandler(todo.id)" v-else>{{ todoContent.unassign }}</button>
        <button class="todo__button" @click="removeTodoHandler(todo.id)">{{ todoContent.delete }}</button>
      </div>
    </div>
  </Block>
</template>

<style lang="scss" scoped>
.todo__wrapper {
  position: relative;
  user-select: none;

  &:hover {
    .todo__buttons__wrapper {
      display: block;
    }
  }

  &.color-sbk {
    border-color: $color-sbk;
  }

  &.color-suchy {
    border-color: $color-suchy;
  }

  &.color-zabek {
    border-color: $color-zabek;
  }

  &.color-krycha {
    border-color: $color-krycha;
  }

  &.color-ozia {
    border-color: $color-ozia;
  }

  &.color-radek {
    border-color: $color-radek;
  }

  &.color-marcin {
    border-color: $color-marcin;
  }

  &.color-mati {
    border-color: $color-mati;
  }

  &.color-piter {
    border-color: $color-piter;
  }

  &.color-rafcio {
    border-color: $color-rafcio;
  }

  &.color-cichy {
    border-color: $color-cichy;
  }
}

.todo__description {
  @include for-mobile {
    font-size: $text-s;
  }

  font-size: $text-m;
  letter-spacing: 2px;
}

.todo__asigned {
  @include for-mobile {
    font-size: $text-xxs;
  }

  color: $color-block-text;
  letter-spacing: 2px;
  font-size: $text-xs;
  height: $space-s;
}

.todo__username {
  &.color-sbk {
    color: $color-sbk;
  }

  &.color-suchy {
    color: $color-suchy;
  }

  &.color-zabek {
    color: $color-zabek;
  }

  &.color-krycha {
    color: $color-krycha;
  }

  &.color-ozia {
    color: $color-ozia;
  }

  &.color-radek {
    color: $color-radek;
  }

  &.color-marcin {
    color: $color-marcin;
  }

  &.color-mati {
    color: $color-mati;
  }

  &.color-piter {
    color: $color-piter;
  }

  &.color-rafcio {
    color: $color-rafcio;
  }

  &.color-cichy {
    color: $color-cichy;
  }
}

.todo__footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @include for-mobile {
    padding-bottom: $space-s;
  }

  &.todo__footer--my-todo {
    padding-bottom: 0
  }
}

.todo__buttons__wrapper {
  position: absolute;
  bottom: $space-xs;
  right: $space-xs;
  display: none;
  height: $space-s;

  @include for-mobile {
    display: block;
  }
}

.todo__button {
  width: fit-content;
  padding: $space-xxs;
  background-color: transparent;
  color: $color-light-secondary;

  &:hover {
    color: $color-light;
  }
}
</style>