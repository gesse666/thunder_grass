<script setup lang="js">

import Dandelion from "./Dandelion.vue";

const props = defineProps({
  plant: Object,
});
</script>

<template>
  <Dandelion :plant="plant" :position="[0, 0, 0.1]" :scale="[plant.size, plant.size, plant.size]" />
</template>