<template>
<table>
  <thead>
    <table-row :values="headers" is-header />
  </thead>
  <tbody>
    <table-row v-for="(row, index) in rows" :key="'row number' + index" :values="row"/>
  </tbody>
</table>
</template>

<script>
import TableRow from "./TableRow.vue";
export default {
  name: "SdaTable",
  components: { TableRow },
  props: {
    rows: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    }
  },

};
</script>

<style lang="stylus" scoped>

table
  margin: 1rem auto
  border-collapse: collapse

</style>
