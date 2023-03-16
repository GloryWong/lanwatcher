<template>
  <v-btn
    variant="text"
    block
    @click="show = true"
  >
    {{ vendorInfo.company }}
  </v-btn>
  <v-dialog
    v-model="show"
    width="auto"
  >
    <v-card title="Vendor">
      <v-card-text>
        <div
          class="d-flex flex-column"
          style="gap: 2px"
        >
          <div
            v-for="{ name, value } in infoDisplay"
            :key="name"
            class="d-flex"
          >
            <div
              style="width: 125px"
              class="mr-2 text-body-1 text-grey-darken-1 flex-shrink-0 text-right"
            >
              {{ name }}:
            </div>
            <div class="text-body-1">{{ value }}</div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          color="primary"
          @click="show = false"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { VendorInfo } from '~~/electron/utils/getVendorInfos';

const props = defineProps<{
  vendorInfo: VendorInfo;
}>();

const show = ref(false);

const infoDisplay = computed(() => {
  const { company, address, city, country, flag } = props.vendorInfo;
  return [
    { name: 'Company', value: company },
    { name: 'Address', value: address },
    { name: 'City', value: city },
    { name: 'Country/Region', value: `${country} ${flag}` },
  ];
});
</script>
