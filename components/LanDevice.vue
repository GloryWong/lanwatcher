<template>
  <v-card
    title="LAN Devices"
    subtitle="All devices in your local area network"
    prepend-icon="mdi-lan"
    flat
    class="d-flex flex-column"
    :loading="fetching"
  >
    <template #append>
      <div
        class="d-flex aligh-center"
        style="gap: 10px"
      >
        <div class="text-body2 text-grey-darken-1 d-flex align-center">
          <span class="pr-2">Devices seen:</span>
          <span class="text-grey-darken-3">{{ devices.length }}</span>
        </div>
        <v-btn
          flat
          icon="mdi-refresh"
          :disabled="fetching"
          @click="handleRefresh"
        ></v-btn>
      </div>
    </template>
    <v-card-text class="flex-grow-1 d-flex flex-column">
      <v-table
        fixed-header
        height="300"
      >
        <thead>
          <tr>
            <th class="text-center">Ping</th>
            <th class="text-center">Ip Address</th>
            <th class="text-center">MAC Address</th>
            <th class="text-center">Hostname</th>
            <th class="text-center">More</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="{ ping, hostname, ip, mac } in devices"
            :key="ip"
          >
            <td class="text-center">
              <v-icon
                icon="mdi-circle-medium"
                size="x-large"
                :color="ping ? 'green' : 'red'"
              ></v-icon>
            </td>
            <td class="text-center">
              {{ ip }}
            </td>
            <td class="text-center">{{ mac }}</td>
            <td class="text-center">{{ hostname }}</td>
            <td class="text-center">
              <v-btn
                variant="text"
                color="primary"
                >show</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { DeviceInfo } from '~~/electron/utils/scanDevices';

const devices = ref<DeviceInfo[]>([]);
const fetching = ref(false);
const scanDevices = async () => {
  fetching.value = true;
  console.log('start to fetch devices...');
  devices.value = await window.electronAPI.scanDevices();
  fetching.value = false;
  console.log('fetched', devices.value.length, 'devices');
};

const handleRefresh = scanDevices;

scanDevices();
</script>
