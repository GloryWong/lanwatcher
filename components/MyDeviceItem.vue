<template>
  <div class="flex-column">
    <div class="text-body1 text-grey-darken-1 text-no-wrap">{{ name }}</div>
    <div class="text-h6">{{ value ?? '-' }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  value?: any;
}>();
</script>
