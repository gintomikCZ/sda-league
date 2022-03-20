import { createStore } from 'vuex'
import db from '../utilities/db.js'

export default createStore({
  state: {
    teams: [],
    news: [],
    players: [],
    player: null,
    team: null,
    article: null,
    games: [],
    game: null,
    user: null,
    loginError: false,
    loginErrorMessage: ''
  },

  // mutace se volají jako commit
  mutations: {
    setTeams (state, ar) {
      state.teams = ar
    },
    setNews (state, ar) {
      state.news = ar
    },
    setPlayers (state, ar) {
      state.players = ar
    },
    setTeam (state, record) {
      state.team = record
    },
    setPlayer (state, record) {
      state.player = record
    },
    setArticle (state, record) {
      state.article = record
    },
    setGames (state, ar) {
      state.games = ar
    },
    setGame (state, record) {
      state.game = record
    },
    setUser (state, record) {
      state.user = record
      if (!record) {
        window.localStorage.removeItem('user')
      } else {
        window.localStorage.setItem('user', record.id + ',' + record.username)
      }
    },
    setLoginError (state, message) {
      state.loginErrorMessage = message
      state.loginError = !!message
    }
  },

  actions: {
    fetchTeams (context) {
      db.get('teams').then((data) => {
        context.commit('setTeams', data)
      })
    },
    fetchNews (context) {
      db.get('news').then((data) => {
        context.commit('setNews', data)
      })
    },
    fetchPlayers (context) {
      db.get('players').then((data) => {
        context.commit('setPlayers', data)
      })
    },
    fetchTeam (context, id) {
      db.get('teams/' + id).then((record) => {
        context.commit('setTeam', record)
      })
    },
    fetchPlayer (context, id) {
      db.get('players/' + id).then((record) => {
        context.commit('setPlayer', record)
      })
    },
    fetchArticle (context, id) {
      db.get('news/' + id).then((record) => {
        context.commit('setArticle', record)
      })
    },
    fetchGames (context) {
      db.get('games').then(data => {
        context.commit('setGames', data)
      })
    },
    fetchGame (context, id) {
      db.get('games/' + id).then(record => {
        context.commit('setGame', record)
      })
    },
    login (context, data) {
      db.post('login', data).then(response => {
        if (response.logged === 'yes') {
          context.commit('setUser', response.user)
          context.commit('setLoginError', '')
        } else {
          context.commit('setUser', null)
          context.commit('setLoginError', response.message)
        }
      })
    }
  },
  modules: {
  }
})
