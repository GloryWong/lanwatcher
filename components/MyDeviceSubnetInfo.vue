<template>
  <div
    class="d-flex flex-column"
    style="gap: 2px"
  >
    <div
      v-for="{ name, value } in subnetInfo"
      :key="name"
      class="d-flex"
    >
      <div
        style="width: 170px"
        class="mr-2 text-body-1 text-grey-darken-1 flex-shrink-0 text-right"
      >
        {{ name }}:
      </div>
      <div class="text-body-1">{{ value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { networkInfo } = useNetworkInfo();
const subnetInfo = computed(() => {
  if (!networkInfo.value) return [];
  const subnetInfo = networkInfo.value?.subnetInfo;

  return [
    {
      name: 'Network address',
      value: subnetInfo.networkAddress,
    },
    {
      name: 'Broadcast address',
      value: subnetInfo.broadcastAddress,
    },
    {
      name: 'Subnet mask',
      value: subnetInfo.subnetMask,
    },
    {
      name: 'Mask bits',
      value: subnetInfo.subnetMaskLength,
    },
    {
      name: 'Total IPs',
      value: subnetInfo.length,
    },
    {
      name: 'Total hosts',
      value: subnetInfo.numHosts,
    },
    {
      name: 'First address',
      value: subnetInfo.firstAddress,
    },
    {
      name: 'Last address',
      value: subnetInfo.lastAddress,
    },
  ];
});
</script>

<style scoped></style>
