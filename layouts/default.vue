<template>
  <el-container class="layout-default">
    <el-header height="auto">
      <Myheader></Myheader>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer height="auto">
      <Myfooter></Myfooter>
    </el-footer>
  </el-container>

</template>
<script>
import Myheader from '@/components/pubilc/header/index.vue'
import Myfooter from '@/components/pubilc/footer/index.vue'
export default {
  components: {
    Myheader, Myfooter
  }
}
</script>
<style lang="scss">
@import "@/assets/css/public/layout.scss";
@import "@/assets/css/public/header.scss";
@import "@/assets/css/public/footer.scss";
</style>
