<template>
  <v-card
    title="Device list"
    subtitle="All devices in your local area network"
  >
    <v-card-text>
      <div class="pa-2">
        <v-btn
          color="primary"
          flat
          prepend-icon="mdi-refresh"
          :loading="fetching"
          :disabled="fetching"
          @click="handleRefresh"
          >Refresh</v-btn
        >
      </div>
      <v-table
        fixed-header
        height="300px"
      >
        <thead>
          <tr>
            <th class="text-center">Ip address</th>
            <th class="text-center">MAC address</th>
            <th class="text-center">Hostname</th>
            <th class="text-center">more</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="{ name, ip, mac, isHostDevice } in devices"
            :key="ip"
          >
            <td
              class="text-center"
              :class="{ 'font-weight-bold': isHostDevice }"
            >
              {{ ip }}
            </td>
            <td class="text-center">{{ mac }}</td>
            <td class="text-center">{{ name }}</td>
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
  import { Device } from '~/types';

  const devices = ref<Device[]>([]);
  const fetching = ref(false);
  const fetchLocalDevices = async () => {
    fetching.value = true;
    console.log('start to fetch...');
    devices.value = await window.electronAPI.fetchLocalDevices();
    fetching.value = false;
    console.log('fetched', devices.value.length, 'devices');
  };

  const handleRefresh = fetchLocalDevices;

  fetchLocalDevices();
</script>
