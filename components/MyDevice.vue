<template>
  <v-card
    title="My Device"
    flat
    prepend-icon="mdi-laptop"
    color="grey-lighten-5"
  >
    <template #append>
      <div class="text-body2 text-grey-darken-1 d-flex align-center pr-4">
        <span class="pr-2">Current interface:</span>
        <span class="text-grey-darken-3">{{ networkInterface?.name }}</span>
      </div>
    </template>
    <v-card-text>
      <div
        class="d-flex pa-3 flex-wrap"
        style="gap: 25px"
      >
        <MyDeviceItem
          v-for="{ name, value } in device"
          :key="name"
          :name="name"
          :value="value ?? '-'"
        ></MyDeviceItem>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { NetworkInterface } from '~~/electron/utils/getNetworkInterface';

const connected = ref(false);

const networkInterface = ref<NetworkInterface>();
window.electronAPI.getNetworkInterface().then((device) => {
  networkInterface.value = device;
});

const device = computed(() => {
  return [
    {
      name: 'IP Address',
      value: networkInterface.value?.address,
    },
    {
      name: 'Mac address',
      value: networkInterface.value?.mac,
    },
    {
      name: 'Netmask',
      value: networkInterface.value?.netmask,
    },
    {
      name: 'IP Version',
      value: networkInterface.value?.family,
    },
  ];
});
</script>
