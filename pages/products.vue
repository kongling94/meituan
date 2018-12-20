<template>
  <el-row class="page-product">
    <el-col :span="19">
      <Crumbs> :keyword="keyword"</Crumbs>
      <Categroy :types="types"
                :areas="areas"></Categroy>
      <List :list="list"></List>
    </el-col>
    <el-col :span="5">
      <AMap :width="230"
            :height="290"
            :point="point"
            v-if="point.length"></AMap>
    </el-col>
  </el-row>
</template>
<script>
import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'
import AMap from '@/components/public/map.vue'
export default {
  components: {
    Crumbs,
    Categroy,
    List,
    AMap
  },
  data () {
    return {
      list: [],
      types: [],
      areas: [],
      point: [],
      keyword: ''
    }
  },
  async asyncDatc (ctx) {
    let keyword = encodeURIComponent(ctx.query.keyword)
    let city = encodeURIComponent(ctx.store.state.geo.position.city)
    let { status, data: { types, areas } } = await axios.get('/categroy/crumbs', {
      params: {
        types,
        areas
      }
    })
  }
}
</script>
<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>
