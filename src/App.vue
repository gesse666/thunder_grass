<script setup lang="js">
import { TresCanvas } from '@tresjs/core';
import { ref } from 'vue';

import { usePlaneStore } from './stores/planeStore';
const planeStore = usePlaneStore();

import { useFieldStore } from './stores/fieldStore';
const fieldStore = useFieldStore();
fieldStore.initializeFields(5, 5); // Создаём 5x5 участков

const handleFieldClick = (id) => {
  const field = fieldStore.fields.find((f) => f.id === id);
  if (field) {
    // Пример изменения свойств
    const newFertility = Math.min(100, field.fertility + 10);
    const newMoisture = Math.min(100, field.moisture + 5);
    fieldStore.updateField(id, newFertility, newMoisture, field.soilType);
  }
};

// const planeColor = ref('blue');

const handlePlaneClick = (id, currentColor) => {
  const newColor = currentColor === 'blue' ? 'red' : 'blue';
  planeStore.updatePlaneColor(id, newColor);
};
</script>

<template>
  <TresCanvas
      clear-color="#82DBC5"
      window-size
  >
     Камера
<!--    <TresPerspectiveCamera-->
    <TresPerspectiveCamera
        :position="[3, 20, 3]"
        :look-at="[0, 0, 0]"
        :zoom="1"
    />

    <!-- Камера: вид сверху -->
<!--    <TresOrthographicCamera-->
<!--        :position="[0, 5, 0]"-->
<!--        :look-at="[0, 0, 0]"-->
<!--        :zoom="20"-->
<!--    />-->


    <!--    &lt;!&ndash; Плоскости &ndash;&gt;-->
<!--    <TresMesh-->
<!--        v-for="plane in planeStore.planes"-->
<!--        :key="plane.id"-->
<!--        :position="plane.position"-->
<!--        @click="() => handlePlaneClick(plane.id, plane.color)"-->
<!--    >-->
<!--      <TresPlaneGeometry :args="[1, 1]" />-->
<!--      <TresMeshBasicMaterial :color="plane.color" />-->
<!--    </TresMesh>-->


    <!-- Участки -->
    <TresMesh
        v-for="field in fieldStore.fields"
        :key="field.id"
        :position="field.position"
        @click="() => handleFieldClick(field.id)"
    >
      <TresPlaneGeometry :args="[1, 1]" />
      <TresMeshBasicMaterial :color="field.color" />
    </TresMesh>

    <!-- Освещение -->
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
  <div>
    <h2>Информация о плоскостях:</h2>
    <ul>
      <li v-for="plane in planeStore.planes" :key="plane.id">
        Плоскость {{ plane.id }}: цвет {{ plane.color }}
      </li>
    </ul>
  </div>
</template>
