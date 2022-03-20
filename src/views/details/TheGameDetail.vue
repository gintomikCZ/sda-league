<template>
<div>
  <h1>game detail</h1>

  <sda-loading v-if="loading"/>

  <template v-else-if="game">
    <ul>
      <li>
        <div>home team:</div>
        <div>{{ game.hometeam + ' ' + game.hometeamcity }}</div>
      </li>
      <li>
        <div>away team:</div>
        <div>{{ game.awayteam + ' ' + game.awayteamcity }}</div>
      </li>
      <li>
        <div>date:</div>
        <div>{{ formatedDate }}</div>
      </li>
      <li>
        <div>score</div>
        <div>{{ score }}</div>
      </li>
    </ul>
    <div class="buttons-div">
      <sda-button
        label="edit"
        @clicked="onEditClicked"/>
    </div>
    <div class="buttons-div">
      <sda-button
      label="delete"
      @clicked="onDeleteClicked"/>
    </div>
    <sda-modal
      :show="showDeleteConfirm"
      title="confirm deleting"
      :message="'do you really want to delete match ' + game.hometeam + ' - ' + game.awayteam + ' ?'"
      @close-me="showDeleteConfirm = false"
      @cancel-clicked="showDeleteConfirm = false"
      @confirm-clicked="deleteRecord"/>
  </template>

  <template v-else>
    <p>game has not been found</p>
  </template>


</div>



</template>

<script>
import db from '../../utilities/db.js'
import dateFunctions from '../../utilities/dateFunctions.js'
import SdaLoading from '../../components/SdaLoading.vue'
import SdaModal from '../../components/SdaModal.vue'
export default {
  name: 'TheGameDetail',
  data () {
    return {
      loading: true,
      showDeleteConfirm: false
    }
  },
  computed: {
    game () {
      return this.$store.state.game
    },
    formatedDate () {
      return dateFunctions.formatDate(this.game.date)
    },
    score () {
      return this.game.hometeamgoals === null ? 'not played yet' : this.game.hometeamgoals + ' : ' + this.game.awayteamgoals
    }
  },
  created () {
    return this.$store.dispatch('fetchGame', this.$route.params.id).then(() => {
      this.loading = false
    })
  },
  methods: {
    onEditClicked () {
      this.$router.push('/gameform/' + this.$route.params.id)
    },
    onDeleteClicked () {
      this.showDeleteConfirm = true
    },
    deleteRecord () {
      return db.delete('games', {
        id: this.$route.params.id
      }).then(() => {
        this.$router.push('/games')
      })
    }
  },
  components: { SdaLoading, SdaModal }
}
</script>

<style lang="stylus" scoped>
@import '../../styles/variables.styl'
ul
  list-style-type: none
  margin: 0 auto
  padding: 0
  width: 80%
  border: 1px solid $secondary
  & li
    padding: .35em .5em
    display: flex
    justify-content: space-between
    & div
      width: 50%
      text-align: left

</style>