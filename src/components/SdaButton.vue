<template>
  <button
    :type="type"
    @click="$emit('clicked')"
    >{{ label }}</button>
</template>

<script>
export default {
  name: 'SdaButton',
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'button'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'

button
  background: $primary
  color: $primary-text
  padding: .5em .8em
  font-size: 1.1rem
  border: none
  transition: all .4s ease
  cursor: pointer
  &:hover
    background: $secondary
    color: $secondary-text

</style>