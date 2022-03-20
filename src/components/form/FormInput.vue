<template>
<div class="container">
  <label :for="control">{{ label }}</label>

  <textarea
    v-if="type==='textarea'"
    :id="control"
    @focus="isFocused = true"
    @blur="onBlur"
    @change="onChange"
    :class="{'is-invalid': !isValid}"
    v-model="value"
    rows="4">
  </textarea>

  <select
    v-else-if="type==='select'"
    :id="control"
    @focus="isFocused = true"
    @blur="onBlur"
    @change="onChange"
    :class="{'is-invalid': !isValid}"
    v-model="value">
    <option
      v-for="option in options"
      :key="option.value || option"
      :value="option.value || option">{{ option.label || option }}
    </option>
  </select>

  <div class="input-container" v-else>
    <input
      :type="inputType"
      :id="control"
      autocomplete="off"
      @focus="isFocused = true"
      @blur="onBlur"
      @change="onChange"
      :class="{'is-invalid': !isValid}"
      @input="onInput"
      ref="myInput"
    />
    <button
      v-if="showPasswordButton"
      class="password-button"
      type="button"
      @click="showPassword = !showPassword"
    >{{ passwordButtonLabel }}</button>
  </div>
  <transition name="fade-out">
    <div v-if="isFocused" class="help-msg">{{ helpMessage }}</div>
  </transition>
  <transition name="fade-out">
    <div v-if="!isValid && !isFocused" class="error-msg">{{ errorMessage }}</div>
  </transition>
</div>
</template>

<script>
import validator from '../../utilities/validator.js'

export default {
  name: 'FormInput',
  props: {
    label: {
      type: String
    },
    control: {
      type: String,
      required: true
    },
    helpMessage: {
      type: String,
      default: ''
    },
    initValue: {
      validator: (v) => typeof v === 'string' || typeof v === 'number',
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    options: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Array,
      default: () => []
    },
    emitOnInput: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputType () {
      if (this.type !== 'password') return this.type
      return  this.showPassword ? 'text' : 'password'
    },
    passwordButtonLabel () {
      return this.showPassword ? 'hide password' : 'show password'
    },
    showPasswordButton () {
      return (this.type === 'password') && (this.value !== '')
    }
  },
  created () {
    this.value = this.initValue
  },
  mounted () {
    if(this.type === 'select' || this.type === 'textarea') {
      return
    }
    this.$refs.myInput.value = this.initValue
  },
  data () {
    return {
      isFocused: false,
      isValid: true,
      value: '',
      errorMessage: '',
      showPassword: false
    }
  },
  methods: {
    onChange() {
      this.$emit('input-changed', { control: this.control, value: this.value })
    },
    validate () {
      this.isValid = true
      this.rules.forEach(rule => {
        if (this.isValid) {
          let result = 'par' in rule ? validator[rule.rule](this.value, rule.par) : validator[rule.rule](this.value)
          if (!result) {
            this.isValid = false
            this.errorMessage = rule.message
          }
        }
      })
    },
    onBlur () {
      this.isFocused = false
      this.validate()
    },
    onInput (e) {
      this.value = e.target.value
      if (this.emitOnInput) {
        this.$emit('control-input', { control: this.control, value: this.value } )
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../styles/transitions.styl'


.container
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: flex-start
  position: relative

label
  font-weight: bold
  font-size: 1.2rem

input, textarea, select
  font-size: 1.2rem
  padding: .4em .8em
  margin-bottom: 1.1rem

.help-msg, .error-msg
  font-size: 0.8rem
  position: absolute
  top: calc(100% - 1.1rem)
.error-msg
  color: red
.is-invalid
  border-left: 5px solid red
.input-container
  display: flex
  align-items: flex-start
.password-button
  display: inline
  margin-top: .7rem
  margin-left: .5rem
</style>