<template>
  <v-card
    title="LAN Hosts"
    subtitle="All hosts in your local area network"
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
          <span class="pr-2">Hosts seen:</span>
          <span class="text-grey-darken-3">{{ hosts.length }}</span>
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
            <th class="text-center">Ip Address</th>
            <th class="text-center">MAC Address</th>
            <th class="text-center">Hostname</th>
            <th class="text-center">More</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="{ name, ip, mac, isHostDevice } in hosts"
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
  import { Host } from '~/types';

  const hosts = ref<Host[]>([]);
  const fetching = ref(false);
  const fetchLocalHosts = async () => {
    fetching.value = true;
    console.log('start to fetch hosts...');
    hosts.value = await window.electronAPI.fetchLocalHosts();
    fetching.value = false;
    console.log('fetched', hosts.value.length, 'hosts');
  };

  const handleRefresh = fetchLocalHosts;

  fetchLocalHosts();
</script>
