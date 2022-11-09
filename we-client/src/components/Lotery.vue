<script setup lang="ts">
import * as content from '@/assets/content.json'
import { useLoteryStore } from '@/stores/loteryStore';
import { storeToRefs } from 'pinia';
import { onMounted, Ref, ref } from 'vue';

const loteryContent = content.components.lotery

const isLoteryResultShown: Ref<boolean> = ref(false)

const LoteryStore = useLoteryStore()
const { drawnUser } = storeToRefs(LoteryStore)
const { draw, getDrawnUser } = LoteryStore

onMounted(() => {
  getDrawnUser()
})

function handleDrawButtonClick() {
  draw()
  toggleResult()
}

function toggleResult() {
  isLoteryResultShown.value = !isLoteryResultShown.value
}

function handleLoteryResultClicked() {
  toggleResult()
}


</script>

<template>
  <section class="lotery__wrapper">
    <div class="lotery__image__wrapper">
      <img class="lotery__image" src="@/assets/images/pixel-santa-hat.png" />
    </div>
    <div class="lotery" v-if="!drawnUser">
      <h1 class="lotery__header">{{ loteryContent.loteryHeader }}</h1>
      <p class="lotery__description">
        {{ loteryContent.rules }}
      </p>
      <button class="lotery__button" @click="handleDrawButtonClick">{{ loteryContent.drawButton }}</button>
    </div>
    <div class="lotery lotery__clickable" v-else @click="handleLoteryResultClicked">
      <div class="lotery__result__wrapper" v-show="isLoteryResultShown">
        <h2 class="lotery__result">
          {{ drawnUser.firstName }} {{ drawnUser.lastName }}
        </h2>
        <p class="lotery__result__description">{{ loteryContent.clickTohide }}</p>
      </div>
      <h2 class="lotery__result" v-show="!isLoteryResultShown">
        {{ loteryContent.showResult }}
      </h2>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.lotery__wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 100%;

  @include for-desktop {
    margin: $space-s;
  }
}

.lotery {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  min-height: 150px;
}

.lotery__header {
  @include for-mobile {
    font-size: $text-s;
  }

  font-size: $text-l;
  text-align: start;
  margin: $space-xs;
  line-height: $text-l;
}

.lotery__result {
  text-align: center;
  font-size: $text-l;
  line-height: calc($text-l + $text-s);
  height: 100%;
  color: $color-light;
  user-select: none;
  width: 100%;
}

.lotery__result__wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  user-select: none;
}

.lotery__result__description {
  color: $color-block-text;
  margin-top: $space-xxs;
  user-select: none;
  text-align: center;
}

.lotery__description {
  font-size: $text-xs;
  margin: $space-xs;
}

.lotery__button {
  background: $color-dark;
  color: $color-light;
  padding: $space-xs $space-l;
  font-size: $text-s;
  font-weight: 600;
  margin: $space-xs;
  border: 3px double $color-dark-hover;

  @include for-mobile {
    width: 100%;
    padding: $space-xs;
    margin: 0;
    margin-top: $space-s;
  }

  &:hover {
    background: $color-dark-hover;
    border: 3px double $color-block-text;
    color: $color-light;
  }
}

.lotery__clickable {
  cursor: pointer;
}

.lotery__image__wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: $space-s;
}

.lotery__image {
  @include for-mobile {
    width: 100px;
    height: 80px;
  }

  width: 200px;
  height: 160px;
}
</style>
