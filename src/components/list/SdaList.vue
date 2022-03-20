<template>
<ul>
  <!-- <template v-for="(row, index) in rows" :key="row.id">
    <sda-list-item
      :content="row.team + ' ' + row.city"
      is-title
      :is-bordered="!row.description" />
    <sda-list-item
      :content="row.description"
      :is-bordered="index + 1 < rows.length"
      is-description />
  </template> -->
  <slot></slot>
</ul>
</template>

<script>
// import SdaListItem from './SdaListItem.vue'
export default {
  name: 'SdaList',
  // props: {
  //   rows: {
  //     validator: (v) => Array.isArray(v),
  //     default: []
  //   }
  // },
  // components: { SdaListItem }
}
</script>

<style lang="stylus" scoped>
@import '../../styles/variables.styl'
ul
  margin: 0 auto
  width: 80%
  list-style-type: none
  padding: 0
  border: 1px solid $secondary


</style>