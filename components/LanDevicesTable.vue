<template>
  <div
    ref="container"
    class="h-100"
  >
    <v-table
      fixed-header
      density="compact"
      hover
      :height="containerHeight"
    >
      <thead>
        <tr>
          <th
            class="text-center"
            style="width: 50px"
          >
            Ping
          </th>
          <th
            class="text-center"
            style="width: 150px"
          >
            Ip Address
          </th>
          <th
            class="text-center"
            style="width: 200px"
          >
            MAC Address
          </th>
          <th
            class="text-center"
            style="width: 200px"
          >
            Vendor
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="{ ping, vendorInfo, ip, mac } in devices"
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
          <td class="text-center">
            <LanDevicesTableVendor
              v-if="vendorInfo"
              :vendor-info="vendorInfo"
            ></LanDevicesTableVendor>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import { DeviceInfo } from '~~/electron/utils/scanDevices';

defineProps<{
  devices: DeviceInfo[];
}>();

const container = ref(null);
const containerHeight = ref(300);
useResizeObserver(container, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  containerHeight.value = height;
});
</script>
