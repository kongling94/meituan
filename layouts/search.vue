<template>
  <div class="search">
    <el-input placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input21">
    </el-input>
    <nuxt />
  </div>
</template>
<script>
export default {
  data () {
    return {
      input21: ''
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>

