<script setup>
import { ref } from 'vue';
import { TresCanvas, useRenderLoop } from '@tresjs/core';
// import { TresMesh, TresPlane, TresCylinder, TresSphere } from '@tresjs/components';

const props = defineProps({
  plant: Object, // Растение
});

const leafMaterial = { color: '#3f9f4f' };
const stemMaterial = { color: '#2f6f3f' };
const flowerMaterial = { color: '#e6b8d2' };

const leaves = ref([
  { position: [0.2, 0.5, 0], rotation: [0, 0, 0] },
  { position: [-0.2, 0.5, 0], rotation: [0, 0, Math.PI / 3] },
  { position: [0, 0.5, 0.2], rotation: [0, 0, -Math.PI / 3] },
]);

const runners = ref([
  { position: [0.3, 0.1, 0.2], rotation: [0, 0.3, 0] },
  { position: [-0.3, 0.1, -0.2], rotation: [0, -0.3, 0] },
]);
</script>

<template>
  <TresCanvas clear-color="#87ceeb">
    <TresMesh  v-if="plant.growthStage === 0">
      <!-- Стебель -->
      <TresCylinder :args="[0.05, 0.05, 0.6, 8]" :position="[0, 0.3, 0]" :material="stemMaterial" />

      <!-- Листья -->
      <TresPlane
          v-for="(leaf, index) in leaves" :key="index"
          :position="leaf.position" :rotation="leaf.rotation"
          :args="[0.4, 0.4]" :material="leafMaterial"
      />

      <!-- Ползучие побеги -->
      <TresCylinder
          v-for="(runner, index) in runners" :key="index"
          :position="runner.position" :rotation="runner.rotation"
          :args="[0.02, 0.02, 0.5, 6]" :material="stemMaterial"
      />

      <!-- Цветок -->
      <TresSphere :args="[0.1, 8, 8]" :position="[0, 0.65, 0]" :material="flowerMaterial" />
    </TresMesh>
  </TresCanvas>
</template>
