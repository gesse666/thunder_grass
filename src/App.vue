<script setup lang="js">
import { TresCanvas } from '@tresjs/core';
import { useFieldStore } from './stores/fieldStore.js';
import { usePlayerStore } from './stores/playerStore.js';
import { OrbitControls } from '@tresjs/cientos';
import Field from './components/Field.vue';
import { computed } from 'vue';

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
    <div style="position: absolute; z-index: 10; top: 10px; left: 10px; background: rgba(255, 255, 255, 0.8); padding: 10px; border-radius: 5px;">
      <h3>Текущий игрок: {{ currentPlayer.name }}</h3>
      <p>Цвет: <span :style="{ color: currentPlayer.color }">■</span></p>
      <p>Растений: {{ currentPlayer.plants.length }}</p>
      <button @click="nextStep">Следующий шаг</button>
    </div>

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