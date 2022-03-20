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
  name: 'TheNewsForm',
  data () {
    return {
      formSettings: {
        title: {
          control: 'title',
          type: 'text',
          label: 'title',
          helpMessage: 'the title of the article',
          initValue: '',
          options: [],
          rules: [
            { rule: 'required', 'message': 'The title is required' }
          ]
        },
        content: {
          control: 'content',
          type: 'textarea',
          label: 'content',
          helpMessage: 'the content of the article',
          initValue: '',
          options: [],
          rules: []
        },
        teamid: {
          control: 'teamid',
          type: 'select',
          label: 'team',
          helpMessage: 'the team',
          initValue: '',
          options: [],
          rules: [
            { rule: 'required', 'message': 'The team is required' }
          ]
        },
        date: {
          control: 'date',
          type: 'date',
          label: 'date',
          helpMessage: 'the date when the article was published',
          initValue: '',
          options: [],
          rules: [
            { rule: 'required', 'message': 'The date is required' }
          ]
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
        db.get('news/' + this.$route.params.id).then(data => {
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
      return this.$route.params.id ? 'Edit article' : 'New article'
    }
  },
  methods: {
    onSubmited (data) {
      const dataToSave = {
        title: data.title,
        content: data.content,
        teamid: data.teamid,
        date: data.date
      }
      if (this.$route.params.id) {
        dataToSave.id = this.$route.params.id
      }
      const url = this.$route.params.id ? '/news/' + this.$route.params.id : 'news'
      const prom = this.$route.params.id ? db.put('news', dataToSave) : db.post('news', dataToSave)
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