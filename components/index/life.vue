<template>
  <div class="m-life">
    <el-row>
      <el-col :span="14">
        <slider></slider>
      </el-col>
      <el-col :span="4">
        <div class="m-life-pic"></div>
      </el-col>
      <el-col :span="6">
        <div class="m-life-login">
          <h4><img src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg"
                 alt="login"></h4>
          <p class="m-life-login-name">Hi！你好</p>
          <p>
            <nuxt-link to="/register">
              <el-button round
                         size="medium">註冊</el-button>
            </nuxt-link>
          </p>
          <p>
            <nuxt-link to="/login">
              <el-button round
                         size="medium">立即登錄</el-button>
            </nuxt-link>
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <div class="m-life-hotel"></div>
      </el-col>
      <el-col :span="7">
        <div class="m-life-music"></div>
      </el-col>
      <el-col :span="4">
        <div class="m-life-coop"></div>
      </el-col>
      <el-col :span="6">
        <div class="m-life-downapp">
          <img src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png"
               alt="下载APP">
          <p class="app-name">美团APP手机版</p>
          <h4><span class="red">1元起</span><span class="gary">吃喝玩乐</span></h4>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import slider from './slider'
export default {
  components: {
    slider
  }
}
</script>
<style lang="scss">
@import "@/assets/css/index/life.scss";
</style>
