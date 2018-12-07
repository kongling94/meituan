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
               :rules="rules"
               status-icon>
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
            <template slot="append">
              <el-button size="mini"
                         type="primary"
                         @click="sendMsg">发送验证码</el-button>
            </template>
          </el-input>
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
                    type="password"
                    minlength="6">
            <template slot="prepend">
              密码
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password2"
                    prop="password2"
                    type="password"
                    minlength="6">
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
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('密码不能为空'))
              } else {
                if (value.length < 6) {
                  callback(new Error('密码不能少于6位'))
                }
              }
              callback()
            }
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
                callback(new Error('密码不能为空'))
              } else {
                if (value !== this.form.password) {
                  callback(new Error('两次密码不一样'))
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
      const _self = this;
      let namePass, emailPass;
      if (_self.timerid) {
        return false
      }
      this.$refs['form'].validateField('name', (value) => {
        namePass = value
      })
      _self.statusMsg = ''
      if (namePass) {
        return false
      }
      this.$refs['form'].validateField('email', (value) => {
        emailPass = value
      })
      if (!namePass && !emailPass) {
        _self.$axios.post('/user/verify', {
          username: encodeURI(_self.form.name),
          email: encodeURI(_self.form.email),
          password: encodeURI(_self.form.password)
        }).then(({ status, data }) => {
          if (status === 200 && data && data.code === 0) {
            let count = 60;
            _self.statusMsg = `验证码已发送，剩余${count--}秒`
            _self.timerid = setInterval(() => {
              _self.statusMsg = `验证码已发送，剩余${count--}秒`
              if (count === 0) {
                clearInterval(_self.timerid)
              }
            }, 1000);
          } else {
            _self.statusMsg = data.msg
          }
        })
      }
    },
    register () {

    }
  }
}
</script>
<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
