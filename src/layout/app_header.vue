<template>
  <div class="header">
    <div>
      <el-button
        class="fold"
        :class="flag ? 'el-icon-s-unfold ' : 'el-icon-s-fold'"
        @click="fold"
      ></el-button>
      <el-tag
        v-for="(item, index) in $store.state.login.tags"
        :key="index"
        :closable="item.path != '/'"
        :class="tagPath === item.path ? 'tags' : 'tag'"
        @click="$router.push(item.path)"
        @close="closeTag(item.meta.title)"
      >
        {{ item.meta.title }}
      </el-tag>
    </div>
    <div class="right">
      <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
        <i class="el-icon-rank"></i>
      </el-tooltip>

      <el-tooltip
        class="item"
        effect="dark"
        content="关闭全部标签"
        placement="bottom"
      >
        <i class="el-icon-circle-close" @click="Allerror"></i>
      </el-tooltip>
      <div class="block">
        <el-avatar
          :size="40"
          :src="$store.state.login.avatar"
          class="avatar"
        ></el-avatar>
      </div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <b> {{ $store.state.login.nameinfo }} </b>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人设置</el-dropdown-item>
          <el-dropdown-item command="error">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from '@/store'
import router from '@/router'
export default {
  props: ['flag'],
  data() {
    return {
      tagPath: ''
    }
  },

  mounted() {
    this.getlist()
  },
  watch: {
    $route: {
      handler() {
        const data = router.currentRoute
        this.tagPath = data.path
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapActions([
      'login/herinfo',
      'login/error',
      'login/closeTags',
      'login/AllError'
    ]),
    async getlist() {
      await this['login/herinfo']()
    },
    Allerror() {
      this['login/AllError']()
      router.push('/')
    },
    fold() {
      this.$emit('fold')
    },
    handleCommand(command) {
      if (command === 'error') {
        this.error()
        // console.log(1)
      }
    },
    closeTag(name) {
      this['login/closeTags'](name)
      if (router.currentRoute.meta.title === name) {
        router.push('/')
      }
    },
    error() {
      // console.log(11)
      this.$confirm('是否退出该账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this['login/error']()
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 0 7px;
}
.fold {
  border: 0;
  background-color: #18bc9c;
  font-size: 25px;
}
.tags {
  background-color: #e6a23c;
  color: #fff;
  border: 0;
}
.tag {
  background-color: #fff;
  color: #e6a23c;
  border: 0;
}
b {
  cursor: pointer;
  font-size: 18px;
  color: white;
  font-weight: bold;
}
i {
  font-size: 25px;
  color: #fff;
  margin: 0 5px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  line-height: 60px;
}
.block {
  display: inline-block;
  margin-top: 20px;
}
.right {
  display: flex;
  align-items: center;
}
</style>
