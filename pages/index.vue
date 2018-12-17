<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <mymenu></mymenu>
      </el-col>
      <el-col :span="19">
        <mylife></mylife>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <myartistic></myartistic>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mymenu from '@/components/index/menu.vue'
import mylife from '@/components/index/life.vue'
import myartistic from '@/components/index/artistic.vue'

export default {
  components: {
    mymenu,
    mylife,
    myartistic
  }
}
</script>
<style lang="scss">
@import "@/assets/css/index/index.scss";
</style>
