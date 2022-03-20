<template>
<div>
  <nav>
    <!-- zobrazit jen když šířka viewportu je víc než 520 -->
    <div v-if="viewportWidth > 520">
      <ul  class="horizontal-list">
        <li
          v-for="link in links"
          :key="link.name"
        >
          <router-link :to="link.link">
            {{ link.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <!-- zobrazit, když je šířka míň nž 520 -->
    <ul class="horizontal-list" v-else>
      <li>
        <a @click="showMenu = !showMenu">menu</a>
      </li>
    </ul>
    <div>
      <transition name="roll-down">
        <ul v-if="showMenu" class="vertical-list">
          <li
            v-for="link in links"
            :key="link.name"
          >
            <router-link :to="link.link">
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </transition>
    </div>
  </nav>
  <div class="user-text">
    <sda-button
      :label="userButtonLabel"
      @clicked="onUserButtonClicked"/>
    <span>{{ userText }}</span>
  </div>
</div>
</template>

<script>

export default {
  name: 'NavBar',
  data () {
    return {
      links: [
        { name: 'home', link: '/' },
        { name: 'teams', link: '/teams' },
        { name: 'players', link: '/players' },
        { name: 'games', link: '/games' },
        { name: 'news', link: '/news' },
        { name: 'league', link: '/league' }
      ],
      viewportWidth: window.innerWidth,
      showMenu: false
    }
  },
  computed: {
    userText () {
      return this.$store.state.user ? 'user: ' + this.$store.state.user.username : 'no user'
    },
    userButtonLabel () {
      return this.$store.state.user ? 'logout' : 'login'
    }
  },
  created () {
    window.addEventListener('resize', () => {
      this.setViewportWidth()
    })
  },
  methods: {
    setViewportWidth () {
      this.viewportWidth = window.innerWidth
    },
    onUserButtonClicked () {
      if(!this.$store.state.user) {
        this.$router.push('/')
        return
      }
      this.$store.commit('setUser', null)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'
@import '../styles/transitions.styl'

nav
  background: $primary
  padding: 5px 2rem
ul
  margin: 0
  padding: 0
  list-style-type: none

.horizontal-list
  display: flex
  justify-content: space-between

.vertical-list
  position: absolute
  border: 1px solid $secondary
  background: $primary-text

.vertical-list li
  text-align: left
  & a
    color: $primary
    &:hover
      color: $secondary-text


a
  display: block;
  padding: 15px 10px
  text-decoration: none
  font-weight: bold
  transition: all .3s ease
  cursor: pointer
  color: $primary-text
  &:hover
    background: $secondary
    color: $secondary-text

.menu-button
  padding: 15px 10px
  color: inherit
  font-weight: bold
  cursor: pointer
  transition: background .3s ease
  display: inline-block

.menu-button:hover
  background: #efefef

.user-text
  display: flex
  justify-content: flex-end
  align-items: center
  margin-top: 0.5rem
  & button
    margin-right: 1rem
    cursor: pointer
    padding: .5em .8em

</style>