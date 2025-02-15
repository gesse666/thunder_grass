<script setup lang="js">
import { computed } from 'vue';

import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';

import { useFieldStore } from './stores/fieldStore.js';
import { usePlayerStore } from './stores/playerStore.js';

import Field from './components/Field.vue';
import InfoPanel from './components/InfoPanel.vue'; // Импортируем InfoPanel

const fieldStore = useFieldStore();
const playerStore = usePlayerStore();

// Инициализация
fieldStore.initializeFields(10, 10);
const player1 = playerStore.addPlayer('Игрок 1');
const player2 = playerStore.addPlayer('Игрок 2');

// Текущий игрок
const currentPlayer = computed(() => playerStore.getCurrentPlayer());

// Обработка кликов
const handleFieldClick = (fieldId) => {
  fieldStore.plantSeed(fieldId, 'dandelion', currentPlayer.value.id);
};

// Следующий шаг
const nextStep = () => {
  fieldStore.growPlantsStep();
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