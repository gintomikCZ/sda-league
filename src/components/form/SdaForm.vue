<template>
<form @submit="onSubmit">
  <form-input
    v-for="control in Object.keys(formSettings)"
    :key="control"
    :label="formSettings[control].label"
    :type="formSettings[control].type"
    :control="control"
    :help-message="formSettings[control].helpMessage"
    :rules="formSettings[control].rules"
    :options="formSettings[control].options"
    :init-value="formSettings[control].initValue"
    :emit-on-input="formSettings[control].emitOnInput || false"
    @input-changed="onInputChanged"
    @control-input="onControlInput"
  />
  <sda-button label="submit" type="submit"/>
</form>
</template>


<script>

import FormInput from './FormInput.vue'

export default {
  name: 'SdaForm',
  props: {
    formSettings: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      formData: {}
    }
  },
  created () {
    Object.keys(this.formSettings).forEach(control => {
      Object.defineProperty(this.formData, control, {
        value: this.formSettings[control].initValue,
        writable: true
      })
    })
  },
  methods: {

    onSubmit (e) {
      e.preventDefault()
      this.$emit('submited', this.formData)
    },

    onInputChanged (payload) {
      this.formData[payload.control] = payload.value
      this.$emit('input-changed', payload)
    },

    onControlInput (payload) {
      this.$emit('control-input', payload)
    }
  },
  components: { FormInput }

}
</script>

<style lang="stylus">

</style>