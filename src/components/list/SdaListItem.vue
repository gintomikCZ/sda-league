<template>

<li v-if="content"
  :class="{
    'is-title': isTitle,
    'is-bordered': isBordered,
    'is-description': isDescription,
    'is-link': isLink
  }"
  @click="onClick">
  <span>{{ content }}</span>
  <span class="right-side">{{ rightSide }}</span>
</li>

</template>

<script>
export default {
  name: 'SdaListItem',
  props: {
    content: {
      type: String
    },
    isTitle: {
      type: Boolean,
      default: false
    },
    isBordered: {
      type: Boolean,
      default: false
    },
    isDescription: {
      type: Boolean,
      default: false
    },
    rightSide: {
      type: String,
      default: ''
    },
    isLink: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick () {
      if (this.isLink) {
        this.$emit('clicked')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../styles/variables.styl'

li
  padding: .5rem .8rem
  text-align: left
.is-title
  font-size: 1.1rem
  font-weight: bold
.is-description
  font-size: 0.85rem
.is-bordered
  border-bottom: 1px solid lighten($secondary, 60)
.right-side
  float: right

</style>