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
  name: 'TheTeamForm.vue',
  data () {
    return {
      formSettings: {
        team: {
          control: 'team',
          type: 'text',
          label: 'team',
          helpMessage: 'insert the name of the team',
          initValue: '',
          options: [],
          rules: [
            { rule: 'required', 'message': 'The name of the team is required' }
          ]
        },
        description: {
          control: 'description',
          type: 'textarea',
          label: 'description',
          helpMessage: 'the short description of the team',
          initValue: '',
          options: [],
          rules: []
        },
        city: {
          control: 'city',
          type: 'text',
          label: 'city',
          helpMessage: 'the city where the team lives',
          initValue: '',
          options: [],
          rules: [
            { rule: 'required', 'message': 'The name of the city is required' }
          ]
        },
      },
      loading: true,
      showModal: false
    }
  },
  computed: {
    title () {
      return this.$route.params.id ? 'Edit team' : 'New Team'
    }
  },
  created () {
    if (!this.$store.state.user) {
      this.showModal = true
      return
    }
    const prom = this.$route.params.id
      ? db.get('teams/' + this.$route.params.id).then(data => {
          Object.keys(this.formSettings).forEach(control => {
            this.formSettings[control].initValue = data[control]
          })
        })
      : Promise.resolve()

    return prom.then(() => {
      this.loading = false
    })
  },
  methods: {
    onSubmited (data) {
      const dataToSave = {
        team: data.team,
        description: data.description,
        city: data.city
      }
      if (this.$route.params.id) {
        dataToSave.id = this.$route.params.id
      }

      const url = this.$route.params.id ? '/team/' + this.$route.params.id : '/teams'
      const prom = this.$route.params.id ? db.put('teams', dataToSave) : db.post('teams', dataToSave)

      return prom.then(() => {
        this.$router.push(url)
      })
    }
  },
  components: { SdaForm, SdaLoading, SdaModal }
}
</script>

<style lang="stylus">

</style>