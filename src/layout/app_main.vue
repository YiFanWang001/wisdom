<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/" v-if="$router.currentRoute.path != '/'">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in list" :key="index">
            {{ item }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
import router from '@/router'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {},
  methods: {
    ...mapActions(['login/tags'])
  },
  watch: {
    $route: {
      handler() {
        const data = router.currentRoute
        const array = []
        data.matched.forEach((item) => {
          array.push(item.meta.title)
        })
        this.list = array
        this['login/tags'](data)
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
