<template>
  <div class="m-geo">
    <i class="el-icon-location"> </i>{{`${region}-${city}`}}
    <nuxt-link class="changeCity"
               to="/changeCity">切换城市</nuxt-link>
    [广州 深圳 惠州]
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      city: '',
      region: ''
    }
  },
  beforeCreate () {
    this.$axios.get('/geo/getPosition').then(res => {
      let { city, region } = res.data
      this.city = city
      this.region = region
      this.setPosition({ city, region })
    })
  },
  methods: {
    ...mapMutations({
      setPosition: 'geo/setPosition'
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
