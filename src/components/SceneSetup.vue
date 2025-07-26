<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { useTresContext } from '@tresjs/core'

onMounted(() => {
  const { scene } = useTresContext()
  scene.background = new THREE.Color('#434454')
  scene.fog = new THREE.FogExp2('#04343f', 0.1)
})
</script>

<template></template>
