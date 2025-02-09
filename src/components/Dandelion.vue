<script setup lang="js">

const props = defineProps({
  plant: Object, // Растение
});
</script>

<template>
  <!-- Семя -->
  <TresMesh  v-if="plant.growthStage === 0" :position="[0, 0, 0.1]" :scale="[0.1, 0.1, 0.1]">
    <TresSphereGeometry />
    <TresMeshBasicMaterial color="yellow" />
  </TresMesh>

  <!-- Бутон -->
  <TresMesh v-if="plant.growthStage > 2 && plant.growthStage  < 4"  :position="[0, 0, 0.5]" :rotation="[Math.PI / 2, 0, 0]">
    <TresCylinderGeometry :args="[0.05, 0.06, 0.1, 16]" />
    <TresMeshBasicMaterial color="yellow" />
  </TresMesh>

  <!-- Цветок -->
  <TresMesh v-if="plant.growthStage === 4" :position="[0, 0, 0.7]" >
    <TresSphereGeometry :args="[0.2, 32, 32]" />
    <TresMeshBasicMaterial  color="yellow" />
  </TresMesh>

  <!-- Цветок плод -->
  <TresMesh v-if="plant.growthStage === 5"  :position="[0, 0, 0.7]">
    <TresSphereGeometry :args="[0.2, 32, 32]" />
    <TresMeshBasicMaterial  color="white" />
  </TresMesh>

  <!-- Стебель -->
  <TresMesh v-if="plant.growthStage > 2"  :position="[0, 0, 0.25]" :rotation="[Math.PI / 2, 0, 0]">
    <TresCylinderGeometry :args="[0.05, 0.05, 0.5, 16]" />
    <TresMeshBasicMaterial color="green" />
  </TresMesh>

  <!-- Первый лист -->
  <TresMesh v-if="plant.growthStage > 0"  :position="[-0.1, 0, 0.1]" :rotation="[Math.PI / 4, 0, -Math.PI / 8]" :scale="[plant.size, plant.size, plant.size]">
    <TresPlaneGeometry :args="[0.2, 0.05]" />
    <TresMeshBasicMaterial color="green" />
  </TresMesh>

  <!-- Второй лист -->
  <TresMesh v-if="plant.growthStage > 0"  :position="[0.1, 0, 0.1]"  :rotation="[Math.PI / 4, 0, Math.PI / 8]" :scale="[plant.size, plant.size, plant.size]">
    <TresPlaneGeometry  :args="[0.2, 0.05]" />
    <TresMeshBasicMaterial color="green" />
  </TresMesh>
</template>
