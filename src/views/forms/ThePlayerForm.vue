<template>
  <div>
    <h1>{{ title }}</h1>
    <sda-loading v-if="loading && !showModal"/>

    <sda-form v-else-if="!showModal"
      :form-settings="formSettings"
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
  name: 'ThePlayerForm',
  data () {
    return {
      formSettings: {
        first: {
          control: 'first',
          type: 'text',
          label: 'first name',
          helpMessage: "the player's first name",
          initValue: '',
          options: [],
          rules: [
            { rule: 'required', 'message': 'The first name is required' }
          ]
        },
        last: {
          control: 'last',
          type: 'text',
          label: 'last name',
          helpMessage: "the player's last name",
          initValue: '',
          options: [],
          rules: [
            { rule: 'required', 'message': 'The last name is required' }
          ]
        },
        position: {
          control: 'position',
          type: 'select',
          label: 'position',
          helpMessage: 'the player\'s position',
          initValue: '',
          options: [ 'forward', 'stopper', 'goalkeeper'],
          rules: []
        },
        teamid: {
          control: 'teamid',
          type: 'select',
          label: 'team',
          helpMessage: 'the team',
          initValue: '',
          options: [],
          rules: []
        },
        dateofbirth: {
          control: 'dateofbirth',
          type: 'date',
          label: 'date',
          helpMessage: 'the date of birth of the player',
          initValue: '',
          options: [],
          rules: []
        },
      },
      loading: true,
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
        this.formSettings.teamid.options = data.map(team => {
          return { value: team.id, label: team.team + ' ' + team.city }
        })
      })
    const promises = [firstPromise]
    if(this.$route.params.id) {
      const secondPromise =
        db.get('players/' + this.$route.params.id).then(data => {
          Object.keys(this.formSettings).forEach(control => {
            this.formSettings[control].initValue = data[control]
          })
        })
      promises.push(secondPromise)
    }
    return Promise.all(promises).then(() => {
        this.loading = false
      })
  },
  computed: {
    title () {
      return this.$route.params.id ? 'Edit player' : 'New player'
    }
  },
  methods: {
    onSubmited (data) {
      // platí pro přidání nového záznamu
      const dataToSave = {
        first: data.first,
        last: data.last,
        position: data.position,
        teamid: data.teamid,
        dateofbirth: data.dateofbirth
      }
      if (this.$route.params.id) {
        dataToSave.id = this.$route.params.id
      }
      const url = this.$route.params.id ? '/player/' + this.$route.params.id : 'players'
      const prom = this.$route.params.id ? db.put('players', dataToSave) : db.post('players', dataToSave)
      return prom.then(() => {
        this.$router.push(url)
      })
    }

    //   if (!this.$route.params.id) {
    //     return db.post('players', {
    //       first: data.first,
    //       last: data.last,
    //       position: data.position,
    //       teamid: data.teamid,
    //       dateofbirth: data.dateofbirth
    //     }).then(() => {
    //       this.$router.push('/players')
    //     })
    //   }
    //   // pro editaci
    //   return db.put('players', {
    //     id: this.$route.params.id,
    //     first: data.first,
    //     last: data.last,
    //     position: data.position,
    //     teamid: data.teamid,
    //     dateofbirth: data.dateofbirth
    //   }).then(() => {
    //     this.$router.push('/player/' + this.$route.params.id)
    //   })
    // }
  },
  components: { SdaForm, SdaLoading, SdaModal }
}
</script>

<style lang="stylus">

</style>