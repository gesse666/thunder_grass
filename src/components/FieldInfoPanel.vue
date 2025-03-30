<!-- components/FieldInfoPanel.vue -->
<template>
  <div v-if="fieldInfo" class="field-info-panel">
    <h3>Информация о поле</h3>
    <p>Тип почвы: <span :style="{ color: soilColor }">{{ fieldInfo.soilType }}</span></p>
    <p>Плодородие: {{ fieldInfo.fertility }}</p>
    <p>Влажность: {{ fieldInfo.moisture }}%</p>
    <p>Растение: {{ fieldInfo.plant }}</p>
    <p>Стадия роста: {{ fieldInfo.growthStage }}</p>
    <p>Владелец: {{ fieldInfo.owner }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/gameStore.js';

const props = defineProps({
  hoveredField: Object, // Подсвеченное поле
});

const gameStore = useGameStore();

// Информация о поле
const fieldInfo = computed(() => {
  if (!props.hoveredField) return null;
  const field = props.hoveredField;
  return {
    soilType: field.soilType,
    fertility: field.fertility.toFixed(1),
    moisture: field.moisture.toFixed(1),
    plant: field.plant ? field.plant.type : 'Нет растения',
    growthStage: field.plant ? field.plant.growthStage.toFixed(2) : '—',
    owner: field.playerId ? `Игрок ${field.playerId}` : 'Нет владельца',
  };
});

// Цвет почвы для отображения
const soilColor = computed(() => {
  if (!props.hoveredField) return '#FFFFFF';
  return props.hoveredField.color;
});
</script>

<style>
.field-info-panel {
  position: absolute;
  z-index: 10;
  color: black;
  top: 10px;
  right: 10px; /* Справа, чтобы не перекрывать InfoPanel */
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  min-width: 200px;
}
</style>