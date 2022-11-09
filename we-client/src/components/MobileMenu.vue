<script lang="ts" setup>
import * as content from '@/assets/content.json'
import { NickNames } from '@/enum/nick-name.enum';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRouter } from "vue-router";

const { isOpen } = defineProps(['isOpen'])
const emit = defineEmits(['close'])

const menuContent = content.components.header
const userStore = useUserStore()
const router = useRouter()
const { logOut } = userStore
const { user } = storeToRefs(userStore)

function logoutHandler() {
  logOut()
  closeClickHandler()
  router.push('/login')
}

function closeClickHandler() {
  emit('close')
}

const classObject = computed(() => ({
  'color-sbk': user.value.nickName === NickNames.SBK,
  'color-suchy': user.value.nickName === NickNames.SUCHY,
  'color-krycha': user.value.nickName === NickNames.KRYCHA,
  'color-ozia': user.value.nickName === NickNames.OZIA,
  'color-radek': user.value.nickName === NickNames.RADEK,
  'color-mati': user.value.nickName === NickNames.MATI,
  'color-zabek': user.value.nickName === NickNames.ZABEK,
  'color-marcin': user.value.nickName === NickNames.MARCIN,
  'color-piter': user.value.nickName === NickNames.PITER,
  'color-cichy': user.value.nickName === NickNames.CICHY,
  'color-rafcio': user.value.nickName === NickNames.RAFCIO,
}))
</script>

<template>
  <div class="menu__wrapper" v-if="isOpen">
    <div class="menu">
      <div class="menu__navbar">
        <div class="menu__nickname">
          <img src="@/assets/icons/retro-user.svg" class="menu__nickname__img" :alt="menuContent.logoAlt" />
          <span class="menu__nick" :class="classObject">
            {{ userStore.getUserNickName }}
          </span>
        </div>
        <div class="menu__links">
          <router-link to="/" class="menu__link" @click="closeClickHandler">
            {{ menuContent.home }}
          </router-link>
          <router-link to="/xmass" class="menu__link" @click="closeClickHandler">
            {{ menuContent.tasks }}
          </router-link>
        </div>
        <button class="menu__logout" @click="logoutHandler">
          {{ menuContent.logOut }}
        </button>
      </div>
    </div>

    <button class="menu__close-button" @click="closeClickHandler">X</button>
  </div>
</template>

<style lang="scss">
.menu__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background: $color-dark-hover;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.menu {
  position: relative;
  width: 100%;
  height: 100%;
  padding: $space-l $space-s;
}

.menu__navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

.menu__nickname {
  max-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;
}

.menu__nickname__img {
  height: 50px;
  margin-bottom: $space-xs;
}

.menu__link {
  margin: $space-s 0;
  font-size: $text-l;
  color: $color-light;
  text-align: center;
  user-select: none;

  &:visited {
    color: $color-light;
  }
}

.menu__links {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-bottom: $space-m;
}

.menu__logout {
  margin: $space-s 0;
  font-size: $text-s;
  text-align: center;
  background: none;
  color: $color-light;
}

.menu__nick {
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
    border-color: $color-cichy;
  }
}

.menu__close-button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 11;
  border: none;
  background: none;
  font-size: $text-l;
  color: $color-light;
  padding: $space-s;
}
</style>