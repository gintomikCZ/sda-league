<template>
<div>
  <h1>New User</h1>

  <sda-form
    :form-settings="formSettings"
    @submited="onSubmited"
    @control-input="onControlInput"/>

  <sda-modal
    :show="showModal"
    :show-x="false"
    :show-cancel="false"
    title="error"
    message="this username is not available"
    confirm-label="OK"
    @confirm-clicked="showModal = false"
  />

  <div class="error-message" v-if="showError">passwords don't match</div>
</div>
</template>

<script>
import SdaForm from '../../components/form/SdaForm.vue'
import SdaModal from '../../components/SdaModal.vue'
import db from '../../utilities/db.js'

export default {
  name: 'TheRegistrationForm',
  data () {
    return {
      formSettings: {
        username: {
          control: 'username',
          type: 'text',
          label: 'user name',
          helpMessage: 'enter your user name, please',
          initValue: '',
          options: [],
          rules: [
            { rule: 'required', 'message': 'user name is required' }
          ]
        },
        password: {
          control: 'password',
          type: 'password',
          label: 'password',
          helpMessage: 'enter your password, please',
          emitOnInput: true,
          initValue: '',
          options: [],
          rules: [
            { rule: 'required', 'message': 'password is required' }
          ]
        },
        password2: {
          control: 'password2',
          type: 'password',
          label: 'retype password',
          helpMessage: 'enter the same password again, please',
          emitOnInput: true,
          initValue: '',
          options: [],
          rules: [
            { rule: 'required', 'message': 'password is required' }
          ]
        },
      },
      password: '',
      password2: '',
      showError: false,
      showModal: false
    }
  },
  methods: {
    onSubmited (data) {
      if (this.showError) {
        return
      }

      return db.get('users?username=' + data.username).then(records => {
        if (records.length) {
          this.showModal = true
          return
        }
        const dataToSave = {
          username: data.username,
          password: data.password
        }
        return db.post('users', dataToSave).then(() => {
          this.$router.push('/')
        })
      })
    },

    onControlInput (payload) {
      if (payload.control === 'username') {
        return
      }
      if (payload.control === 'password') {
        this.password = payload.value
      } else if (payload.control === 'password2') {
        this.password2 = payload.value
      }
      this.showError = this.password !== this.password2
    }
  },
  components: { SdaForm, SdaModal }
}

</script>

<style lang="stylus" scoped>

.error-message
  color: red


</style>

