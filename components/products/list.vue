<template>
  <div class="m-products-list">
    <dl>
      <dd v-for="item in nav"
          :key="item.name"
          :class="[item.name,item.active?'s-nav-active':'']"
          @click="navSelect">{{item.txt}}</dd>
    </dl>
    <ul>
      <Item v-for="(item,index) in list"
            :key="index"
            :meta="item"></Item>
    </ul>
  </div>
</template>
<script>
import Item from './product.vue'
export default {
  components: {
    Item
  },
  data () {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          active: true
        },
        {
          name: 's-price',
          txt: '价格最低',
          active: false
        },
        {
          name: 's-visit',
          txt: '人气最高',
          active: false
        },
        {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }

      ]
    }
  },
  async asyncData ({ app }) { }
}
</script>
<style lang="scss">
</style>
