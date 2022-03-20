import { createRouter, createWebHistory } from 'vue-router'

import TheHome from '../views/TheHome.vue'
import TheTeams from '../views/TheTeams.vue'
import ThePlayers from '../views/ThePlayers.vue'
import TheGames from '../views/TheGames.vue'
import TheNews from '../views/TheNews.vue'
import TheLeague from '../views/TheLeague.vue'
import TheTeamForm from '../views/forms/TheTeamForm.vue'
import TheNewsForm from '../views/forms/TheNewsForm.vue'
import ThePlayerForm from '../views/forms/ThePlayerForm.vue'
import TheTeamDetail from '../views/details/TheTeamDetail.vue'
import ThePlayerDetail from '../views/details/ThePlayerDetail.vue'
import TheNewsDetail from '../views/details/TheNewsDetail.vue'
import TheGameForm from '../views/forms/TheGameForm.vue'
import TheGameDetail from '../views/details/TheGameDetail.vue'
import TheRegistrationForm from '../views/forms/TheRegistrationForm.vue'
import UnknownUser from '../views/UnknownUser.vue'

import store from '../store/index.js'

const routes = [
  // domácí stránka
  { path: '/', name: 'home', component: TheHome },

  // registrace uživatele
  { path: '/registration', name: 'registration', component: TheRegistrationForm },

  // seznam týmů
  { path: '/teams', name: 'teams', component: TheTeams },
  // seznam hráčů
  { path: '/players', name: 'players', component: ThePlayers },
  // seznam zápasů
  { path: '/games', name: 'games', component: TheGames },
  // seznam článků
  { path: '/news', name: 'news', component: TheNews },

  // tabulka ligy
  { path: '/league', name: 'league', component: TheLeague },

  // formulář nový tým
  { path: '/teamform', name: 'teamForm', component: TheTeamForm, },
  // formulář nový článek
  { path: '/newsform', name: 'newsForm', component: TheNewsForm },
  // formulář nový hráč
  { path: '/playerform', name: 'playerForm', component: ThePlayerForm },
  // formulář nový zápas
  { path: '/gameform', name: 'gameForm', component: TheGameForm },

  // detail týmu
  { path: '/team/:id', name: 'teamDetail', component: TheTeamDetail },
  // detail hráče
  { path: '/player/:id', name: 'playerDetail', component: ThePlayerDetail },
  // detail článku
  { path: '/news/:id', name: 'newsDetail', component: TheNewsDetail },
  // detail zápasu
  { path: '/game/:id', name: 'gameDetail', component: TheGameDetail },

  // edit hráče
  { path: '/playerform/:id', name: 'playerFormEdit', component: ThePlayerForm },
  // edit týmu
  { path: '/teamform/:id', name: 'teamFormEdit', component: TheTeamForm },
  // edit článku
  { path: '/newsform/:id', name: 'newsFormEdit', component: TheNewsForm },
  // edit zápasu
  { path: '/gameform/:id', name: 'gameFormEdit', component: TheGameForm },

  //unknown user
  { path: '/unknownuser', name: 'unknownUser', component: UnknownUser }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  const user = window.localStorage.getItem('user')

  if (user) {
    const userSplitted = user.split(',')
    store.commit('setUser', {
      id: userSplitted[0],
      username: userSplitted[1]
    })
  }

  if (to.name.indexOf('Form') > -1 && !store.state.user) {
    next({ name: 'unknownUser' })
    return
  }
  next()

})

export default router
