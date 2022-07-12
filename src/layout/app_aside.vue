<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#222D32"
      text-color="#fff"
      active-text-color="#FFD04B"
      router
      :collapse="flag"
      :collapse-transition="false"
      :default-active="menuPath"
    >
      <Menu v-for="(item, index) in list" :key="index" :data="item"></Menu>
    </el-menu>
  </div>
</template>

<script>
import Menu from './Menu/Menu'
import { mapActions } from 'vuex'
import store from '@/store'
import router from '@/router'

export default {
  components: { Menu },
  props: ['flag'],
  data() {
    return {
      list: [],
      menuPath: ''
    }
  },

  mounted() {
    this.getlist()
  },

  methods: {
    ...mapActions(['login/navMenu']),
    async getlist() {
      await this['login/navMenu']()
      this.list = store.state.login.menus
    }
  },
  watch: {
    $route: {
      handler() {
        const data = router.currentRoute
        this.menuPath = data.path
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
