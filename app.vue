<template>
  <v-layout class="h-screen flex-column">
    <v-main class="d-flex flex-column flex-grow-1">
      <MyDevice class="flex-shrink-0" />
      <v-divider></v-divider>
      <LanDevices class="flex-grow-1" />
    </v-main>
    <v-divider></v-divider>
    <v-footer class="flex-grow-0 justify-center bg-grey-lighten-5">
      <div class="text-subtitle-2 text-grey-darken-1">
        {{ appConfig.title }} v{{ appConfig.version }}
      </div>
    </v-footer>
  </v-layout>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig();
</script>
