<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Tabs from './components/Tabs.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

library.add(faSun, faMoon);

const isDarkTheme = ref(true);

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light');
  applyTheme();
};

const applyTheme = () => {
  const theme = isDarkTheme.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
};

onMounted(() => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    isDarkTheme.value = storedTheme === 'dark';
  } else {
    isDarkTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  applyTheme();
});

const appClasses = computed(() => ({
  'app-container': true,
  'dark-theme': isDarkTheme.value,
  'light-theme': !isDarkTheme.value,
}));
</script>

    <template>
      <div :class="appClasses" class="dark:bg-gray-800 dark:text-white min-h-screen flex flex-col">
        <header
          class="app-header bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-2 flex justify-between items-center"
        >
          <div class="title-container flex items-center justify-center w-full">
            <h2 class="text-xl font-semibold">Σ() Text Count</h2>
          </div>

          <div class="theme-toggle flex items-center gap-2">
            <font-awesome-icon :icon="isDarkTheme ? 'moon' : 'sun'" />
            <label class="toggle-container">
              <input type="checkbox" v-model="isDarkTheme" @change="toggleTheme" />
              <span class="slider round"></span>
            </label>
          </div>
        </header>
        <Tabs />
      </div>
    </template>

    <style scoped>
/* Theme Toggle Button Styles */
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* The switch - the box around the slider */
.toggle-container {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.toggle-container input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider - the moving part */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #66bb6a;
}

input:focus + .slider {
  box-shadow: 0 0 1px #66bb6a;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
