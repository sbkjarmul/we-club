<script setup lang="ts">
import Header from '@/components/Header.vue'
import MobileMenu from '@/components/MobileMenu.vue'
import { onMounted, ref, watch } from 'vue';
import { useUserStore } from '@/stores/userStore';

const isMobileMenuOpen = ref(false)

onMounted(() => {
  const userStore = useUserStore()

  const { getUserInfo } = userStore

  getUserInfo()
})

function toggleMobileMenuHandler() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

watch(isMobileMenuOpen, (prevValue, nextValue) => {
  if (!nextValue) {
    blockScroll()
  } else {
    unblockScroll()
  }
})

function blockScroll() {
  const body = document.querySelector('body')
  if (body) {
    body.style.position = 'fixed'
  }
}

function unblockScroll() {
  const body = document.querySelector('body')
  if (body) {
    body.style.position = 'unset'
  }
}
</script>

<template>
  <Header @toggleMobileMenu="toggleMobileMenuHandler" />
  <MobileMenu :isOpen="isMobileMenuOpen" @close="toggleMobileMenuHandler" />
  <section class="page__wrapper home">
    <div class="container">
      <router-view></router-view>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.home {
  background-color: $color-dark-hover;
  padding-bottom: $space-s;
  min-height: (max(100vh - $headerHeight));
  height: fit-content;
}
</style>
