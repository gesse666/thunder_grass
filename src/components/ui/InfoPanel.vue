<!-- components/InfoPanel.vue -->
<script setup lang="js">
import { computed, ref } from 'vue';

import { useGameStore } from '../../stores/gameStore.js';
import { useFieldStore} from "../../stores/fieldStore.js";

const gameStore = useGameStore();
const fieldStore = useFieldStore();

// Текущий игрок
const currentPlayer = computed(() => gameStore.getCurrentPlayer());
const selectedPlantType = ref('dandelion');

// Получаем список растений текущего игрока
const playerPlants = computed(() => {
  const playerId = currentPlayer.value.id;
  return fieldStore.fields
      .filter(field => field.plant && field.playerId === playerId)
      .map(field => ({
        fieldId: field.id,
        plant: field.plant,
        soilType: field.soilType,
        position: field.position
      }));
});

// Запуск экстра-способности растения
const usePlantAbility = async (fieldId) => {
  const result = fieldStore.usePlantAbility(fieldId, currentPlayer.value.id);

  if (result.success) {
    console.log('Способность использована успешно:', result);
  } else {
    console.warn(`Способность недоступна: ${result.reason}`);
  }
};

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

    <div class="plants-list" v-if="playerPlants.length > 0">
      <h4>Ваши растения:</h4>
      <div class="plant-items">
        <div
            v-for="plantData in playerPlants"
            :key="plantData.fieldId"
            class="plant-item"
        >
          <div class="plant-info">
            <span class="plant-icon">
              {{ plantData.plant.type === 'dandelion' ? '🌼' : '☘️' }}
            </span>
            <div class="plant-details">
              <div class="plant-name">
                {{ plantData.plant.type === 'dandelion' ? 'Одуванчик' : 'Клевер' }}
              </div>
              <div class="plant-stage">
                {{ plantData.plant.getCurrentStageName() }}
              </div>
            </div>
          </div>

          <!-- Кнопка экстра-способности - теперь просто вызываем метод растения -->
          <button
              v-if="plantData.plant.isAbilityReady()"
              class="ability-button"
              @click="usePlantAbility(plantData.fieldId)"
              :title="`Использовать способность: ${plantData.plant.getAbilityName()}`"
          >
            {{ plantData.plant.getAbilityName() }}
          </button>
          <span v-else class="ability-disabled">
            Способность недоступна
          </span>
        </div>
      </div>

    <button @click="$emit('next-step')">Следующий шаг</button>
  </div>

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