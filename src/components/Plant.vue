<script setup lang="js">

const props = defineProps({
  plant: Object,
});
</script>

<template>
  <TresMesh :position="[0, 0, 0.1]" :scale="[plant.size, plant.size, plant.size]">
    <TresSphereGeometry />
    <TresMeshBasicMaterial color="yellow" />
  </TresMesh>
</template>
