<script setup lang="ts">
import { ref, computed } from 'vue';
import Tabs from './components/Tabs.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

library.add(faSun, faMoon); // Add sun and moon icons to the library

const isDarkTheme = ref(true);

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
};

const appClasses = computed(() => ({
  'app-container': true,
  'dark-theme': isDarkTheme.value,
  'light-theme': !isDarkTheme.value,
}));
</script>

<template>
  <div :class="appClasses">
    <header class="app-header">
      <div class="title-container">
        <h2>Σ() Text Count</h2>
      </div>

      <div class="theme-toggle">
        <font-awesome-icon :icon="isDarkTheme ? 'moon' : 'sun'" />
        <label class="toggle-container">
          <input type="checkbox" v-model="isDarkTheme" @change="toggleTheme" />
          <span class="slider"></span>
        </label>
      </div>
    </header>
    <Tabs />
  </div>
</template>

<style scoped>
/* General App Container Styles */
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.app-header {
  background-color: var(--vscode-header-background);
  color: var(--vscode-header-foreground);
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--vscode-border-color);
}

.title-container {
  display: flex;
  align-items: center;
}

/* Theme Toggle Button Styles */
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toggle-container {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}

.toggle-container input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 30px;
  transition: background-color 0.3s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 5px;
  bottom: 5px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s;
}

input:checked + .slider {
  background-color: #555;
}

input:checked + .slider:before {
  transform: translateX(30px);
}

/* Dark Theme Variables */
.dark-theme {
  --vscode-background: #1e1e1e;
  --vscode-foreground: #d4d4d4;
  --vscode-button-background: #0e639c;
  --vscode-button-hover-background: #1177bb;
  --vscode-header-background: #333333;
  --vscode-header-foreground: #ffffff;
}

/* Light Theme Variables */
.light-theme {
  --vscode-background: #ffffff;
  --vscode-foreground: #333333;
  --vscode-button-background: #4CAF50;
  --vscode-button-hover-background: #66BB6A;
  --vscode-header-background: #eeeeee;
  --vscode-header-foreground: #333333;
}
</style>
