import axios from 'axios'

axios.defaults.baseURL = 'https://sdaapi.glabazna.eu'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'json'

const checkUrl = (url) => {
  return url.substr(0, 1) === '/' ? url : '/' + url
}


export default {
  // načítá záznam(y)
  // get(players) - načte záznamy všech hráčů
  // get(players/1) - načte 1 záznam hráče s id 1
  get (path) {
    return axios({
      method: 'get',
      url: checkUrl(path),
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      console.error(error)
    })
  },

  // ukládá nový záznam
  post (path, body) {
    return axios({
      method: 'post',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      console.error(error)
    })
  },

  // edituje existující záznam
  // id se může psát do url, stejně tak do body
  // put(players/1, {first: 'Jenda'})
  // put(players, {id: 1, first: 'Jenda'})
  put (path, body) {
    return axios({
      method: 'put',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      console.error(error)
    })
  },

  // maže záznam s daným id
  // id může být v url nebo v body
  // delete('players/1') - smaže hráče s id 1
  // delete('players', {id: 1}) - smaže hráče s id 1
  delete (path, body) {
    return axios({
      method: 'delete',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      console.error(error)
    })
  }


}