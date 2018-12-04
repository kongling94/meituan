<template>
  <div class="layout-search">
    layout
    <ul>
      <li v-for="item in $store.state.todos.list"
          :key="item.id">{{item}}</li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  layout: 'search',
  data () {
    return {
      list: []
    }
  },
  async asyncData () {
    let { status, data: { list } } = await axios.get('/city/list')
    if (status === 200) {
      return { list }
    }
  },
  created () {

  },
}
</script>
<style lang="stylus" scoped>
</style>
