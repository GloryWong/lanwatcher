<template>
  <NuxtErrorBoundary>
    <v-theme-provider :theme="isDark ? 'dark' : 'light'">
      <v-sheet class="h-screen">
        <v-layout class="h-100">
          <v-main class="d-flex flex-column flex-grow-1">
            <MyDevice class="flex-shrink-0" />
            <v-divider></v-divider>
            <LanDevices class="flex-grow-1" />
            <v-divider></v-divider>
            <v-footer class="flex-grow-0 justify-end">
              <v-btn
                :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
                density="comfortable"
                flat
                @click="toggleDarkMode()"
              ></v-btn>
            </v-footer>
          </v-main>
        </v-layout>
      </v-sheet>
    </v-theme-provider>
    <template #error="{ error }">
      {{ error }}
    </template>
  </NuxtErrorBoundary>
</template>

<script lang="ts" setup>
const toggleDarkMode = () => window.darkMode.toggle();
const isDark = usePreferredDark();
</script>
