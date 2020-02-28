import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const dc = document.body.clientWidth

const state = {
  ws:dc<860?'small':'big',
  mySelf:false
}

window.onresize = function () { 
  const w = document.body.clientWidth
  const s = state.ws
  if (w >= 860 && s === 'small'){
    Vue.set(state, 'ws', 'big')
  }else if(w<860 && s ==='big'){
    Vue.set(state,'ws','small')
  }
}

export default new Vuex.Store({
  state,
  mutations: {
    getMySelf(state,mySelf){
      state.mySelf=mySelf;
      window.sessionStorage.setItem('mySelf',true)
    }
  },
  actions: {
    getMySelf(val,mySelf){
      val.commit('getMySelf',mySelf)
    }
  },
  getters: {
    ws:_=>_.ws
  }
})
