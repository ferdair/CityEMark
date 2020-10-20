import axios from 'axios'
import env from '../config/env'

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  getAux(state) {
    return state.aux
  },
}
export const state = () => ({
  aux: null,
})

export const mutations = {
  SET_AUX(state, message) {
    state.aux = message
  },
  SET_USER(state, mutation) {
    state.auth.user = mutation
  },
  SET_UComercio(state, mutation) {
    state.auth.user.idComercio = mutation
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const {
      data: {
        data: [data],
      },
    } = await axios.get(env.endpoint + '/auxiliarComercio.php')
    commit('SET_AUX', data)
  },
}
