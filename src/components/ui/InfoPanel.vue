<!-- components/InfoPanel.vue -->
<script setup lang="js">
import { computed, ref } from 'vue';
import { useGameStore } from '../../stores/gameStore.js';

const gameStore = useGameStore();

// Текущий игрок
const currentPlayer = computed(() => gameStore.getCurrentPlayer());
const selectedPlantType = ref('dandelion');

const emit = defineEmits(['next-step', 'plant-type-change']);

const handlePlantTypeChange = (type) => {
  selectedPlantType.value = type;
  emit('plant-type-change', type);
};
</script>

<template>
  <div class="info_panel">
    <h3>Текущий игрок: {{ currentPlayer.name }}</h3>
    <p>Цвет: <span :style="{ color: currentPlayer.color }">■</span></p>
    <p>Растений: {{ currentPlayer.plants.length }}</p>
    <p>Состояние: {{ currentPlayer.planted ? 'Растение посажено' : 'Можно сажать' }}</p>
    
    <!-- Выбор типа растения -->
    <div class="plant-selector" v-if="!currentPlayer.planted">
      <h4>Выберите растение:</h4>
      <div class="plant-options">
        <button 
          class="plant-option" 
          :class="{ active: selectedPlantType === 'dandelion' }"
          @click="handlePlantTypeChange('dandelion')"
        >
          🌼 Одуванчик
        </button>
        <button 
          class="plant-option" 
          :class="{ active: selectedPlantType === 'clover' }"
          @click="handlePlantTypeChange('clover')"
        >
          ☘️ Клевер
        </button>
      </div>
    </div>
    
    <button @click="$emit('next-step')">Следующий шаг</button>
  </div>
</template>

<style>
.info_panel {
  position: absolute;
  z-index: 10;
  color: black;
  top: 120px;
  left: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  min-width: 250px;
}

.plant-selector {
  margin: 10px 0;
}

.plant-selector h4 {
  margin: 5px 0;
  font-size: 14px;
}

.plant-options {
  display: flex;
  gap: 5px;
  margin: 5px 0;
}

.plant-option {
  flex: 1;
  padding: 8px;
  border: 2px solid #ddd;
  border-radius: 5px;
  background: white;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.plant-option:hover {
  border-color: #4CAF50;
  background: #f0f8f0;
}

.plant-option.active {
  border-color: #4CAF50;
  background: #4CAF50;
  color: white;
}
</style>