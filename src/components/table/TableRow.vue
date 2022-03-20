<template>
  <tr>
    <table-cell
      v-for="item in values"
      :key="item"
      :content="item"
      :is-header="isHeader"
    />
  </tr>
</template>

<script>

import TableCell from "./TableCell.vue";
export default {
  name: "tableRow",
  components: { TableCell },
  // values = ['jabko', 'hruška', 'švestka']

  /* values  = [
    { label: 'jabko', link: 'www.jabko.cz', centered: true }
    { label: 'hruška', link: 'www.hruska.cz', centered: false }
    ]
  */
  props: {
    values: {
      type: Array,
      default: () => []
    },
    isHeader: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
