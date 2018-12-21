<template>
  <div class="m-geo">
    <i class="el-icon-location"> </i>{{$store.state.geo.position.city}}
    <nuxt-link class="changeCity"
               to="/changeCity">切换城市</nuxt-link>
    [广州 深圳 惠州]
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      city: '',
      region: ''
    }
  },
  beforeCreate () {
    if (!this.$store.state.geo.position.city) {
      this.$axios.get('/geo/getPosition').then(res => {
        let { city, region } = res.data
        this.city = city = city.replace('市', '')
        this.region = region
        this.setPosition({ city, region })
      })
    }
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
