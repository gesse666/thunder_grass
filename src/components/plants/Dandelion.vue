<script setup lang="js">

const props = defineProps({
  plant: Object, // Растение
});
</script>

<template>
  <!-- Укоренение (Stage 0) -->
  <TresMesh v-if="plant.growthStage === 0" :position="[0, 0, 0]" :scale="[0.1, 0.1, 0.1]">
    <TresSphereGeometry />
    <TresMeshBasicMaterial color="brown" />
  </TresMesh>

  <!-- Росток (Stage 1) -->
  <TresMesh v-if="plant.growthStage === 1" :position="[0, 0.1, 0]" :scale="[plant.size, plant.size, plant.size]">
    <TresCylinderGeometry :args="[0.02, 0.02, 0.2, 8]" />
    <TresMeshBasicMaterial color="#2f6f3f" />
  </TresMesh>

  <!-- Растение (Stage 2) -->
  <TresMesh v-if="plant.growthStage === 2" :position="[0, 0.2, 0]" :scale="[plant.size, plant.size, plant.size]">
    <TresCylinderGeometry :args="[0.03, 0.03, 0.4, 8]" />
    <TresMeshBasicMaterial color="#2f6f3f" />
  </TresMesh>

  <!-- Бутон (Stage 3) -->
  <TresMesh v-if="plant.growthStage === 3" :position="[0, 0.5, 0]" :rotation="[Math.PI / 2, 0, 0]">
    <TresCylinderGeometry :args="[0.05, 0.06, 0.1, 16]" />
    <TresMeshBasicMaterial color="yellow" />
  </TresMesh>

  <!-- Цветение (Stage 4) -->
  <TresMesh v-if="plant.growthStage === 4" :position="[0, 0.7, 0]">
    <TresSphereGeometry :args="[0.2, 32, 32]" />
    <TresMeshBasicMaterial color="yellow" />
  </TresMesh>

  <!-- Плодоношение (Stage 5) -->
  <TresMesh v-if="plant.growthStage === 5" :position="[0, 0.7, 0]">
    <TresSphereGeometry :args="[0.2, 32, 32]" />
    <TresMeshBasicMaterial color="white" />
  </TresMesh>

  <!-- Полностью созревшее растение (Stage 6) -->
  <TresMesh v-if="plant.growthStage === 6" :position="[0, 0.8, 0]">
    <TresSphereGeometry :args="[0.25, 32, 32]" />
    <TresMeshBasicMaterial color="white" />
  </TresMesh>

  <!-- Стебель (для стадий 2 и выше) -->
  <TresMesh v-if="plant.growthStage >= 2" :position="[0, 0.25, 0]">
    <TresCylinderGeometry :args="[0.05, 0.05, 0.5, 16]" />
    <TresMeshBasicMaterial color="green" />
  </TresMesh>

  <!-- Первый лист (для стадий 1 и выше) -->
  <TresMesh v-if="plant.growthStage >= 1" :position="[-0.1, 0.1, 0]" :rotation="[Math.PI / 4, 0, -Math.PI / 8]" :scale="[plant.size, plant.size, plant.size]">
    <TresPlaneGeometry :args="[0.2, 0.05]" />
    <TresMeshBasicMaterial color="green" />
  </TresMesh>

  <!-- Второй лист (для стадий 1 и выше) -->
  <TresMesh v-if="plant.growthStage >= 1" :position="[0.1, 0.1, 0]" :rotation="[Math.PI / 4, 0, Math.PI / 8]" :scale="[plant.size, plant.size, plant.size]">
    <TresPlaneGeometry :args="[0.2, 0.05]" />
    <TresMeshBasicMaterial color="green" />
  </TresMesh>
</template>
