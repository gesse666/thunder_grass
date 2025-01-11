<script setup lang="js">
import { TresCanvas } from '@tresjs/core';
import { useFieldStore } from './stores/fieldStore.js';
import { OrbitControls } from '@tresjs/cientos';

const fieldStore = useFieldStore();
fieldStore.initializeFields(5, 5); // Создаём 5x5 участков

const handleFieldClick = (fieldId) => {
  fieldStore.plantSeed(fieldId, 'dandelion'); // Сажаем семя
};

const nextStep = () => {
  fieldStore.growPlantsStep(); // Переход на следующий шаг
};
</script>

<template>
  <div>
    <button @click="nextStep" style="position: absolute; z-index: 10; top: 10px; left: 10px;">
      Следующий шаг
    </button>

    <TresCanvas clear-color="#82DBC5" window-size>
      <OrbitControls />

      <TresPerspectiveCamera
          :position="[0, 5, 10]"
          :look-at="[0, 0, 0]"
      />
      <!-- Участки -->
      <TresMesh
          v-for="field in fieldStore.fields"
          :key="field.id"
          :position="field.position"
          @click="() => handleFieldClick(field.id)"
      >
        <TresPlaneGeometry :args="[1, 1]" />
        <TresMeshBasicMaterial :color="field.color" />

        <!-- Растение -->
          <TresMesh
              v-if="field.plant"
              :position="[0, 0, 0.1]"
          :scale="[field.plant.size, field.plant.size, field.plant.size]"
          >
          <TresSphereGeometry />
          <TresMeshBasicMaterial color="yellow" />
        </TresMesh>
      </TresMesh>

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
