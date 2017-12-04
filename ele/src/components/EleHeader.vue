<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <ul ref="support">
            <li v-for="item in seller.supports.concat([seller.supports[0]])" :key="item.id">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
        </div>
        <div class="support-count" @click="showDetail" v-if="seller.supports">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="250%"/>
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <Star :size="48" :score="seller.score"></Star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-list" v-for="item in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hiddenDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Star from './star/Star.vue'
  import {mapActions, mapMutations} from 'vuex'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        classMap: this.$store.state.classMap,
        detailShow: false
      }
    },
    methods: {
      ...mapMutations(['RECEIVE_LENGTH']),
      ...mapActions(['startHeaderTransition', 'transitionAgain', 'transitionEnd']),
      showDetail() {
        this.detailShow = true
      },
      hiddenDetail() {
        this.detailShow = false
      }
    },
    components: {
      Star
    },
    watch: {
      seller(val) {
        if (val.supports) {
// 我们发现数据可以获取到但组件无法获取 原因页面还没重绘
//          console.log(this.seller, this.$refs.support)
          this.RECEIVE_LENGTH(val.supports.length)
          this.$nextTick(() => {
            // 数据获取完毕后页面重绘需要时间
            // $nextTick等待页面 加载完毕
//            console.log(this.seller, this.$refs.support)
            this.transitionEnd({
              el: this.$refs.support,
              callback: () => {
                this.transitionAgain({el: this.$refs.support})
              }
            })
            this.startHeaderTransition(this.$refs.support)
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin"
  .header
    position relative
    color #fff
    background rgba(7, 17, 27, 0.5)
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      font-size 0
      .avatar
        display inline-block
        vertical-align top
        border-radius 3px
        overflow hidden
      .content
        display inline-block
        margin-left 16px
        .title
          margin 2px 0 8px
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image("../common/img/brand")
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            line-height 18px
            font-size 16px
            font-weight bold
        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
          font-weight 200
        .support
          overflow hidden
          height 12px
          li
            margin-bottom 4px
            &:last-child
              margin-bottom 0
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            background-size 12px 12px
            background-repeat no-repeat
            margin-right 4px
            icon-Img("../common/img", 1)
          .text
            line-height 12px
            font-size 10px

        .support-count
          position absolute
          right 12px
          bottom 14px
          padding 0 8px
          height 24px
          line-height 24px
          border-radius 14px
          background rgba(0, 0, 0, 0.2)
          text-align center
          .count
            vertical-align top
            font-size 10px
            font-weight 200
          .icon-keyboard_arrow_right
            display inline-block
            margin-left 2px
            margin-top 1px
            line-height 24px
            font-size 12px

    .bulletin-wrapper
      padding 0 12px
      width 100%
      display flex
      height 28px
      line-height 28px
      font-size 0
      white-space nowrap
      background rgba(7, 17, 27, 0.2)
      .bulletin-title
        flex 0 0 22px
        display inline-block
        vertical-align top
        margin-top 8px
        width 22px
        height 12px
        bg-image('../common/img/bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        flex 1
        margin-left 4px
        vertical-align top
        font-size 10px
        overflow: hidden
        text-overflow ellipsis
      .icon-keyboard_arrow_right
        flex 0 0 4px
        display inline-block
        line-height 28px
        font-size 10px

    .background
      position: absolute
      top 0
      left: 0
      width 100%
      height 100%
      overflow hidden
      filter blur(10px)
      z-index -1
    .detail
      position fixed
      z-index 100
      top 0
      left 0
      height 100%
      width 100%
      overflow auto
      transition all 0.5s
      background: rgba(7, 17, 27, 0.8)
      &.fade-enter, &.fade-leave-active
        opacity 0
      .detail-wrapper
        width 100%
        min-height 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            line-height 16px
            text-align center
            font-size 16px
            font-weight 700
          .star-wrapper
            margin-top 16px
            text-align center
          .title
            display flex
            padding 0 36px
            margin 28px auto 24px
            .line
              flex 1
              position relative
              top -8px
              border-bottom 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding 0 12px
              font-size 14px
              font-weight 700
          .supports
            margin 0 auto
            padding 0 36px
            .support-list
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .icon
                margin-right 6px
                display inline-block
                height 16px
                width 16px
                background-size 16px 16px
                background-repeat no-repeat
                vertical-align top
                icon-Img("../common/img", 2)
              .text
                line-height 12px
                font-size 12px
                font-weight 200
          .bulletin
            padding 0 36px
            margin 0 auto
            .content
              padding 0 12px
              line-height 24px
              font-size 12px
              font-weight 200
      .detail-close
        position relative
        height 32px
        width 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
</style>
