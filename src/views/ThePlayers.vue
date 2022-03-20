<template>
  <div>
    <h1>players</h1>

    <sda-loading v-if="loading" />

    <template v-else>

      <!-- <sda-button
        label="add new"
        class="mb-1rem"
        @clicked="$router.push('/playerform')"
      /> -->

      <add-new-button form-name="playerform" />

      <sda-table :rows="rows" :headers="headers" />

    </template>
  </div>
</template>

<script>
import dateFunctions from '../utilities/dateFunctions.js'
import SdaTable from "../components/table/SdaTable.vue";
import SdaLoading from "../components/SdaLoading.vue";
import AddNewButton from "../components/AddNewButton.vue";

export default {
  name: "ThePlayers",
  components: {
    SdaTable,
    SdaLoading,
    AddNewButton,
  },
  data() {
    return {
      loading: true,
      headers: ['player', 'position', 'team', 'city', 'date of birth']
    };
  },
  created() {
    return this.$store.dispatch("fetchPlayers").then(() => {
      this.loading = false
    })
  },
  computed: {
    players() {
      return this.$store.state.players;
    },
    rows() {
      return this.players.map ((player) => {
        return [
          {
            label: player.last + ' ' + player.first,
            link: '/player/' + player.id
          },
          { label: player.position, link: '' },
          { label: player.team, link: '/team/' + player.teamid },
          { label: player.city, link: '' },
          { label: dateFunctions.formatDate(player.dateofbirth), link: '' }
        ]
      }).sort((a, b) => {
        return (a[0].label + a[2].label).localeCompare(b[0].label + b[2].label)
      })
    }
  },
};
</script>

<style>

</style>
