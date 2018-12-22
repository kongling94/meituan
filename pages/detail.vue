<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <Crumbs :keyword="keyword"
                :type="type"></Crumbs>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Summary :meta="product"></Summary>
      </el-col>
    </el-row>
    <el-row class="m-title">
      <el-col :span="24">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <List :list="list"
              v-if="canOrder||!login"></List>
        <div v-else
             class="deal-need-login"><img src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png"
               alt="登录查看"><span>请登录后查看详细团购优惠</span>
          <el-button type="primary"
                     round
                     class="btn btn-default btn-clr-g"><a href="/login">立即登录</a></el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import List from '@/components/detail/list.vue'
import Crumbs from '@/components/detail/crumbs.vue'
import Item from '@/components/detail/item.vue'
import Summary from '@/components/detail/summary.vue'
export default {
  components: {
    Crumbs,
    List,
    Item,
    Summary
  },

  computed: {
    canOrder () {
      return this.list.filter(item => item.photos.length).length
    }
  },
  async asyncData (ctx) {
    let { keyword, type } = ctx.query
    let { status, data: { product, more: list, login } } = await $axios.get('/search/products', {
      params: {
        keyword,
        type,
        city: ctx.store.state.geo.position.city
      }
    })
    if (status === 200) {
      return {
        keyword,
        list,
        type,
        product,
        login
      }
    } else {
      return {
        keyword,
        list: [],
        type,
        product: {},
        login: false
      }
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/css/detail/index.scss";
</style>
