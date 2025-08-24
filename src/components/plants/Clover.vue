<script setup lang="js">
import { ref } from 'vue';

const props = defineProps({
  plant: Object, // Растение
});

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
  <!-- Семя -->
  <TresMesh v-if="plant.growthStage === 0" :position="[0, 0, 0]" :scale="[0.1, 0.1, 0.1]">
    <TresSphereGeometry />
    <TresMeshBasicMaterial color="brown" />
  </TresMesh>

  <!-- Ростки -->
  <TresMesh v-if="plant.growthStage === 1" :position="[0, 0.1, 0]" :scale="[plant.size, plant.size, plant.size]">
    <TresCylinderGeometry :args="[0.02, 0.02, 0.2, 8]" />
    <TresMeshBasicMaterial color="#2f6f3f" />
  </TresMesh>

  <!-- Молодое растение -->
  <TresMesh v-if="plant.growthStage === 2" :position="[0, 0.2, 0]" :scale="[plant.size, plant.size, plant.size]">
    <TresCylinderGeometry :args="[0.03, 0.03, 0.4, 8]" />
    <TresMeshBasicMaterial color="#2f6f3f" />
  </TresMesh>

  <!-- Взрослое растение со стеблем -->
  <TresMesh v-if="plant.growthStage >= 3" :position="[0, 0.3, 0]" :scale="[plant.size, plant.size, plant.size]">
    <TresCylinderGeometry :args="[0.05, 0.05, 0.6, 8]" />
    <TresMeshBasicMaterial color="#2f6f3f" />
  </TresMesh>

  <!-- Листья для взрослого растения -->
  <TresMesh v-if="plant.growthStage >= 3" v-for="(leaf, index) in leaves" :key="index"
    :position="[leaf.position[0] * plant.size, leaf.position[1] * plant.size, leaf.position[2] * plant.size]" 
    :rotation="leaf.rotation" :scale="[plant.size, plant.size, plant.size]">
    <TresPlaneGeometry :args="[0.4, 0.4]" />
    <TresMeshBasicMaterial color="#3f9f4f" />
  </TresMesh>

  <!-- Ползучие побеги для взрослого растения -->
  <TresMesh v-if="plant.growthStage >= 4" v-for="(runner, index) in runners" :key="index"
    :position="[runner.position[0] * plant.size, runner.position[1] * plant.size, runner.position[2] * plant.size]" 
    :rotation="runner.rotation" :scale="[plant.size, plant.size, plant.size]">
    <TresCylinderGeometry :args="[0.02, 0.02, 0.5, 6]" />
    <TresMeshBasicMaterial color="#2f6f3f" />
  </TresMesh>

  <!-- Цветок -->
  <TresMesh v-if="plant.growthStage === 5" :position="[0, 0.65, 0]" :scale="[plant.size, plant.size, plant.size]">
    <TresSphereGeometry :args="[0.1, 8, 8]" />
    <TresMeshBasicMaterial color="#e6b8d2" />
  </TresMesh>
</template>
