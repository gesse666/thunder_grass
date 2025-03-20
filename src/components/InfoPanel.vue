<!-- components/InfoPanel.vue -->
<script setup lang="js">
import { computed } from 'vue';
import { useGameStore } from '../stores/gameStore.js';

const gameStore = useGameStore();

// Текущий игрок
const currentPlayer = computed(() => gameStore.getCurrentPlayer());
const emit = defineEmits(['next-step']);
</script>

<template>
  <div class="info_panel">
    <h3>Текущий игрок: {{ currentPlayer.name }}</h3>
    <p>Цвет: <span :style="{ color: currentPlayer.color }">■</span></p>
    <p>Растений: {{ currentPlayer.plants.length }}</p>
    <p>Состояние: {{ currentPlayer.planted ? 'Растение посажено' : 'Можно сажать' }}</p>
    <button @click="$emit('next-step')">Следующий шаг</button>
  </div>
</template>

<style>
.info_panel {
  position: absolute;
  z-index: 10;
  color: black;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
}
</style>