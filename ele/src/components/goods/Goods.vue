<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current': currentIndex === index}"
            @click="selectMenu(index)">
          <span class="text border">
            <span v-if="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border">
              <div class="icon">
                <img :src="food.icon" width="57" height="57"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  // 网页最小显示字体12px  12px以下字体没办法使用line-height 垂直居中
  export default {
    data() {
      return {
        goods: [],
        listHeight: [],
        classMap: this.$store.state.classMap,
        scrollY: 0
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length - 1; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (this.scrollY >= height1 && this.scrollY < height2) {
            return i
          }
        }
        return 0
      }
    },
    methods: {
      initScroll() {
        // chrome 使用iscroll卡顿问题
        // 在index.html 头部加入script标签window.PointerEvent = void 0
        // 这样就可以解决
        var self = this
        this.menuScroll = new IScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new IScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', function () {
//          console.log(this.y)
          self.scrollY = Math.abs(Math.round(this.y))
        })
      },
      calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu(index) {
        let height = this.listHeight[index]
        this.scrollY = height
        this.foodsScroll.scrollTo(0, -height, 300)
      }
    },
    created() {
      this.$axios.get('/api/goods')
        .then(res => {
          res = res.data
          if (res.errno === 0) {
            this.goods = res.data
            this.$nextTick(() => {
              this.initScroll()
              this.calculateHeight()
            })
          }
        })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    font-size 10px
    position absolute
    display flex
    width 100%
    top 174px
    bottom 46px
    overflow: hidden;
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        box-sizing content-box
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          font-weight 700
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          icon-Img("../../common/img", 3)
        .text
          display table-cell
          width 56px
          vertical-align middle // 在table表格中垂直居中
          font-size 10px
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex 1
      .title
        padding-left 14px;
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7

      .food-item
        margin 18px
        padding-bottom 18px
        display flex
        font-size 0
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          margin-bottom 0
          border-none()
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            font-size 14px
            line-height 14px
            color rgb(7, 17, 27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            margin-bottom 8px
          .extra .count
            margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)

</style>
