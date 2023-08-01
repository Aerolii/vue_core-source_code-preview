<script setup lang="ts">
import { reactive, watch } from 'vue';
const person = reactive({ name: 'jack' });

watch(
  () => person.name,
  (name) => {
    console.log('name :>> ', name);
  }
);
</script>

<template>
  <p>reactive</p>
  <p>{{ person.name }}</p>
  <input type="text" v-model="person.name" />
</template>
