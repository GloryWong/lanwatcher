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
        <span>{{ networkInfo?.name }}</span>
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
const { networkInfo } = useNetworkInfo();

const device = computed(() => {
  return [
    {
      name: 'IP address',
      value: networkInfo.value?.address,
    },
    {
      name: 'MAC address',
      value: networkInfo.value?.mac,
    },
    {
      name: 'Netmask',
      value: networkInfo.value?.netmask,
    },
    {
      name: 'IP version',
      value: networkInfo.value?.family,
    },
  ];
});
</script>
