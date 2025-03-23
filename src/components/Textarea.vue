<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    initialText: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const text = ref(props.initialText);


watch(()=> props.initialText, (newValue) => {
    text.value = newValue
})

watch(text, (newValue) => {
    emit('update:modelValue', newValue)
})

</script>

<template>
  <div class="textarea-container">
    <textarea v-model="text" placeholder="Enter text here..." class="text-input"></textarea>
  </div>
</template>

<style scoped>
.textarea-container {
  display: flex;
  flex-direction: column;
  width: 100%;
    flex-grow: 1; /* Take up available space */
}

.text-input {
  font-family: 'Menlo', 'Consolas', 'Courier New', monospace; /* VS Code-like font */
  font-size: 16px;
  padding: 10px;
  border: 1px solid var(--vscode-border-color);
  border-radius: 4px;
  margin-bottom: 0px;
  width: 100%;
  box-sizing: border-box;
  resize: none; /* Prevent resizing */
  background-color: var(--vscode-background);
  color: var(--vscode-text-color);
    flex-grow: 1;
    outline: none;
}
</style>
