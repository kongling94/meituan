<template>
  <div class="m-geo">
    <i class="el-icon-location"> </i>{{`${region}-${city}`}}
    <nuxt-link class="changeCity"
               to="/changeCity">切换城市</nuxt-link>
    [广州 深圳 惠州]
  </div>
</template>
<script>
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
      this.region = resgion
    })
  },
}
</script>
<style lang="scss" scoped>
</style>
