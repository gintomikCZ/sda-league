<template>
  <h1>Home</h1>

  <!-- login form -->
  <template v-if="displayLoginForm">

    <sda-form
      :form-settings="formSettings"
      @submited="onSubmited"/>

    <!-- link na registrační form -->
    <div class="register">
      <div>aren't you registered yet?</div>
      <sda-button label="register" @clicked="$router.push('/registration')"/>
    </div>

    <sda-modal
      :show="showModal"
      title="error"
      :message="errorMessage"
      :show-x="false"
      :show-cancel="false"
      confirm-label="OK"
      @confirm-clicked="onConfirmClicked"
    />

  </template>
  <!-- login form -->

  <template v-else>
    <div>{{ 'welcome ' + username }}</div>
  </template>

</template>

<script>
import SdaForm from '../components/form/SdaForm.vue'
import SdaButton from '../components/SdaButton.vue'
import SdaModal from '../components/SdaModal.vue'
export default {
  name: 'TheHome',
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
          initValue: '',
          options: [],
          rules: [
            { rule: 'required', 'message': 'password is required' }
          ]
        },
      }
    }
  },
  computed: {
    displayLoginForm () {
      return !this.$store.state.user
    },
    username () {
      return this.$store.state.user.username || ''
    },
    showModal () {
      return  this.$store.state.loginError
    },
    errorMessage () {
      return  this.$store.state.loginErrorMessage
    }
  },
  methods: {
    onSubmited (data) {
      const dataToSend = {
        username: data.username,
        password: data.password
      }
      return this.$store.dispatch('login', dataToSend)
    },
    onConfirmClicked () {
      this.$store.commit('setLoginError', '')
    }
  },
  components: { SdaButton, SdaForm, SdaModal }
}
</script>

<style lang="stylus" scoped>
.register
  display: flex
  flex-direction: column
  margin-top: 2rem
  align-items: center
  & > div
    margin-bottom: .5rem
</style>