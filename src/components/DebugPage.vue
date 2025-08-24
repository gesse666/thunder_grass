<script setup lang="js">
import { ref, reactive, computed } from 'vue';
import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import * as Tweakpane from 'tweakpane';
import Dandelion from '../models/Dandelion.js';
import Clover from '../models/Clover.js';
import PlantComponent from './Plant.vue';

// Создаем тестовые растения
const testPlants = reactive({
  dandelion: new Dandelion(0),
  clover: new Clover(0)
});

// Названия стадий развития
const growthStageNames = {
  0: 'Укоренение',
  1: 'Росток',
  2: 'Растение',
  3: 'Бутон',
  4: 'Цветение',
  5: 'Плодоношение',
  6: 'Полностью созревшее растение'
};

// Состояние отладки
const debugState = reactive({
  selectedPlant: 'dandelion',
  growthStage: 0,
  size: 1.0,
  clearColor: '#87ceeb',
  wireframe: false,
  showGrid: true,
  showAxes: true,
  cameraPosition: [0, 5, 10],
  lightIntensity: 2.0
});

// Панель настроек
const pane = new Tweakpane.Pane({ title: 'Отладка растений' });

// Секция выбора растения
const plantFolder = pane.addFolder({ title: 'Растение' });
plantFolder.addBinding(debugState, 'selectedPlant', {
  options: {
    'Одуванчик': 'dandelion',
    'Клевер': 'clover'
  }
});

// Секция параметров роста
const growthFolder = pane.addFolder({ title: 'Параметры роста' });
growthFolder.addBinding(debugState, 'growthStage', {
  min: 0,
  max: 6,
  step: 1
});

growthFolder.addBinding(debugState, 'size', {
  min: 0.1,
  max: 3.0,
  step: 0.1
});

// Секция сцены
const sceneFolder = pane.addFolder({ title: 'Сцена' });
sceneFolder.addBinding(debugState, 'clearColor');
sceneFolder.addBinding(debugState, 'wireframe');
sceneFolder.addBinding(debugState, 'showGrid');
sceneFolder.addBinding(debugState, 'showAxes');
sceneFolder.addBinding(debugState, 'lightIntensity', {
  min: 0,
  max: 5,
  step: 0.1
});

// Кнопки управления
const controlsFolder = pane.addFolder({ title: 'Управление' });
controlsFolder.addButton({ title: 'Следующая стадия' }).on('click', () => {
  if (debugState.growthStage < 6) {
    debugState.growthStage++;
  }
});

controlsFolder.addButton({ title: 'Предыдущая стадия' }).on('click', () => {
  if (debugState.growthStage > 0) {
    debugState.growthStage--;
  }
});

controlsFolder.addButton({ title: 'Сбросить' }).on('click', () => {
  debugState.growthStage = 0;
  debugState.size = 1.0;
  debugState.selectedPlant = 'dandelion';
  // Сбрасываем тестовые растения
  testPlants.dandelion = new Dandelion(0);
  testPlants.clover = new Clover(0);
});

// Вычисляемое растение для отображения
const currentPlant = computed(() => {
  const plant = testPlants[debugState.selectedPlant];
  plant.growthStage = debugState.growthStage;
  plant.size = debugState.size;
  return plant;
});

// Информация о растении
const plantInfo = computed(() => {
  const plant = currentPlant.value;
  return {
    type: plant.type,
    growthStage: plant.growthStage,
    maxGrowthStage: plant.maxGrowthStage,
    growthStageName: growthStageNames[plant.growthStage] || 'Неизвестно',
    size: plant.size,
    isFullyGrown: plant.isFullyGrown(),
    heightOffset: plant.getHeightOffset(),
    position: plant.getPosition()
  };
});
</script>

<template>
  <div class="debug-page">
    <!-- Информационная панель -->
    <div class="info-panel">
      <h2>Отладка моделей растений</h2>
      <div class="plant-info">
        <h3>Текущее растение:</h3>
        <p><strong>Тип:</strong> {{ plantInfo.type }}</p>
        <p><strong>Стадия роста:</strong> {{ plantInfo.growthStage }} / {{ plantInfo.maxGrowthStage }}</p>
        <p><strong>Название стадии:</strong> {{ plantInfo.growthStageName }}</p>
        <p><strong>Размер:</strong> {{ plantInfo.size.toFixed(1) }}</p>
        <p><strong>Полностью выросло:</strong> {{ plantInfo.isFullyGrown ? 'Да' : 'Нет' }}</p>
        <p><strong>Высота смещения:</strong> {{ plantInfo.heightOffset.toFixed(2) }}</p>
        <p><strong>Позиция:</strong> [{{ plantInfo.position[0].toFixed(2) }}, {{ plantInfo.position[1].toFixed(2) }}, {{ plantInfo.position[2].toFixed(2) }}]</p>
      </div>
      
      <div class="axes-info">
        <h3>Оси координат:</h3>
        <p><span style="color: red;">🔴 X</span> - горизонтальная ось</p>
        <p><span style="color: green;">🟢 Y</span> - вертикальная ось</p>
        <p><span style="color: blue;">🔵 Z</span> - глубина</p>
      </div>
    </div>

    <!-- 3D сцена -->
    <TresCanvas window-size :clear-color="debugState.clearColor">
      <OrbitControls />
      <TresPerspectiveCamera :position="debugState.cameraPosition" :look-at="[0, 0, 0]" />
      
              <!-- Сетка для ориентации -->
        <TresGridHelper v-if="debugState.showGrid" :args="[2, 2]" />
        
        <!-- Оси координат -->
        <TresAxesHelper v-if="debugState.showAxes" :args="[5]" />
        
        <!-- Подписи осей -->
        <TresMesh v-if="debugState.showAxes" :position="[6, 0, 0]">
          <TresPlaneGeometry :args="[0.3, 0.3]" />
          <TresMeshBasicMaterial color="red" />
        </TresMesh>
        <TresMesh v-if="debugState.showAxes" :position="[0, 6, 0]">
          <TresPlaneGeometry :args="[0.3, 0.3]" />
          <TresMeshBasicMaterial color="green" />
        </TresMesh>
        <TresMesh v-if="debugState.showAxes" :position="[0, 0, 6]">
          <TresPlaneGeometry :args="[0.3, 0.3]" />
          <TresMeshBasicMaterial color="blue" />
        </TresMesh>
      
      <!-- Тестовое растение -->
      <TresGroup :position="[0, 0, 0]">
        <PlantComponent :plant="currentPlant" />
      </TresGroup>

      <!-- Освещение -->
      <TresAmbientLight :intensity="debugState.lightIntensity" />
      <TresDirectionalLight :position="[5, 5, 5]" :intensity="1.0" />
    </TresCanvas>
  </div>
</template>

<style scoped>
.debug-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.info-panel {
  position: absolute;
  top: 120px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
  max-width: 300px;
}

.info-panel h2 {
  margin: 0 0 15px 0;
  font-size: 18px;
}

.info-panel h3 {
  margin: 10px 0 5px 0;
  font-size: 14px;
}

.plant-info p {
  margin: 5px 0;
  font-size: 12px;
}

.axes-info {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.axes-info h3 {
  margin: 10px 0 5px 0;
  font-size: 14px;
}

.axes-info p {
  margin: 5px 0;
  font-size: 12px;
}

/* Стили для Tweakpane */
:deep(.tp-dfwv) {
  z-index: 1001;
}
</style>
