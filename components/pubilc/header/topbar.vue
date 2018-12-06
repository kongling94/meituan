<template>
  <el-row :gutter="0">
    <el-col :span="5">
      <geo></geo>
    </el-col>
    <el-col :span="5">
      <user></user>
    </el-col>
    <el-col :span="14">
      <navbar></navbar>
    </el-col>

  </el-row>
</template>
<script>
import geo from './geo'
import user from './user'
import navbar from './nav'
export default {
  components: {
    geo,
    user,
    navbar
  }
}
</script>
<style lang="scss">
// @import "@/assets/css/public/layout.scss";
</style>

