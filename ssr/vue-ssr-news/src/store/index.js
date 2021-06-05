import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const api_url = 'http://localhost:3001/api/'

let state = {
  list: [],
  detail: {}
}

let actions = {
  fetchList({commit}, data) {
    return axios.get(api_url + 'queryNewsList').then(res => {
      commit('setList', res.data.data)
    })
  },
  fetchDetail({commit}, data) {
    return axios.get(api_url + 'queryNewsDetail?id=' + data.id).then(res => {
      commit('setDetail', res.data.data)
    })
  }
}

let mutations = {
  setList(state, data) {
    state.list = data
  },
  setDetail(state, data) {
    state.detail = data
  }
}

let getters = {
  getList: state => {
    return state.list
  },
  getDetail: state => {
    return state.detail
  }
}

export function createStore () {
  return new Vuex.Store({
    state,
    actions,
    mutations,
    getters
  })
}
