<script setup lang="ts">
import { reactive } from 'vue';
const person = reactive({ name: 'jack' });
</script>

<template>
  <p>reactive</p>
  <p>{{ person.name }}</p>
  <input type="text" v-model="person.name" />
</template>
