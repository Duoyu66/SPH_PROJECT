<template>
  <!-- 商品分类导航 -->
  <div class="type-nav" @mouseleave="leaveshow ">
    <div class="container"  >
      <div  @mouseenter="entershow"> <h2 class="all">全部商品分类</h2></div>
      <nav class="nav">
        <a href="http://www.baidu.com">服装城</a>
        <a href="http://www.baidu.com">美妆馆</a>
        <a href="http://www.baidu.com">尚品汇超市</a>
        <a href="http://www.baidu.com">全球购</a>
        <a href="http://www.baidu.com">闪购</a>
        <a href="http://www.baidu.com">团购</a>
        <a href="http://www.baidu.com">有趣</a>
        <a href="http://www.baidu.com">秒杀</a>
      </nav>
<!--    //动画得用transition标签包裹-->

      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch" @mouseleave="leaveIndex">
            <div class="item" v-for="(c1,index) in categoryList" v-show="index!==16" :key="c1.categoryId"
                 :class="{cur:currentIndex===index}">
              <h3 @mouseenter="changeIndex(index)">
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName }}</a>
              </h3>
              <div class="item-list clearfix" :style="{display:currentIndex===index?'block':'none'}">
                <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName"
                         :data-category2Id="c2.categoryId">{{ c2.categoryName + c2.categoryId }}</a>
                    </dt>
                    <dd>
                      <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c2.categoryName"
                           :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>



      </transition>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import _, {throttle} from 'lodash'
//这种引入的方式是把loadsh全部的功能引入
// console.log(_)
export default {
  name: "TypeIndex",
  data() {
    return {
      currentIndex: -1,
      show: true
    }
  },
  mounted() {

    //组件挂载完毕,让show的属性为false
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  methods: {
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    leaveIndex() {
      this.currentIndex = -1;
    },
    goSearch(event) {
      //event.target:获取到的是出发事件的元素(div、h3、a、em、dt、dl)
      let node = event.target;
      console.log('node',node)
      //给a标签添加自定义属性data-categoryName,全部的字标签当中只有a标签带有自定义属性，别的标签名字----dataset纯属扯淡
      let {categoryname, category1id, category2id, category3id} = node.dataset;
      //第二个问题解决了：点击的到底是不是a标签（只要这个标签身上带有categoryname）一定是a标签
      //当前这个if语句：一定是a标签才会进入
      if (categoryname) {
        //准备路由跳转的参数对象
        let location = {name: "search"};
        let query = {categoryName: categoryname};
        //一定是a标签：一级目录
        if (category1id) {
          query.category1Id = category1id;
          //一定是a标签：二级目录
        } else if (category2id) {
          query.category2Id = category2id;
          //一定是a标签：三级目录
        } else {
          query.category3Id = category3id;
        }
        //判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }
      }
    },
    //当鼠标移入的时候，让商品分类列表进行展示
    entershow() {
      if (this.$route.path !== '/home') {
        this.show = true;
      }
    },
    //当鼠标离开的时候，让商品分类列表进行隐藏
    leaveshow() {
      //将currentIndex设为-1
      this.currentIndex = -1;
      if (this.$route.path !== '/home') {
        this.show = false;
      }
    }

  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryList

    })
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //&:hover {
          //  .item-list {
          //    display: block;
          //  }
          //}
        }
        .cur{
          background-color: skyblue;
        }
      }
    }
    //动画进入开始的动画
    .sort-enter{
      height: 0;
    }
    //过渡动画结束状态(进入)
    .sort-enter-to{
      height: 461px;
    }
    //定义动画时间、速率
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}

</style>
