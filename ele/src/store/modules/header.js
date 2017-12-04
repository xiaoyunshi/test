import * as types from '../mutation-types'

const state = {
  index: 0,
  timer: 0,
  length: 0,
  height: 16
}
const mutations = {
  [types.RECEIVE_LENGTH](state, length) {
    state.length = length
  }
}

const actions = {
  startHeaderTransition({commit, state}, el) {
    clearInterval(state.timer)
    state.timer = setInterval(() => {
      state.index++
      commit(types.ADD_TRANSITION, {el})
      let y = -state.index * state.height + 'px'
      commit(types.SET_TRANSLATE, {el, x: 0, y, z: 0})
    }, 1500)
  },
  transitionAgain({state, commit}, {el}) {
    if (state.index >= state.length) {
      state.index = 0
      commit(types.REMOVE_TRANSITION, {el})  // 移除动画效果
      commit(types.SET_TRANSLATE, {el, x: 0, y: 0, z: 0}) // 跳转到第一张
    }
  }
}

export default {
  state,
  mutations,
  actions
}
