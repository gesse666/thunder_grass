<script setup>
import { ref } from 'vue';
import Plant from './Plant.vue';

const props = defineProps({
  field: Object,
  onClick: Function,
});

const materialColor = ref(props.field.color);

const onHover = () => {
  materialColor.value = "#ffff99"; // Изменяем цвет при наведении
};

const onLeave = () => {
  materialColor.value = props.field.color; // Возвращаем исходный цвет
};

</script>

<template>
  <TresMesh
      :position="field.position"
      @click="onClick"
      @pointer-enter="onHover"
      @pointer-leave="onLeave"
  >
  <TresBoxGeometry :args="[1, 1, .2]" />
  <TresMeshBasicMaterial :color="materialColor" />

  <!-- Растение, если есть -->
  <Plant v-if="field.plant" :plant="field.plant" />
  </TresMesh>
</template>
