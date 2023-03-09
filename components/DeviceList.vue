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
            <th class="text-center">Name</th>
            <th class="text-center">Ip</th>
            <th class="text-center">Mac</th>
            <th class="text-center">more</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="{ name, ip, mac } in devices"
            :key="ip"
          >
            <td class="text-center">{{ name }}</td>
            <td class="text-center">{{ ip }}</td>
            <td class="text-center">{{ mac }}</td>
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

  const handleRefresh = async () => {
    fetching.value = true;
    devices.value = await window.electronAPI.fetchLocalDevices();
    fetching.value = false;
  };
</script>
