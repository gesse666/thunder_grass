<!-- components/InfoPanel.vue -->
<script setup lang="js">
import { computed } from 'vue';
import { usePlayerStore } from '../stores/playerStore.js';

const playerStore = usePlayerStore();

// Текущий игрок
const currentPlayer = computed(() => playerStore.getCurrentPlayer());

// Следующий шаг
const nextStep = () => {
  // Вызов метода nextStep из хранилища или через emit
  emit('next-step');
};

// Если nextStep вызывается из родительского компонента, используем emit
const emit = defineEmits(['next-step']);
</script>

<template>
  <div class="info_panel">
  <h3>Текущий игрок: {{ currentPlayer.name }}</h3>
    <p>Цвет: <span :style="{ color: currentPlayer.color }">■</span></p>
    <p>Растений: {{ currentPlayer.plants.length }}</p>
    <button @click="nextStep">Следующий шаг</button>
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