<template>
<div>
  <h1>games</h1>

  <sda-loading v-if="loading" />

  <template v-else>

    <add-new-button form-name="/gameform" />

    <sda-table :rows="rows" :headers="headers" />

  </template>

</div>
</template>

<script>

import dateFunctions from '../utilities/dateFunctions.js'
import SdaTable from "../components/table/SdaTable.vue";
import SdaLoading from "../components/SdaLoading.vue";
import AddNewButton from '../components/AddNewButton.vue'

export default {
  name: 'TheGames',
  data () {
    return {
      loading: true,
      headers: ['hometeam', 'awayteam', 'score', 'date' ]
    }
  },
  computed: {
    games () {
      const copy = this.$store.state.games.slice()
      return copy.sort((a, b) => {
        return a.date.localeCompare(b.date)
      })
    },
    rows () {
      return this.games.map((game) => {
        return [
          {
            label: game.hometeam + ' ' + game.hometeamcity,
            link: '/team/' + game.hometeamid
          },
          {
            label: game.awayteam + ' ' + game.awayteamcity,
            link: '/team/' + game.awayteamid
          },
          {
            label: game.hometeamgoals === null ? '-' : game.hometeamgoals + ' : ' + game.awayteamgoals,
            link: '/game/' + game.id,
            centered: true
          },
          {
            label: dateFunctions.formatDate(game.date),
            link: '/game/' + game.id
          }
        ]
      })
    }
  },
  created () {
    return this.$store.dispatch('fetchGames').then(() => {
      this.loading = false
    })
  },
  components: { SdaTable, SdaLoading, AddNewButton },

}
</script>

<style lang="stylus">

</style>