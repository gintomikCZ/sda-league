<template>
  <th
    v-if="isHeader"
    :class="{
      'left': !isCentered,
      'center': isCentered,
      'is-link': isLink
      }"
    @click="onClick">{{ contentToDisplay }}</th>
  <td
    v-else
    :class="{
      'left': !isCentered,
      'center': isCentered,
      'is-link': isLink
      }"
    @click="onClick">{{ contentToDisplay }}</td>
</template>

<script>
export default {
  name: "tableCell",
  props: {
    content: {
      validator: (v) => typeof v === "object" || typeof v === "string",
    },
    isHeader: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    linkWithDash () {
      return this.link[0] === '/' ? this.link : '/' + this.link
    },
    contentToDisplay () {
      return typeof this.content === 'string' ? this.content : this.content.label
    },
    isLink () {
      return (typeof this.content === 'object') && ('link' in this.content) && this.content.link
    },
    isCentered () {
      return (typeof this.content === 'object') && ('centered' in this.content) && this.content.centered
    },
    link () {
      return (typeof this.content === 'object') && ('link' in this.content) ? this.content.link : ''
    }
  },
  methods: {
    onClick() {
      if (this.isLink) {
        this.$router.push(this.linkWithDash)
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../styles/variables.styl'
th
  background-color: $primary
  color: $primary-text
  padding: .35em .7em

.left
  text-align: left

.center
  text-align: center

td, th
  padding: .35em .7em
  border: 1px solid lighten($secondary, 50%)

</style>
