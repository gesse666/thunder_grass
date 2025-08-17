<script setup lang="js">
import Dandelion from "./Dandelion.vue";
import Clover from "./Clover.vue";

const props = defineProps({
  plant: Object,
});
</script>

<template>
  <Dandelion v-if="plant.type === 'dandelion'" :plant="plant" :position="[0, 0, 0.1]" :scale="[plant.size, plant.size, plant.size]" />
  <Clover v-if="plant.type === 'clover'" :plant="plant" :position="[0, 0, 0.1]" :scale="[plant.size, plant.size, plant.size]" />
</template>