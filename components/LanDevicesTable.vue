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
            IP address
          </th>
          <th
            class="text-center"
            style="width: 200px"
          >
            MAC address
          </th>
          <th
            class="text-center"
            style="width: 200px"
          >
            <div class="d-flex align-center justify-center">
              Vendor
              <v-tooltip>
                <template #activator="{ props }">
                  <v-btn
                    density="comfortable"
                    v-bind="props"
                    variant="text"
                    size="x-small"
                    icon="mdi-help-circle-outline"
                  >
                  </v-btn>
                </template>
                Vendor infos are retrieved from IEEE standards-oui
              </v-tooltip>
            </div>
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
          <td
            class="text-center"
            :class="{
              'font-weight-black': ip === networkInfo?.address,
            }"
          >
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

const { networkInfo } = useNetworkInfo();

const container = ref(null);
const containerHeight = ref(300);
useResizeObserver(container, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  containerHeight.value = height;
});
</script>
