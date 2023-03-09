<template>
  <div class="news-types" v-if="channels.length > 0">
    <div
      class="item"
      v-for="item in showChannels"
      :key="item.id"
      :class="{active:item.id === chooseId}"
      @click="switchChannel(item.id)"
    >
      <span class="name">{{item.name}}</span>
    </div>
    <a @click.prevent="isCollapse=!isCollapse" style="cursor:pointer">{{isCollapse?'展开':'收起'}}</a>
  </div>
</template>

<script>
import { getNewsChannels } from "../services/getNewsData";
import { mapState } from "vuex";

export default {
  data() {
    return {
      isCollapse: true,
      chooseId: ""
    };
  },
  computed: {
    ...mapState("news", ["channels"]),
    showChannels() {
      if (this.isCollapse) {
        return this.channels.slice(0, 8);
      } else {
        return this.channels;
      }
    }
  },
  watch: {
    channels: {
      immediate: true,
      handler() {
        if (this.channels.length > 0) {
          this.switchChannel(this.channels[0].channelId);
        }
      }
    }
  },
  methods: {
    switchChannel(id) {
      this.chooseId = id;
      this.$emit("channelSelected", this.chooseId);
    }
  }
};
</script>

<style scope>
.news-types {
  margin: 30px 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  padding-bottom: 15px;
}
.item {
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 15px;
  margin: 7px 15px 7px 0;
  cursor: pointer;
  position: relative;
}
.item:hover {
  background: #ccc;
}
.item.active {
  background: rgba(0, 0, 0, 0.822);
  color: #fff;
}
.news-types a {
  align-self: flex-end;
  margin-bottom: 20px;
  color: #409eff;
}
</style>
