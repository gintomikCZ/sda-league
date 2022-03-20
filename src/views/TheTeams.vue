<template>
<div>
  <h1>teams</h1>

  <sda-loading v-if="loading"/>

  <template v-else>

    <!-- <sda-button
      label="add new"
      class="mb-1rem"
      @clicked="$router.push('/teamform')"/> -->

    <add-new-button form-name="teamform" />

    <sda-list>
      <template v-for="(row, index) in teams" :key="row.id">
        <sda-list-item
          :content="row.team + ' ' + row.city"
          is-title
          :is-bordered="!row.description"
          is-link
          @clicked="$router.push('/team/' + row.id)"/>
        <sda-list-item
          :content="row.description"
          :is-bordered="index + 1 < teams.length"
          is-description />
      </template>
    </sda-list>

  </template>

</div>
</template>

<script>
import SdaList from '../components/list/SdaList.vue'
import SdaListItem from '../components/list/SdaListItem.vue'
import SdaLoading from '../components/SdaLoading.vue'
import AddNewButton from '../components/AddNewButton.vue'
export default {
  name: 'TheTeams',
  data () {
    return {
      loading: true,
    }
  },
  created () {
    return this.$store.dispatch('fetchTeams').then(() => {
      this.loading = false
    })
  },
  computed: {
    teams () {
      return this.$store.state.teams
    }
  },
  components: { SdaList, SdaLoading, AddNewButton, SdaListItem }
}
</script>

<style lang="stylus">

</style>