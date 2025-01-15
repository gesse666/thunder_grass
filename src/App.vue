<script setup lang="js">
import { TresCanvas } from '@tresjs/core';
import { useFieldStore } from './stores/fieldStore.js';
import { OrbitControls } from '@tresjs/cientos';
import Field from './components/Field.vue';

const fieldStore = useFieldStore();
fieldStore.initializeFields(10, 10);

const handleFieldClick = (fieldId) => {
  fieldStore.plantSeed(fieldId, 'dandelion');
};

const nextStep = () => {
  fieldStore.growPlantsStep();
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
