<template>
  <div>
    <sda-button
      label="add new"
      class="mb-1rem"
      @clicked="onAddNewClicked"
    />
    <sda-modal
      :show="showModal"
      title="unknown user"
      message="please log in first"
      :show-x="false"
      confirm-label="login"
      cancel-label="cancel"
      @confirm-clicked="$router.push('/')"
      @cancel-clicked="showModal = false"
    />
  </div>
</template>

<script>
import SdaModal from './SdaModal.vue'
export default {
  name: 'AddNewButton',
  props: {
    formName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    formNameComputed () {
      return this.formName.substring(0, 1) === '/' ? this.formName : '/' + this.formName
    }
  },
  methods: {
    onAddNewClicked () {
      if (this.$store.state.user) {
        this.$router.push(this.formNameComputed)
        return
      }
      this.showModal = true
    }
  },
  components: { SdaModal }
}
</script>

<style lang="stylus">

</style>