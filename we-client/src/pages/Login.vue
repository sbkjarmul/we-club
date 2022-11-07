<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore';
import * as content from '@/assets/content.json'
import { WeMember } from '@/models/we-member.model';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const email = ref('')
const password = ref('')

const loginContent = content.components.login

const userStore = useUserStore()
const { loginError } = storeToRefs(userStore)
const { logIn } = userStore

function handleLogin() {
  const user: WeMember = {
    email: email.value,
    password: password.value,
  }

  logIn(user)
}
</script>
   
<template>
  <section class="page__wrapper login__wrapper">
    <div class="container">
      <div class="login__panel">
        <img class="login__picture" src="@/assets/images/logo.png" />

        <div class="login__fields">
          <label for="email" class="login__label" :class="{ 'error': loginError }">Email</label>
          <input type="email" v-model="email" name="email" class="login__input" :class="{ 'error': loginError }" />

          <label for="password" class="login__label" :class="{ 'error': loginError }">Haslo</label>
          <input type="password" v-model="password" name="password" class="login__input"
            :class="{ 'error': loginError }" />
        </div>

        <button type="submit" class="login__button" @click="handleLogin">
          {{ loginContent.logIn }}
        </button>

        <span class="login__error" v-show="loginError">Podales zle passy... Skup sie byku!</span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.login__wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/images/bg.jpeg');
  background-color: rgb(37, 19, 19);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
}

.login__panel {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 400px;
  width: 100%;
  height: 100%;
  padding: $space-m;
  background: transparent;
  border-radius: 25px;
  margin: auto;

  background: rgba(35, 4, 4, 0.15);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.3px);
  -webkit-backdrop-filter: blur(10.3px);
  border: 5px double rgba(212, 8, 8, 0.487);

  @include for-mobile {
    padding: 0;
    border: 5px double transparent;
    background: transparent;
    border-radius: 16px;
    box-shadow: none;
    backdrop-filter: none;
    padding-bottom: $space-m;
  }
}

.login__picture {
  width: 200px;
  margin: 0 $space-xs 0 0;
  user-select: none;
}

.login__button {
  background: $color-burn;
  color: $color-light;
  border-radius: 50px;
  padding: $space-xs;
  font-size: $text-s;
  font-weight: 600;
  width: 100%;
  user-select: none;

  &:hover {
    background: rgb(168, 7, 28);
    color: $color-light;
  }
}

.login__fields {
  margin: $space-s 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
}

.login__error {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;

  text-align: center;

  font-size: $text-xs;
  color: $color-burn;
  margin: $space-xs 0;
}

.login__input {
  margin-bottom: $space-xs;
  background: $color-dark;
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
    -webkit-box-shadow: 0 0 0 30px $color-dark inset !important;
  }

  &:-webkit-autofill {
    -webkit-text-fill-color: $color-burn !important;
  }

  &.error {
    border: 1px solid $color-burn;
  }

  &:focus {
    border: 1px solid $color-light;
  }
}

.login__label {
  font-size: $text-xs;
  color: $color-light;
  user-select: none;

  &.error {
    color: $color-burn;
  }
}
</style>
