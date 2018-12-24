<template>
  <div class="page-cart">
    <el-row>
      <el-col v-if="cart.length"
              :span="24"
              class="m-cart">
        <CartList :cart-data="cart"></CartList>
        <p>
          应付金融:<em class="money">￥{{total}}</em>
        </p>
        <div class="post">
          <el-button type="primary"
                     @click="submit">提交订单</el-button>
        </div>
      </el-col>
      <el-col v-else
              class="empty">购物车为空</el-col>
    </el-row>
  </div>
</template>
<script>
import CartList from '@/components/chart/list'
export default {
  components: {
    CartList
  },
  data () {
    return {
      cart: []
    }
  },
  computed: {
    total () {
      let total = 0
      this.cart.forEach(item => {
        total += item.price * item.count
      })
      return total
    }
  },
  methods: {
    submit () { }
  },
  async asyncData (ctx) {
    //通过跳转的id拿到订单的信息

    let { status, data: { code, data: { name, price } } } = await ctx.$axios.post('/cart/getCart', {
      id: ctx.query.id
    })


    if (status === 200 && code === 0 && name) {
      return {
        cart: [{
          name, price, count: 1
        }],
        cartNo: ctx.query.id
      }
    }

  }
}
</script>
<style lang="scss">
@import "@/assets/css/cart/index.scss";
</style>
