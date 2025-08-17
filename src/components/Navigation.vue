<script setup lang="js">
defineProps({
  currentPage: {
    type: String,
    default: 'game'
  }
});

defineEmits(['pageChange']);
</script>

<template>
  <nav class="navigation">
    <div class="nav-container">
      <button 
        class="nav-button" 
        :class="{ active: currentPage === 'game' }"
        @click="$emit('pageChange', 'game')"
      >
        🎮 Игра
      </button>
      <button 
        class="nav-button" 
        :class="{ active: currentPage === 'debug' }"
        @click="$emit('pageChange', 'debug')"
      >
        🐛 Отладка
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.9);
  padding: 10px 0;
}

.nav-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.nav-button {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.nav-button.active {
  background: rgba(76, 175, 80, 0.3);
  border-color: #4CAF50;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}
</style>
