<template>
  <div>
    <el-container>
      <el-aside :style="{ width: flag ? '63px' : '200px' }">
        <Aside :flag="flag"></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header :flag="flag" @fold="fold"></Header>
        </el-header>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from './app_aside.vue'
import Header from './app_header.vue'
import Main from './app_main.vue'
export default {
  components: { Aside, Header, Main },
  data() {
    return {
      flag: false
    }
  },

  mounted() {},

  methods: {
    fold() {
      this.flag = !this.flag
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #18bc9c;
}

.el-aside {
  background-color: #222d32;

  height: 100vh;
}

.el-main {
  background-color: #e8edf0;
}
</style>
