<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iSelect></iSelect>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hots></hots>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <categroy></categroy>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import iSelect from '@/components/changeCity/iselect'
import hots from '@/components/changeCity/hot'
import categroy from '@/components/changeCity/categroy'

export default {
  components: {
    iSelect,
    hots,
    categroy
  }
}
</script>
<style lang="scss">
@import "@/assets/css/changecity/iselect.scss";
</style>
