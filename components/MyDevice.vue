<template>
  <v-card
    title="My Device"
    flat
    prepend-icon="mdi-laptop"
    :rounded="0"
  >
    <template #append>
      <div class="text-body2 d-flex align-center pr-4">
        <span class="pr-2 text-grey-darken-1">Current interface:</span>
        <span>{{ networkInterface?.name }}</span>
      </div>
    </template>
    <v-card-text>
      <v-container
        fluid
        class="py-0"
      >
        <v-row justify="start">
          <v-col
            v-for="{ name, value } in device"
            :key="name"
            :cols="true"
          >
            <MyDeviceItem
              :name="name"
              :value="value ?? '-'"
            ></MyDeviceItem>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { NetworkInterface } from '~~/electron/utils/getNetworkInterface';

const networkInterface = ref<NetworkInterface>();
window.electronAPI.getNetworkInterface().then((device) => {
  networkInterface.value = device;
});

const device = computed(() => {
  return [
    {
      name: 'IP address',
      value: networkInterface.value?.address,
    },
    {
      name: 'MAC address',
      value: networkInterface.value?.mac,
    },
    {
      name: 'Netmask',
      value: networkInterface.value?.netmask,
    },
    {
      name: 'IP version',
      value: networkInterface.value?.family,
    },
  ];
});
</script>
