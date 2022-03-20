<template>
<div>
  <h1>player's detail</h1>

  <sda-loading v-if="loading"/>

  <template v-else-if="player">
    <ul>
      <li>
        <div>first name:</div>
        <div>{{ player.first }}</div>
      </li>
      <li>
        <div>last name:</div>
        <div>{{ player.last }}</div>
      </li>
      <li>
        <div>position:</div>
        <div>{{ position }}</div>
      </li>
      <li>
        <div>team:</div>
        <div>{{ team }}</div>
      </li>
      <li>
        <div>date of birth:</div>
        <div>{{ dateOfBirth }}</div>
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
      :message="'do you really want to delete player ' + player.first + ' ' + player.last + '?'"
      @close-me="showDeleteConfirm = false"
      @cancel-clicked="showDeleteConfirm = false"
      @confirm-clicked="deleteRecord"/>
  </template>

  <template v-else>
    <p>player has not been found</p>
  </template>


</div>



</template>

<script>
import db from '../../utilities/db.js'
import dateFunctions from '../../utilities/dateFunctions.js'
import SdaLoading from '../../components/SdaLoading.vue'
import SdaModal from '../../components/SdaModal.vue'
export default {
  name: 'ThePlayerDetail',
  data () {
    return {
      loading: true,
      showDeleteConfirm: false
    }
  },
  computed: {
    player () {
      return this.$store.state.player
    },
    dateOfBirth () {
      return this.player.dateofbirth ? dateFunctions.formatDate(this.player.dateofbirth) : 'datum narození není k dispozici'
    },
    team () {
      return this.player.team ? this.player.team + this.player.city : 'volný hráč'
    },
    position () {
      return this.player.position || 'neuvedeno'
    }
  },
  created () {
    return this.$store.dispatch('fetchPlayer', this.$route.params.id).then(() => {
      this.loading = false
    })
  },
  methods: {
    onEditClicked () {
      this.$router.push('/playerform/' + this.$route.params.id)
    },
    onDeleteClicked () {
      this.showDeleteConfirm = true
    },
    deleteRecord () {
      return db.delete('players', {
        id: this.$route.params.id
      }).then(() => {
        this.$router.push('/players')
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