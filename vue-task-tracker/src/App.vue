<template>
  <div class="container">
    <h1>Weekly Task Tracker</h1>
    <button @click="addNewRow">Add New Row</button>
    <TaskTable :tasks="tasks" :days="days" @update-hour="updateHour" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from './stores/taskStore'
import TaskTable from './components/TaskTable.vue';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const tasks = ref([
  {
    name: 'Development',
    hours: [8, 8, 8, 8, 8, 4, 4]
  },
  {
    name: 'Meetings',
    hours: [2, 1, 2, 1, 2, 0, 0]
  },
  {
    name: 'Code Reviews',
    hours: [1, 2, 1, 2, 1, 0, 0]
  }
]);

const taskStore = useTaskStore()

const updateHour = (taskIndex, dayIndex, newValue) => {
  tasks.value[taskIndex].hours[dayIndex] = Math.max(0, Math.min(24, newValue));
};

const addNewRow = () => {
  taskStore.addTask({
    id: Date.now(), // Temporary unique ID
    title: '',
    description: '',
    status: 'pending',
    createdAt: new Date().toISOString()
  })
}
</script>

<style>
.container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
}
</style>
