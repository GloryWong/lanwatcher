<template>
  <v-card
    title="My Device"
    flat
    prepend-icon="mdi-laptop"
  >
    <v-card-text>
      <div
        class="d-flex pa-3"
        style="gap: 25px"
      >
        <MyDeviceItem
          v-for="{ name, value } in connection"
          :key="name"
          :name="name"
          :value="value"
        ></MyDeviceItem>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { Device } from '~~/types';

  const myDevice = ref<Device>();
  const updateMyDevice = async () => {
    myDevice.value = await window.electronAPI.getMyDevice();
  };
  updateMyDevice();

  const connection = computed(() => {
    const connection = myDevice.value?.connection;
    if (connection) {
      return [
        {
          name: 'IP Address',
          value: connection.address,
        },
        {
          name: 'Netmask',
          value: connection.netmask,
        },
        {
          name: 'IP Version',
          value: connection.family,
        },
        {
          name: 'Interface Name',
          value: connection.name,
        },
      ];
    }
  });
</script>
