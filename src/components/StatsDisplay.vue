<script setup lang="ts">
defineProps<{
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  characterCount: number;
  spaceCount: number;
  mostUsedWords: [string, number][];
}>();
</script>

<template>
  <div class="stats-display">
    <div class="stats-box">
      <p>Words: {{ wordCount }}</p>
      <p>Sentences: {{ sentenceCount }}</p>
      <p>Paragraphs: {{ paragraphCount }}</p>
      <p>Characters: {{ characterCount }}</p>
      <p>Spaces: {{ spaceCount }}</p>
    </div>
    <div v-if="mostUsedWords.length > 0" class="most-used-words">
      <h3>Most Used Words:</h3>
      <ul>
        <li v-for="([word, count]) in mostUsedWords" :key="word">
          {{ word }}: {{ count }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.stats-display {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Add some space between the main stats and the most used words */
}

.stats-box {
  background-color: var(--vscode-inactive-tab-background);
  border: 1px solid var(--vscode-border-color);
  padding: 10px;
  border-radius: 4px;
  color: var(--vscode-text-color);
  width: 100%;
  box-sizing: border-box;
}

.stats-display p {
  margin: 5px 0;
}

.most-used-words {
  background-color: var(--vscode-inactive-tab-background); /* Same background as stats */
  border: 1px solid var(--vscode-border-color); /* Consistent border */
  padding: 10px;
  border-radius: 4px; /* Consistent border-radius */
  color: var(--vscode-text-color);
  width: 100%;
  box-sizing: border-box;
}

.most-used-words ul {
  list-style: none;
  padding: 0;
}

.most-used-words li {
  margin: 3px 0;
}
</style>
