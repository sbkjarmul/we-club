<script setup lang="ts">
import Lotery from '@/components/Lotery.vue'
import Block from '@/components/Block.vue'
import MyTodos from '@/components/MyTodos.vue'

</script>

<template>
  <section class="dashboard">
    <Block>
      <Lotery />
    </Block>
    <Block>
      <MyTodos />
    </Block>
  </section>
</template>

<style lang="scss" scoped>
.dashboard {
  background-color: $color-dark-hover;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(auto, 1fr);
  grid-column-gap: $block-gap;
  grid-row-gap: $block-gap;

  @include for-desktop {
    grid-template-columns: repeat(2, 2fr);
  }
}
</style>
