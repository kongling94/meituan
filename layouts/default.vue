<template>
  <el-container class="layout-default">
    <el-header>
      <Myheader></Myheader>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>
      footer
    </el-footer>
  </el-container>

</template>
<script>
import Myheader from '@/components/pubilc/header/index.vue'
export default {
  components: {
    Myheader
  }
}
</script>
<style lang="scss">
@import "@/assets/css/public/header.scss";
</style>
