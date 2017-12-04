<template>
  <div id="app">
    <ele-header :seller="seller"></ele-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import EleHeader from './components/EleHeader'

  export default {
    name: 'app',
    data() {
      return {
        seller: {}
      }
    },
    created() {
      let self = this
      this.$axios.get('/api/seller')
        .then(res => {
          res = res.data
          if (res.errno === 0) {
            self.seller = res.data
          }
        })
        .catch(error => {
          alert(error)
        })
    },
    components: {
      EleHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      font-size 14px
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .tab-item
        flex 1
        text-align center
        & > a
          display block
          color rgb(77, 85, 93)
          &.active
            color rgb(240, 20, 20)
</style>
