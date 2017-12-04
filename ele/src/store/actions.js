export const transitionEnd = (context, {el, callback}) => {
  if (typeof el === 'object') {
    el.addEventListener('transitionEnd', function () {
      callback && callback()
    })
    el.addEventListener('webkitTransitionEnd', function () {
      callback && callback()
    })
  }
}
