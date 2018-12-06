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
               :model="form"
               :rules="rules">
        <!--  <el-form-item prop="phone">
          <el-input v-model="form.phone">
            <template slot="prepend">
              手机号
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="form.code"
                    maxlength="4">
            <template slot="prepend">
              验证码
            </template>
          </el-input>
        </el-form-item> -->
        <el-form-item prop="name">
          <el-input v-model="form.name">
            <template slot="prepend">
              用户名
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input v-model="form.email">
            <template slot="prepend">
              邮箱
            </template>
          </el-input>
          <el-button size="mini"
                     round
                     @click="sendMsg">发送验证码</el-button>
          <span class="status">{{statusMsg}}</span>
        </el-form-item>

        <el-form-item prop="code">
          <el-input v-model="form.code"
                    maxlength="4">
            <template slot="prepend">
              验证码
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="form.password"
                    type="password">
            <template slot="prepend">
              密码
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password2"
                    prop="password2"
                    type="password">
            <template slot="prepend">
              确认密码
            </template>
          </el-input>
        </el-form-item>

        <el-form-item class="submit_btn">
          <el-button type="primary"
                     @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
          <div class="error">{{error}}</div>
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
      statusMsg: '',
      error: '',
      form: {
        name: '',
        email: '',
        code: '',
        password: '',
        password2: '',
      },
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入邮箱地址',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        code: [
          {
            required: true,
            type: 'number',
            message: '请输入验证码',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            type: 'string',
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        password2: [
          {
            required: true,
            type: 'string',
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Erroe('密码不能为空'))
              } else {
                if (value !== this.form.password) {
                  callback(new Erroe('两次密码不一样'))
                }
              }
              callback()
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!');
    },
    sendMsg () {

    }
  }
}
</script>
<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
