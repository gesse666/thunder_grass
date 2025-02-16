<script setup lang="js">
import { computed } from 'vue';

import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';

import { useGameStore } from './stores/gameStore.js';
import { useFieldStore } from './stores/fieldStore.js';

import Field from './components/Field.vue';
import InfoPanel from './components/InfoPanel.vue';

const fieldStore = useFieldStore();
const gameStore = useGameStore();

// Инициализация игры
gameStore.initializeGame(10, 10, ['Игрок 1', 'Игрок 2']);

console.log(gameStore);
console.log('gameStore');

// Обработка кликов
const handleFieldClick = (fieldId) => {
  gameStore.plantSeed(fieldId, 'dandelion');
};

// Следующий шаг
const nextStep = () => {
  gameStore.nextStep();
};
</script>

<template>
  <div>
    <!-- Панель информации -->
    <InfoPanel @next-step="nextStep" />

    <!-- 3D-сцена -->
    <TresCanvas clear-color="#82DBC5" window-size>
      <OrbitControls />

      <TresPerspectiveCamera
          :position="[0, 5, 10]"
          :look-at="[0, 0, 0]"
      />

      <!-- Участки -->
      <Field
          v-for="field in fieldStore.fields"
          :key="field.id"
          :field="field"
          :onClick="() => handleFieldClick(field.id)"
      />

      <!-- Освещение -->
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>