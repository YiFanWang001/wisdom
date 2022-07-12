<template>
  <div class="app">
    <h1>智慧服务平台</h1>
    <nav>
      <h2>欢迎登录</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            suffix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            :show-password="true"
            suffix-icon="el-icon-s-goods"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="ruleForm.code" class="code"></el-input>
          <img :src="$store.state.login.imgs" alt="" class="imgs" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" class="login" :loading="loading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </nav>
    <p>© 2022 浙ICP备16028135号-1 All Rights Reserved | DUCK</p>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
import store from '@/store'

export default {
  data() {
    return {
      ruleForm: {
        username: 'duck',
        password: 'admin888',
        code: 'abcde',
        token: ''
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  },

  mounted() {
    this.getlist()
  },

  methods: {
    ...mapActions(['login/getlogin', 'login/Login']),
    async getlist() {
      await this['login/getlogin']()
      this.ruleForm.token = store.state.login.key
      console.log(this.ruleForm.token)
    },
    submitForm() {
      this.clicklogin()
    },
    async clicklogin() {
      this.loading = true
      try {
        await this['login/Login'](this.ruleForm)
        const token = store.state.login.token

        if (token) {
          this.$notify({
            title: '成功',
            message: '登录成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '失败',
            message: '登录失败',
            type: 'error',
            duration: 2000
          })
        }
      } catch (error) {
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    ...mapState(['login/imgs', 'login/key'])
  }
}
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/background.jpg') no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
h1,
h2,
p {
  color: #ffffff;
}
h1 {
  font-size: 42px;
}
h2 {
  font-size: 30px;
}

.login {
  width: 100%;
  background-color: #f56c6c;
  color: #ffffff;
  border: 0;
}
.code {
  width: 50%;
}
.imgs {
  width: 45%;
  height: 33px;
}
.el-form {
  width: 320px;
}
</style>
