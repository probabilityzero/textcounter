<script setup lang="ts">
import { ref, computed } from 'vue';
import Tabs from './components/Tabs.vue';

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
        <!-- Sigma Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="sigma-icon">
          <path d="M18.42 4.58a2 2 0 0 0-2.84 0L6.58 13.58a2 2 0 0 0 0 2.84l2.84 2.84a2 2 0 0 0 2.84 0L21 9.42V18a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h5.58L3.16 20.42a2 2 0 0 0 0 2.84 2 2 0 0 0 2.84 0L16 13.16l2.42 2.42a2 2 0 0 0 2.84 0 2 2 0 0 0 0-2.84L18.42 4.58z"/>
        </svg>
        <h1>Text Count (Σ)</h1>
      </div>

      <button @click="toggleTheme" class="theme-toggle">
        {{ isDarkTheme ? 'Light Mode' : 'Dark Mode' }}
      </button>
    </header>
    <Tabs />
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: var(--vscode-header-background);
  color: var(--vscode-header-foreground);
  padding: 5px 20px; /* Reduced padding for smaller height */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--vscode-border-color);
}

.title-container {
  display: flex;
  align-items: center;
}

.sigma-icon {
  margin-right: 10px; /* Space between icon and title */
  fill: var(--vscode-header-foreground); /* Icon color */
}

.theme-toggle {
  background-color: var(--vscode-button-background);
}

.theme-toggle:hover {
  background-color: var(--vscode-button-hover-background);
}

.dark-theme {
  --vscode-background: #1e1e1e;
  --vscode-foreground: #d4d4d4;
  --vscode-inactive-tab-background: #2d2d2d;
  --vscode-active-tab-background: #1e1e1e;
  --vscode-tab-border: #252526;
  --vscode-button-background: #0e639c;
  --vscode-button-hover-background: #1177bb;
  --vscode-text-color: #cccccc;
  --vscode-border-color: #444444;
  --vscode-close-icon-color: #999999;
  --vscode-header-background: #333333;
  --vscode-header-foreground: #ffffff;
}

.light-theme {
  --vscode-background: #ffffff;
  --vscode-foreground: #333333;
  --vscode-inactive-tab-background: #f0f0f0;
  --vscode-active-tab-background: #ffffff;
  --vscode-tab-border: #cccccc;
  --vscode-button-background: #4CAF50;
  --vscode-button-hover-background: #66BB6A;
  --vscode-text-color: #333333;
  --vscode-border-color: #cccccc;
  --vscode-close-icon-color: #666666;
  --vscode-header-background: #eeeeee;
  --vscode-header-foreground: #333333;
}
</style>
