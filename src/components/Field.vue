<script setup lang="js">
import Plant from './Plant.vue';

const props = defineProps({
  field: Object,
  onClick: Function,
});
</script>

<template>
  <TresMesh :position="field.position" @click="onClick">
    <TresPlaneGeometry :args="[1, 1]" />
    <TresMeshBasicMaterial :color="field.color" />

    <!-- Растение, если есть -->
    <Plant v-if="field.plant" :plant="field.plant" />
  </TresMesh>
</template>
