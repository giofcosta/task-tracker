<template>
    <table class="task-table">
        <thead>
            <tr>
                <th>Task</th>
                <th v-for="day in days" :key="day">
                    {{ day }}
                </th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(task, index) in tasks" :key="index">
                <td>{{ task.name }}</td>
                <EditableCell v-for="(hours, dayIndex) in task.hours" :key="dayIndex" :value="hours"
                    @update:value="newValue => $emit('update-hour', index, dayIndex, newValue)" />
                <td class="total">
                    {{ totals[index] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { computed } from 'vue';
import EditableCell from './EditableCell.vue';

const props = defineProps({
    tasks: {
        type: Array,
        required: true
    },
    days: {
        type: Array,
        required: true
    }
});

defineEmits(['update-hour']);

const totals = computed(() =>
    props.tasks.map(task =>
        task.hours.reduce((acc, curr) => acc + curr, 0)
    )
);
</script>

<style scoped>
.task-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

th,
td {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f8f9fa;
    font-weight: 600;
}

.total {
    font-weight: bold;
    color: #2c3e50;
}
</style>