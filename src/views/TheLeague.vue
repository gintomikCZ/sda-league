<template>
<div>
  <h1>league</h1>

   <sda-loading v-if="loading" />

  <template v-else>

    <sda-table :rows="rows" :headers="headers" />

  </template>

</div>
</template>

<script>

import SdaTable from "../components/table/SdaTable.vue";
import SdaLoading from "../components/SdaLoading.vue";

export default {
  name: 'TheLeague',
  data () {
    return {
      headers: ['rank', 'team', 'games', 'points', 'score'],
      loading: true
    }
  },
  computed: {
    games () {
      return this.$store.state.games
    },
    teams () {
      return this.$store.state.teams
    },
    rows () {
      const ar = this.teams.map((team) => {
        let gamesPlayed = 0
        let points = 0
        let goalsActive = 0
        let goalsPassive = 0
        this.games.forEach(game => {
          if (game.hometeamid === team.id) {
            gamesPlayed += 1
            if (game.hometeamgoals > game.awayteamgoals) {
              points += 3
            } else if (game.hometeamgoals === game.awayteamgoals) {
              points += 1
            }
            goalsActive += game.hometeamgoals
            goalsPassive += game.awayteamgoals
          } else if (game.awayteamid === team.id) {
            gamesPlayed += 1
            if (game.hometeamgoals < game.awayteamgoals) {
              points += 3
            } else if (game.hometeamgoals === game.awayteamgoals){
              points += 1
            }
            goalsActive += game.awayteamgoals
            goalsPassive += game.hometeamgoals
          }
        })
        return [
          // rank
          { label: '1', link: '' },
          //team
          { label: team.team + ' ' + team.city, link: ''},
          //games
          { label: gamesPlayed, link: ''},
          //points
          { label: points, link: '' },
          //score
          { label: goalsActive + ' : ' + goalsPassive, link: '' },
        ]
      })
      return ar.sort((a, b) => {
        if (a[3].label === b[3].label) {
          const scoreArrayA = a[4].label.split(' : ')
          const scoreArrayB = b[4].label.split(' : ')
          const scoreA = parseInt(scoreArrayA[0]) - parseInt(scoreArrayA[1])
          const scoreB = parseInt(scoreArrayB[0]) - parseInt(scoreArrayB[1])
          if (scoreA === scoreB) {
            if (parseInt(scoreArrayA[0]) === parseInt(scoreArrayB[0])) return 0
            return parseInt(scoreArrayA[0]) < parseInt(scoreArrayB[0]) ? + 1 : -1
          }
          return scoreA < scoreB ? 1 : -1
        }
        return a[3].label < b[3].label ? + 1 : -1
      })
      .map((item, index) => {
        const copy = item.slice()
        copy[0].label = index + 1
        return copy
      })
    }
  },
  created () {
    const promises = [
      this.$store.dispatch('fetchGames'),
      this.$store.dispatch('fetchTeams')
    ]
    return Promise.all(promises).then(() => {
      this.loading = false
    })
  },
  components: { SdaTable, SdaLoading }
}
</script>

<style lang="stylus">

</style>