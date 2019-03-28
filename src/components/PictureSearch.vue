<template>
  <div class="picture">
    <div class="picture-scroll" ref="scroll">
      <div class="picture-item" v-for="item in data" :key="item.id">
        <div class="picture-item-wrapper">
          <img :src="item.imgs">
        </div>
      </div>
    </div>
    <div class="picture-loadmore" v-if="isLoadCompleted">加载更多</div>
    <div class="picture-showmore" v-if="showMore" @click="showMoreResult">显示更多结果</div>
  </div>
</template>

<script>
export default {
  name: 'PictureSearch',
  data () {
    return {
      data: [],   // 图片列表
      isLoadCompleted: false,   // 正在加载
      page: 1,   // 当前页
      showMore: false   // 显示更多结果
    }
  },
  methods: {
    // 获取图片列表
    getData(page) {
      this.$http.getImgsList(page).then(res => {
        if (res.data.code === 200) {
          this.isLoadCompleted = false
          this.data = this.data.concat(res.data.data)
        }
      })  
    },
    // 页面滚动
    onScroll() {
      // 可滚动容器的高度
      let innerHeight = this.$refs.scroll.offsetHeight
      // 可视窗口高度
      let outerHeight = document.documentElement.clientHeight
      // 可滚动容器超出当前窗口显示范围的高度
      let scrollTop = document.documentElement.scrollTop;
      // 页面滚动到底部
      console.log(innerHeight + " " + outerHeight + " " + scrollTop);
      // scrollTop有误差？
      if (innerHeight <= (outerHeight + scrollTop + 1)) {
        // 当页数是4的倍数时显示更多结果
        if (this.page % 4 === 0) {
          this.showMore = true
        } else {
          //加载更多操作
          this.isLoadCompleted = true
          this.page++
          this.getData(this.page)
        }
      }
    },
    // 显示更多结果
    showMoreResult() {
      this.page++
      this.getData(this.page)
      this.showMore = false
    }
  },
  created() {
    // 页面图片初值
    this.getData(this.page)
    // 滚动事件监听
    window.addEventListener("scroll", this.onScroll)
  }
}
</script>

<style lang="scss">
.picture {
  .picture-scroll {
    padding: 12px;
    display: flex;
    flex-wrap: wrap;
    &::after{ // 用于最后一行最后的位置显示空白
      content: '';
      flex-grow: 99999;// 放到最大
    }

    .picture-item {
      height: 200px;
      margin: 12px;
      flex-grow: 1;

      .picture-item-wrapper {
        height: 200px;
        background: #f7f7f7;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        img {
          max-height: 200px;
          min-width: 100%;
          object-fit: cover; // 让图片不要压缩
        }
      }
    }
  }

  .picture-loadmore {
    width: 100%;
    height: 100px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .picture-showmore {
    margin: 30px auto;
    width: 300px;
    height: 20px;
    border: 1px solid #999;
    background: #ccc;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
  }
}
</style>
