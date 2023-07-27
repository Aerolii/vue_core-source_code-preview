<script setup lang="ts">
import { onUpdated, reactive, watchEffect } from 'vue';

const props = defineProps<{ message: string }>();

console.log('child component');

const child = reactive({ name: 'child' });

onUpdated(() => {
  console.log('child update');
});

watchEffect(() => {
  child.name = props.message + ' child';
});
</script>

<template>
  <div>
    <p>This is Children</p>
    <p>{{ child.name }}</p>
    <p>{{ message }}</p>
  </div>
</template>
