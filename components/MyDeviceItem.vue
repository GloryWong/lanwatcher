<template>
  <v-sheet class="flex-column">
    <div class="text-body1 text-grey-darken-1 text-no-wrap">{{ name }}</div>
    <div class="text-h6">
      <slot>
        {{ value ?? '-' }}
      </slot>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  value?: any;
}>();
</script>
