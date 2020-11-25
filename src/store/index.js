import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isShowHistory: false,
    history: JSON.parse(localStorage.getItem('calculationHistory')) || []
  },
  getters: {
		getShowHistory: state => {
			return state.isShowHistory
    },
    getHistory: state => {
			return state.history
		}
	},
  mutations: {
    SET_MODALHISTORY (state, value) {
      state.isShowHistory = value
    },
    UPDATE_HISTORY (state, value) {
      state.history.push(value)
      localStorage.setItem('calculationHistory', JSON.stringify(state.history));
    },
    CLEAR_HISTORY (state) {
      state.history = [];
      localStorage.removeItem('calculationHistory');
    }
  },
  actions: {
    setModalHistory ({ commit }, value) {
      commit('SET_MODALHISTORY', value)
    },
    updateHistory ({ commit }, value) {
      commit('UPDATE_HISTORY', value)
    },
    clearHistory ({ commit }) {
      commit('CLEAR_HISTORY')
    }
  }
})
