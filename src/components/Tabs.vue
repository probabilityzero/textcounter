<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import Textarea from './Textarea.vue';
import StatsDisplay from './StatsDisplay.vue';

interface Tab {
  id: number;
  title: string;
  content: string;
}

const tabs = ref<Tab[]>([]);
const activeTab = ref(1);

const addTab = () => {
  const newTabId = tabs.value.length > 0 ? Math.max(...tabs.value.map(t => t.id)) + 1 : 1;
  tabs.value.push({ id: newTabId, title: `Tab ${newTabId}`, content: '' });
  activeTab.value = newTabId;
  saveTabsToCookie();
};

const removeTab = (id: number) => {
  tabs.value = tabs.value.filter(tab => tab.id !== id);
  if (activeTab.value === id) {
    activeTab.value = tabs.value.length > 0 ? tabs.value[0].id : 1;
  }
    saveTabsToCookie();
};

const getActiveTabText = () : string => {
    const  activeTabObj = tabs.value.find(tab => tab.id === activeTab.value)
    if (activeTabObj)
        return activeTabObj.content
    return ""
}
const setActiveTabText = (newText: string) => {
    const activeTabObj = tabs.value.find((tab) => tab.id === activeTab.value);
    if (activeTabObj) {
        activeTabObj.content = newText;
    }
}

const saveTabsToCookie = () => {
  document.cookie = `tabs=${JSON.stringify(tabs.value)};path=/;max-age=31536000`; // Expires in 1 year
};
const loadTabsFromCookie = () => {
  const cookieValue = document.cookie.split('; ').find(row => row.startsWith('tabs='))?.split('=')[1];
  if (cookieValue) {
    try {
      tabs.value = JSON.parse(cookieValue);
      if (tabs.value.length > 0) {
        activeTab.value = tabs.value[0].id;
      }
    } catch (error) {
      console.error("Error parsing cookie:", error);
      // Handle the error, e.g., clear the invalid cookie
      document.cookie = "tabs=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  } else {
    addTab(); // Initialize with one tab if no cookie
  }
};

const activeTabContent = computed(() => {
  const tab = tabs.value.find(t => t.id === activeTab.value);
  return tab ? tab.content : '';
});

const wordCount = computed(() => activeTabContent.value.trim() === '' ? 0 : activeTabContent.value.trim().split(/\s+/).length);
const sentenceCount = computed(() => activeTabContent.value.trim() === '' ? 0 : activeTabContent.value.split(/[.!?]+/).filter(Boolean).length);
const paragraphCount = computed(() => activeTabContent.value.trim() === '' ? 0 : activeTabContent.value.split(/\n\s*\n/).filter(Boolean).length);
const spaceCount = computed(() => activeTabContent.value.split(' ').length -1);
const characterCount = computed(() => activeTabContent.value.length);

const mostUsedWords = computed(() => {
  if (activeTabContent.value.trim() === '') {
    return [];
  }
  const words = activeTabContent.value.toLowerCase().match(/\b\w+\b/g);
    if (!words) return []
  const wordCounts: { [key: string]: number } = {};
  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });
  return Object.entries(wordCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 10);
});

onMounted(() => {
  loadTabsFromCookie();
});

watch(tabs, saveTabsToCookie, { deep: true });

</script>

<template>
  <div class="tabs-container">
    <div class="tab-buttons">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="{ active: activeTab === tab.id }"
        class="tab-button"
      >
        {{ tab.title }}
        <span @click.stop="removeTab(tab.id)" class="close-tab">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="close-icon" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </span>
      </button>
      <button @click="addTab" class="add-tab">
        <!-- Plus Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </button>
    </div>
    <div class="tab-content">
      <div class="editor-area">
        <Textarea v-if="tabs.length > 0" :key="activeTab"  @update:modelValue="setActiveTabText" :initial-text="getActiveTabText()"/>
        <StatsDisplay v-if="tabs.length > 0"
                      :word-count="wordCount"
                      :sentence-count="sentenceCount"
                      :paragraph-count="paragraphCount"
                      :character-count="characterCount"
                      :space-count="spaceCount"
                      :most-used-words="mostUsedWords"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tab-buttons {
  display: flex;
  background-color: var(--vscode-inactive-tab-background);
  border-bottom: 1px solid var(--vscode-tab-border);
  flex-shrink: 0;
}

.tab-button {
  padding: 8px 12px;
  background-color: var(--vscode-inactive-tab-background);
  color: var(--vscode-text-color);
  border: none;
  border-right: 1px solid var(--vscode-tab-border);
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
}

.tab-button.active {
  background-color: var(--vscode-active-tab-background);
  color: var(--vscode-foreground);
}

.add-tab {
  padding: 8px 12px;
  background-color: transparent;
  color: var(--vscode-text-color);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex; /* Make the add tab button a flex container */
  align-items: center; /* Vertically center the icon */
}

.add-tab:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.close-tab {
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  color: var(--vscode-close-icon-color);
  transition: all 0.2s; /* Smooth transition for hover effects */
}
.close-icon{
    fill: var(--vscode-close-icon-color);
}

.close-tab:hover .close-icon {
  fill: white; /* Change icon color on hover */
}
.close-tab:hover {
  color: white;
  background-color: rgba(255, 0, 0, 0.7);
}

.tab-content {
  border: 1px solid var(--vscode-border-color);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.editor-area {
  display: grid;
  grid-template-columns: 1fr; /* Default: single column */
  grid-template-rows: auto auto; /* Textarea and stats */
  gap: 20px; /* Space between textarea and stats */
  height: 100%;
}

@media (min-width: 768px) {
  .editor-area {
    grid-template-columns: 70% 30%; /* Two columns on larger screens */
    grid-template-rows: 1fr; /* Single row */
  }
}
</style>
