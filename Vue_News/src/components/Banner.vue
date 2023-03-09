<template>
  <div class="banner-container" @mouseenter="autoStop" @mouseleave="autoStart">
    <ul
      class="images"
      :style="{
        width: banners.length * 100 + '%',
        marginLeft: -index * 100 + '%'
      }"
    >
      <li v-for="item in banners" :key="item.url">
        <a :href="item.link">
          <!-- TIPS 静态资源不能直接使用固定的路径，除非我们将它们作为模块引入(webpack 特性) -->
          <!-- TIPS 静态资源即保存在本地的资源，不是从后台或互联网引入的资源 -->
          <img :src="item.url" />
        </a>
      </li>
    </ul>
    <ul class="dots">
      <li
        v-for="(item, i) in banners"
        :key="item.url"
        :class="{ active: i === index }"
        @click="index = i"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  // NOTE props 推荐使用对象形式，便于后期调试和维护
  props: {
    banners: {
      type: Array, // props 类型校验
      required: true
    },
    duration: {
      type: Number,
      required: true
    }
  },
  created() {
    this.autoStart();
  },
  destroyed() {
    this.autoStop();
  },
  data() {
    return {
      index: 0, // 当前显示的轮播图索引值
      timer: null
    };
  },
  methods: {
    autoStart() {
      if (this.timer) {
        return;
      }
      this.timer = setInterval(() => {
        this.index = (this.index + 1) % this.banners.length;
      }, this.duration);
    },
    autoStop() {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
};
</script>

<style scoped>
.banner-container {
  height: 350px;
  position: relative;
  overflow: hidden;
}
.banner-container li {
  display: block;
  width: 1080px;
  height: 100%;
  float: left;
}
.images {
  height: 100%;
  transition: 1s;
}
.banner-container img {
  width: 1080px;
  height: 100%;
}
.dots {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
}
.dots li {
  width: 10px;
  cursor: pointer;
  height: 10px;
  margin: 0 3px;
  border-radius: 50%;
  border: 1px solid;
  color: #fff;
}
.dots li.active {
  background: #fff;
}
</style>
