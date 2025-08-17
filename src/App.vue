<script setup lang="js">
import { computed, reactive, watch, ref } from 'vue';
import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import * as Tweakpane from 'tweakpane';
import { useGameStore } from './stores/gameStore.js';
import { useFieldStore } from './stores/fieldStore.js';
import Field from './components/Field.vue';
import InfoPanel from './components/InfoPanel.vue';
import FieldInfoPanel from './components/FieldInfoPanel.vue';
import Navigation from './components/Navigation.vue';
import DebugPage from './components/DebugPage.vue';

const fieldStore = useFieldStore();
const gameStore = useGameStore();

// Состояние текущей страницы
const currentPage = ref('game');

// Инициализация игры только если мы на игровой странице
if (currentPage.value === 'game') {
  gameStore.initializeGame(2, 2, ['Игрок 1']);
}

const selectedPlantType = ref('dandelion');

const handleFieldClick = (fieldId) => {
  gameStore.plantSeed(fieldId, selectedPlantType.value);
};

const handlePlantTypeChange = (type) => {
  selectedPlantType.value = type;
};

const nextStep = () => {
  gameStore.nextStep();
};

const currentPlayer = computed(() => gameStore.getCurrentPlayer());
const canPlant = computed(() => currentPlayer.value && !currentPlayer.value.planted);

const state = reactive({
  clearColor: '#c0ffee',
  wireframe: false
});

const pane = new Tweakpane.Pane();
pane.addBinding(state, 'clearColor');
pane.addBinding(state, 'wireframe');

// Отслеживание изменений для отладки
watch(() => state.clearColor, (newValue) => {
  console.log('clearColor changed:', newValue);
});
watch(() => state.wireframe, (newValue) => {
  console.log('wireframe changed:', newValue);
});

// Обработчик смены страницы
const handlePageChange = (page) => {
  currentPage.value = page;
  if (page === 'game' && !gameStore.players.length) {
    gameStore.initializeGame(2, 2, ['Игрок 1']);
  }
};
</script>

<template>
  <div>
    <Navigation :current-page="currentPage" @page-change="handlePageChange" />
    
    <!-- Игровая страница -->
    <div v-if="currentPage === 'game'" class="game-page">
      <InfoPanel @next-step="nextStep" @plant-type-change="handlePlantTypeChange" />
      <FieldInfoPanel :hovered-field="gameStore.getHoveredField" />
      <TresCanvas window-size :clear-color="state.clearColor">
        <OrbitControls />
        <TresPerspectiveCamera :position="[0, 4, 8]" :look-at="[0, 0, 0]" />
        
        <!-- Сетка для ориентации -->
        <TresGridHelper :args="[2, 2]" :position="[0, 0, 0]" />
        
        <!-- Оси координат -->
        <TresAxesHelper :args="[5]" :position="[0, 0, 0]" />
        
        <!-- Подписи осей -->
        <TresMesh :position="[6, 0, 0]">
          <TresPlaneGeometry :args="[0.3, 0.3]" />
          <TresMeshBasicMaterial color="red" />
        </TresMesh>
        <TresMesh :position="[0, 6, 0]">
          <TresPlaneGeometry :args="[0.3, 0.3]" />
          <TresMeshBasicMaterial color="green" />
        </TresMesh>
        <TresMesh :position="[0, 0, 6]">
          <TresPlaneGeometry :args="[0.3, 0.3]" />
          <TresMeshBasicMaterial color="blue" />
        </TresMesh>
        
        <Field
            v-for="field in fieldStore.fields"
            :key="field.id"
            :field="field"
            :onClick="canPlant ? () => handleFieldClick(field.id) : null"
            :onHover="fieldStore.setHoveredField"
            :onLeave="fieldStore.clearHoveredField"
        />
        <TresAmbientLight :intensity="2.0" />
      </TresCanvas>
    </div>
    
    <!-- Страница отладки -->
    <DebugPage v-if="currentPage === 'debug'" />
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.game-page {
  padding-top: 60px; /* Отступ для навигации */
}
</style>