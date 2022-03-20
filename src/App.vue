<template>
  <nav-bar/>
  <router-view/>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: { NavBar }
}

</script>

<style lang="stylus">
@import './styles/variables.styl'
@import './styles/global.styl'

</style>
