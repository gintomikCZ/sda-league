<template>
  <div>
    <h1>{{ title }}</h1>
    <sda-loading v-if="loading && !showModal"/>

    <sda-form v-else-if="!showModal"
      :form-settings="formSettings"
      @input-changed="onInputChanged"
      @submited="onSubmited"/>

    <sda-modal
      :show="showModal"
      title="unknown user"
      message="please log in first"
      :show-x="false"
      confirm-label="login"
      :show-cancel="false"
      @confirm-clicked="$router.push('/')"
    />

  </div>
</template>

<script>
import db from '../../utilities/db.js'
import SdaForm from '../../components/form/SdaForm.vue'
import SdaLoading from '../../components/SdaLoading.vue'
import SdaModal from '../../components/SdaModal.vue'

export default {
  name: 'TheGameForm',
  data () {
    return {
      formSettings: {
        hometeamid: {
          control: 'hometeamid',
          type: 'select',
          label: 'home team',
          helpMessage: "select the home team",
          initValue: '',
          options: [],
          rules: [
            { rule: 'required', 'message': 'The home team is required' }
          ]
        },
        awayteamid: {
          control: 'awayteamid',
          type: 'select',
          label: 'away team',
          helpMessage: "select the away team",
          initValue: '',
          options: [],
          rules: [
            { rule: 'required', 'message': 'The away team is required' }
          ]
        },
        date: {
          control: 'date',
          type: 'date',
          label: 'date',
          helpMessage: 'enter the date of the match',
          initValue: '',
          options: [],
          rules: [
            { rule: 'required', 'message': 'The date of the match is required' }
          ]
        },
        hometeamgoals: {
          control: 'hometeamgoals',
          type: 'number',
          label: 'home team goals',
          helpMessage: 'enter the number of goals scored by the home team',
          initValue: '',
          options: [],
          rules: []
        },
        awayteamgoals: {
          control: 'awayteamgoals',
          type: 'number',
          label: 'away team goals',
          helpMessage: 'enter the number of goals scored by the away team',
          initValue: '',
          options: [],
          rules: []
        },
      },
      loading: true,
      teamOptions: [],
      showModal: false
    }
  },
  created () {
    if (!this.$store.state.user) {
      this.showModal = true
      return
    }
    const firstPromise =
      db.get('teams').then((data) => {
        this.teamOptions = data.map(team => {
          return { value: team.id, label: team.team + ' ' + team.city }
        })
        this.formSettings.hometeamid.options = this.teamOptions.slice()
        this.formSettings.awayteamid.options = this.teamOptions.slice()
      })

    const promises = [firstPromise]
    if(this.$route.params.id) {
      const secondPromise =
        db.get('games/' + this.$route.params.id).then(data => {
          Object.keys(this.formSettings).forEach(control => {
            this.formSettings[control].initValue = data[control]
          })
          this.formSettings.hometeamid.options = this.filterOptions(data.awayteamid)
          this.formSettings.awayteamid.options = this.filterOptions(data.hometeamid)
        })
      promises.push(secondPromise)
    }

    return Promise.all(promises).then(() => {
        this.loading = false
      })
  },
  computed: {
    title () {
      return this.$route.params.id ? 'Edit match' : 'New match'
    }
  },
  methods: {
    onSubmited (data) {
      const dataToSave = {
        hometeamid: data.hometeamid,
        awayteamid: data.awayteamid,
        date: data.date,
        hometeamgoals: data.hometeamgoals,
        awayteamgoals: data.awayteamgoals
      }
      if (this.$route.params.id) {
        dataToSave.id = this.$route.params.id
      }
      const url = this.$route.params.id ? '/game/' + this.$route.params.id : '/games'
      const prom = this.$route.params.id ? db.put('games', dataToSave) : db.post('games', dataToSave)
      return prom.then(() => {
        this.$router.push(url)
      })
    },
    filterOptions(value) {
      const index = this.teamOptions.findIndex((item) => item.value === value)
      const ar = this.teamOptions.slice()
      if (!value) return ar
      ar.splice(index, 1)
      return ar
    },
    onInputChanged (payload) {
      if (payload.control === 'hometeamid') {
        this.formSettings.awayteamid.options = this.filterOptions(payload.value)
        return
      }
      if (payload.control === 'awayteamid') {
        this.formSettings.hometeamid.options = this.filterOptions(payload.value)
      }
    }
  },
  components: { SdaForm, SdaLoading, SdaModal }
}
</script>

<style lang="stylus">

</style>