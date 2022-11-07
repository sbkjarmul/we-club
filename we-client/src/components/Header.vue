<script setup lang="ts">
import * as content from '@/assets/content.json'
import { useUserStore } from '@/stores/UserStore';
import { useRouter } from "vue-router";

const emit = defineEmits(['toggleMobileMenu'])

const headerContent = content.components.header
const userStore = useUserStore()
const router = useRouter()
const { logOut } = userStore

function logoutHandler() {
  logOut()
  router.push('/login')
}

function logoClickHandler() {
  router.push('/')
}

function burgerClickHandler() {
  emit('toggleMobileMenu')
}
</script>
   
<template>
  <div class="header__wrapper">
    <div class="container">
      <header class="header">
        <div class="header__logo" @click="logoClickHandler">
          <img src="@/assets/images/logo.png" :alt="headerContent.logoAlt" />
        </div>

        <div class="header__navbar">
          <router-link to="/dashboard" class="header__link">
            {{ headerContent.home }}
          </router-link>
          <router-link to="/xmass" class="header__link">
            {{ headerContent.tasks }}
          </router-link>
        </div>

        <div class="header__navbar">
          <div class="header__nickname">
            <img src="@/assets/icons/retro-user.svg" class="header__nickname__img" :alt="headerContent.logoAlt" />
            <span class="header__nick">
              {{ userStore.getUserNickName }}
            </span>
          </div>
          <button class="header__logout" @click="logoutHandler">
            {{ headerContent.logOut }}
          </button>
        </div>

        <div class="header__burger" @click="burgerClickHandler">
          <div class="header__burger__line"></div>
        </div>

      </header>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header__wrapper {
  width: 100%;
  position: sticky;
  background: $color-dark-hover;
  color: $color-light;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    min-height: $headerHeight;

    .header__logo {
      height: $logoHeight;
      user-select: none;

      img {
        height: 100%;
        object-fit: cover;
      }
    }

    .header__navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;

      @include for-mobile {
        display: none;
      }
    }

    .header__burger {
      display: none;
      cursor: pointer;
      user-select: none;

      .header__burger__line {
        position: relative;
        width: 30px;
        height: 3px;
        background: $color-light;

        &::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 0;
          width: 30px;
          height: 3px;
          background: $color-light;
        }

        &::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 30px;
          height: 3px;
          background: $color-light;
        }
      }

      @include for-mobile {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 30px;
        height: 30px;
      }
    }

    .header__logout {
      @include for-mobile {
        font-size: $text-xs;
      }

      margin-left: $space-s;
      background: none;
      color: $color-light;
      font-size: $text-s;

      &:hover {
        color: $color-burn;
      }
    }

    .header__nickname {
      display: flex;
      justify-content: center;
      align-items: center;

      .header__nickname__img {
        @include for-mobile {
          height: 15px;
        }

        height: 30px;
      }

      .header__nick {
        @include for-mobile {
          font-size: $text-xs;
        }

        margin-left: $space-xs;
      }
    }

    .header__link {
      color: $color-light;
      margin-right: $space-s;

      &:hover {
        color: $color-burn;
      }

      &.router-link-active {
        color: $color-burn;
      }
    }
  }

  .header__mobile-menu {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
}
</style>
