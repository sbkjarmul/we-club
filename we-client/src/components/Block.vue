<script setup lang="ts">
</script>

<template>
  <div class="block">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.block {
  position: relative;
  width: 100%;
  height: fit-content;
  background-color: $color-block;
  color: $color-light;

  padding: $space-s;

  -webkit-box-shadow: $block-shadow;
  -moz-box-shadow: $block-shadow;
  box-shadow: $block-shadow;

  border: 4px double $color-block-text;

  @include for-not-mobile {
    &:hover {
      border: 4px double $color-burn;
    }
  }
}
</style>