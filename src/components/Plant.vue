<script setup lang="js">

import DandelionSeedling from "./DandelionSeedling.vue";

const props = defineProps({
  plant: Object,
});
</script>

<template>
  <DandelionSeedling :plant="plant" :position="[0, 0, 0.1]" :scale="[plant.size, plant.size, plant.size]" />
</template>