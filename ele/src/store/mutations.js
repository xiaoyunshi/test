import * as types from './mutation-types'

export default {
  [types.SET_TRANSLATE](state, {el, x, y, z}) {
    el.style.transform = `translate3D(${x},${y},${z})`
    el.style.webkitTransform = `translate3D(${x},${y},${z})`
  },
  [types.ADD_TRANSITION](state, {el}) {
    el.style.transition = 'all 0.5s'
    el.style.webkitTransition = 'all 0.5s'
  },
  [types.REMOVE_TRANSITION](state, {el}) {
    el.style.transition = 'none'
    el.style.webkitTransition = 'none'
  }
}
