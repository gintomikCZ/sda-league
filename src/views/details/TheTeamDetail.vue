<template>
<div>
  <h1>detail týmu</h1>

  <sda-loading v-if="loading"/>

  <template v-else-if="team">
    <ul>
      <li>
        <div>team:</div>
        <div>{{ team.team }}</div>
      </li>
      <li>
        <div>description:</div>
        <div>{{ description }}</div>
      </li>
      <li>
        <div>city:</div>
        <div>{{ team.city }}</div>
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
      :message="'do you really want to delete team ' + team.team + ' ' + team.city + '?'"
      @close-me="showDeleteConfirm = false"
      @cancel-clicked="showDeleteConfirm = false"
      @confirm-clicked="deleteRecord"/>
    <sda-modal
      :show="showError"
      title="record can not be deleted"
      :message="errorMessage"
      @close-me="showError = false"
      :show-cancel="false"
      confirm-label="OK"
      @confirm-clicked="showError = false"/>
  </template>

  <template v-else>
    <p>team has not been found</p>
  </template>
</div>
</template>

<script>
import db from '../../utilities/db.js'
import SdaLoading from '../../components/SdaLoading.vue'
import SdaModal from '../../components/SdaModal.vue'
export default {
  name: 'TheTeamDetail',
  data () {
    return {
      loading: true,
      showDeleteConfirm: false,
      showError: false,
      errorMessage: ''
    }
  },
  computed: {
    team () {
      return this.$store.state.team
    },
    description () {
      return this.team.description || ''
    }
  },
  created () {
    return this.$store.dispatch('fetchTeam', this.$route.params.id).then(() => {
      this.loading = false
    })
  },
  methods: {
    onEditClicked () {
      this.$router.push('/teamform/' + this.$route.params.id)
    },
    onDeleteClicked () {
      this.showDeleteConfirm = true
    },
    deleteRecord () {
      const proms = [
        db.get('players?teamid=' + this.$route.params.id),
        db.get('news?teamid=' + this.$route.params.id)
      ]
      Promise.all(proms).then(data => {
        if(data[0].length + data[1].length === 0) {
          return db.delete('teams', {
            id: this.$route.params.id
          }).then(() => {
            this.$router.push('/teams')
          })
        }
        this.showDeleteConfirm = false
        this.errorMessage = 'the team can not be deleted, '
        if (data[0].length && data[1].length) {
          this.errorMessage += 'it has related players and articles.'
        } else if(data[0].length) {
          this.errorMessage += 'it has related players.'
        } else {
          this.errorMessage += 'it has related articles.'
        }
        this.showError = true
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