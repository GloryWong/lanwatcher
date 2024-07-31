<script setup lang="ts">
const { networkInfo } = useNetworkInfo()

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
      name: 'IP version',
      value: networkInfo.value?.family,
    },
  ]
})

const sudbnetInfoDialogShow = ref(false)
</script>

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
            />
          </v-col>
          <v-col>
            <MyDeviceItem name="Subnet info">
              <v-btn
                density="comfortable"
                variant="flat"
                icon="mdi-information-slab-circle-outline"
                @click="sudbnetInfoDialogShow = true"
              />
              <v-dialog
                v-model="sudbnetInfoDialogShow"
                width="auto"
              >
                <v-card title="Subnet Info">
                  <v-card-text>
                    <MyDeviceSubnetInfo />
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn
                      color="primary"
                      @click="sudbnetInfoDialogShow = false"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </MyDeviceItem>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
