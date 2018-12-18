<template>
  <div class="m-iselect">
    <span class="name">按省份选择</span>
    <el-select v-model="pvalue"
               placeholder="省份"
               class="province">
      <el-option v-for="item in province"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="cvalue"
               :disabled="!city.length"
               placeholder="城市"
               class="city">
      <el-option v-for="item in city"
                 :key="item.value"
                 :label="item.label"
                 :value="item.cvalue">
      </el-option>
    </el-select>
    <el-autocomplete v-model="input"
                     class="input"
                     :fetch-suggestions="querySearchAsync"
                     placeholder="请输入城市中文或拼音"
                     @select="handleSelect"></el-autocomplete>
  </div>

</template>
<script>
import _ from 'lodash'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      cities: []
    }
  },
  watch: {
    async pvalue (newValue) {
      let { status, data: { city } } = await this.$axios.get(`/geo/province/${newValue}`)
      if (status === 200) {
        this.city = city.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        this.cvalue = ''
      }
    }
  },
  async mounted () {
    let { status, data: { province } } = await this.$axios.get('/geo/province')
    if (status === 200) {
      this.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    ...mapMutations({
      setPosition: 'geo/setPosition'
    }),
    handleSelect (item) {
      this.setPosition({ city: item.value })
      this.$router.push({
        path: '/'
      })
    },
    querySearchAsync: _.debounce(async function (query, callback) {
      let _self = this;
      if (_self.cities.length) {
        callback(_self.cities.filter(item =>
          item.value.indexOf(query) > -1
        ))
      } else {
        let { status, data: { city } } = await _self.$axios.get('/geo/city')
        if (status === 200) {
          _self.cities = city.map(item => {
            return {
              value: item.name
            }
          })
          callback(_self.cities.filter(item =>
            item.value.indexOf(query) > -1
          ))
        } else {
          callback([])
        }
      }
    }, 200)
  }
}
</script>
<style lang="scss">
</style>
