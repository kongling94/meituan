<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3"
              class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
             alt="美团">
      </el-col>
      <el-col :span="15"
              class="center">
        <div class="wrapper">
          <el-input placeholder="搜索商家或地点"
                    v-model="search"
                    @focus="focus"
                    @blur="blur"
                    @input="ipt"></el-input>
          <button class="el-button el-button--primary"><i class="el-icon-search"></i></button>
          <dl class="searchList"
              v-if="isSearchList">
            <dd v-for="item in searchList"
                :key="item.id">{{item.editorWord}}</dd>

          </dl>
          <dl class="hotPlace"
              v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="item in hotPlace"
                :key="item.id">{{item}}</dd>
          </dl>

        </div>
        <p class="suggest">
          <a href="javascript:;">故宫博物院</a>
          <a href="javascript:;">台北博物院</a>
          <a href="javascript:;">广州博物院</a>
          <a href="javascript:;">丝绸之路博物院</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/"
                       class="takeout">丑团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/"
                       class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/"
                       class="hotel">丑团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/"
                       class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/"
                       class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6"
              class="right">
        <ul class="security">
          <li>
            <i class="refund">
              <p class="txt">随时退</p>
            </i>
          </li>
          <li>
            <i class="single">
              <p class="txt">不满意免单</p>
            </i>
          </li>
          <li>
            <i class="overdue">
              <p class="txt">过期退</p>
            </i>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data () {
    return {
      isFocus: false,
      search: '',
      hotPlace: ['情侣路', '华发商都', '富华里'],
      searchList: []
    }
  },
  computed: {
    isHotPlace () {
      return this.isFocus && !this.search
    },
    isSearchList () {
      return this.isFocus && this.search
    }
  },
  methods: {
    focus () {
      this.isFocus = true
    },
    blur () {
      setTimeout(() => {
        this.isFocus = false
      }, 300);
    },
    ipt: _.debounce(async function () {
      let _self = this
      let city = _self.$store.state.geo.position.city.replace('市', '')
      _self.searchList = []
      let { status, data: { top } } = await _self.$axios.get('/search/top', {
        params: {
          input: _self.search,
          city
        }
      })

      _self.searchList = top.slice(0, 10)
    }, 300)
  }
}
</script>
<style lang="scss">
</style>
