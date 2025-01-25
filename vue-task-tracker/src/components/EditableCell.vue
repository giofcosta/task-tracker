<template>
  <td 
    class="editable-cell"
    @dblclick="isEditing = true"
    @keyup.enter="isEditing = true"
  >
    <input
      v-if="isEditing"
      v-model.number="localValue"
      type="number"
      min="0"
      max="24"
      class="hour-input"
      @blur="saveChanges"
      @keyup.enter="saveChanges"
      @keyup.esc="cancelEdit"
    >
    <span v-else>{{ value }}</span>
  </td>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  value: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['update:value']);

const isEditing = ref(false);
const localValue = ref(props.value);

watch(() => props.value, (newVal) => {
  localValue.value = newVal;
});

const saveChanges = () => {
  isEditing.value = false;
  emit('update:value', Number(localValue.value));
};

const cancelEdit = () => {
  isEditing.value = false;
  localValue.value = props.value;
};
</script>

<style scoped>
.editable-cell {
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;
}

.editable-cell:hover {
  background-color: #f8f9fa;
}

.hour-input {
  width: 60px;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  font-size: 1rem;
}
</style>