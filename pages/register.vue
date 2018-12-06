<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/"
           class="site-logo"></a>
        <span class="login"><em class="bold">登录到已有账号 </em>
          <a href="/login">
            <el-button type="primary"
                       size="small"
                       class="login_btn">登錄</el-button>
          </a></span>

      </header>
    </article>

    <section>
      <h4 class="title">账号注册</h4>
      <el-form ref="form"
               :model="form">
        <el-form-item>
          <el-input v-model="form.phone">
            <template slot="prepend">
              手机号
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.code">
            <template slot="prepend">
              验证码
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.name">
            <template slot="prepend">
              用户名
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.password">
            <template slot="prepend">
              密码
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="form.password">
            <template slot="prepend">
              确认密码
            </template>
          </el-input>
        </el-form-item>

        <el-form-item class="submit_btn">
          <el-button type="primary"
                     @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
export default {
  layout: 'blank',
  data () {
    return {
      form: {
        name: '',
        phone: '',
        code: '',
        password: '',
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!');
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
