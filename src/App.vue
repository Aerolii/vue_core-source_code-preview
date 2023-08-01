<script setup lang="ts">
import { ref } from 'vue';
import ReviewReactiveVue from './components/ReviewReactive.vue';
const username = ref('');
</script>

<template>
  <div>{{ username }}</div>
  <ReviewReactiveVue />
</template>
