<script lang="ts" setup>
const { devices, scan, scanning, startAutoScan, stopAutoScan, autoScanning }
= useDevices()

const devicesNum = computed(() => devices.value.length)
const pingableDevicesNum = computed(
  () => devices.value.filter(v => v.ping).length,
)

const { networkInfo } = useNetworkInfo()

// scan once create
scan()

function handleAutoScanClick() {
  if (autoScanning.value) {
    stopAutoScan()
  }
  else {
    startAutoScan()
  }
}

const scanBtnDisabled = computed(() => {
  return scanning.value || autoScanning.value
})

// auto ping
const autoPing = new Auto(async () => {
  if (!networkInfo.value)
    return
  console.log('ping')
  const { firstAddressLong, lastAddressLong } = networkInfo.value.subnetInfo
  const pingRsps = await window.electronAPI.pingRange(
    firstAddressLong,
    lastAddressLong,
  )
  pingRsps.forEach((pingRsp) => {
    const device = devices.value.find(v => v.ip === pingRsp.inputHost)
    device && (device.ping = pingRsp.alive)
  })
})

onMounted(() => {
  autoPing.start()
})
onUnmounted(() => {
  stopAutoScan()
  autoPing.stop()
})
</script>

<template>
  <v-card
    title="LAN Devices"
    prepend-icon="mdi-lan"
    flat
    class="d-flex flex-column"
    :rounded="0"
    :loading="scanning"
  >
    <template #append>
      <div
        class="d-flex aligh-center"
        style="gap: 10px"
      >
        <div class="text-body2 d-flex align-center">
          <span class="pr-2 text-grey-darken-1">Devices seen:</span>
          <span>{{ pingableDevicesNum }} / {{ devicesNum }}</span>
        </div>
        <v-divider vertical />
        <v-btn
          variant="text"
          color="primary"
          prepend-icon="mdi-refresh"
          :disabled="scanBtnDisabled"
          @click="scan"
        >
          Scan
        </v-btn>
        <v-btn
          variant="text"
          color="primary"
          :prepend-icon="autoScanning ? 'mdi-stop' : 'mdi-autorenew'"
          @click="handleAutoScanClick"
        >
          {{ autoScanning ? 'Stop' : 'Auto' }}
        </v-btn>
      </div>
    </template>
    <v-card-text class="flex-column h-0 pb-0">
      <LanDevicesTable :devices="devices" />
    </v-card-text>
  </v-card>
</template>
