<template>
  <v-layout class="h-screen">
    <v-main class="d-flex flex-column">
      <MyDevice class="flex-shrink-0" />
      <v-divider></v-divider>
      <LanDevice class="flex-grow-1" />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup></script>
