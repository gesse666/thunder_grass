<script setup>
import { ref } from 'vue';
import Plant from './Plant.vue';
import * as THREE from 'three'; // Импортируем THREE для создания геометрии линий

const props = defineProps({
  field: Object,
  onClick: Function,
  onHover: Function, // Добавляем проп для наведения
  onLeave: Function, // Добавляем проп для ухода курсора
});

// console.log('Field ID:', props.field.id, 'Position:', props.field.position);

const materialColor = ref(props.field.color);

const onHover = () => {
  materialColor.value = "#ffff99"; // Изменяем цвет при наведении
  if (props.onHover) props.onHover(props.field); // Передаём поле в App.vue
};

const onLeave = () => {
  materialColor.value = props.field.color; // Возвращаем исходный цвет
  if (props.onLeave) props.onLeave(); // Сбрасываем подсвеченное поле
};

// Определяем вершины для квадратной рамки размером 1.1 x 1.1 на высоте 0.21
const frameSize = 1; // Размер рамки
const frameHeight = 0.1; // Высота рамки над полем
const halfSize = frameSize / 2;

// Геометрия для каждой линии рамки
const topLine = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-halfSize, halfSize, frameHeight),
  new THREE.Vector3(halfSize, halfSize, frameHeight),
]);
const bottomLine = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-halfSize, -halfSize, frameHeight),
  new THREE.Vector3(halfSize, -halfSize, frameHeight),
]);
const leftLine = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-halfSize, -halfSize, frameHeight),
  new THREE.Vector3(-halfSize, halfSize, frameHeight),
]);
const rightLine = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(halfSize, -halfSize, frameHeight),
  new THREE.Vector3(halfSize, halfSize, frameHeight),
]);
</script>

<template>
  <TresGroup :position="field.position">
    <!-- Основное поле -->
    <TresMesh
        :position="[0, 0, 0]"
        @click="onClick"
        @pointer-enter="onHover"
        @pointer-leave="onLeave"
    >
      <TresBoxGeometry :args="[1, 1, 0.2]" />
      <TresMeshBasicMaterial :color="materialColor" />
    </TresMesh>

    <!-- Красная квадратная рамка из четырёх линий -->
    <TresLine :geometry="topLine">
      <TresLineBasicMaterial color="#FF0000" :linewidth="20" />
    </TresLine>
    <TresLine :geometry="bottomLine">
      <TresLineBasicMaterial color="#FF0000" :linewidth="20" />
    </TresLine>
    <TresLine :geometry="leftLine">
      <TresLineBasicMaterial color="#FF0000" :linewidth="20" />
    </TresLine>
    <TresLine :geometry="rightLine">
      <TresLineBasicMaterial color="#FF0000" :linewidth="20" />
    </TresLine>

    <!-- Растение, если есть -->
    <Plant v-if="field.plant" :plant="field.plant" :position="[0, 0, 0.1]" />
  </TresGroup>
</template>