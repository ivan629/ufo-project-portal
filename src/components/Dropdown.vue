<template>
  <v-overflow-btn
    class="my-2"
    :items="items"
    label="Select year"
    counter
    item-value="value" />
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }

};
</script>
