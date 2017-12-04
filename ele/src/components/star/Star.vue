<template>
  <div class="star" :class="starType">
    <span v-for="item in starArr" class="star-item" :class="item"></span>
  </div>
</template>

<script>
  export default {
    props: {
      size: {
        type: Number  // 星星的尺寸
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size
      },
      starArr() {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasHalf = score % 1 !== 0
        for (let i = 0; i < 5; i++) {
          if (i < Math.floor(score)) {
            result.push('on')
            continue
          }
          if (hasHalf && i === Math.floor(score)) {
            result.push('half')
            continue
          }
          result.push('off')
        }
        return result
      }
    },
    data() {
      return {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        star-Img('../../common/img/star48_')
        &:last-child
          margin-right 0
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 11px
        background-size 15px 15px
        star-Img('../../common/img/star36_')
        &:last-child
          margin-right 0
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 4px
        background-size 10px 10px
        star-Img('../../common/img/star36_')
        &:last-child
          margin-right 0
</style>
