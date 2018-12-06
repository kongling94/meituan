<template>
  <div class="m-menu">
    <dl class="nav"
        @mouseleave="mouseleaveKind">
      <dt>全部分类</dt>
      <dd v-for="item in menu"
          :key="item.id"
          @mouseenter="mouseinKind(item.type)"
          :ref="item.type">
        <i :class="item.type"> {{item.name}}<span class="arrow"></span></i>
      </dd>
    </dl>
    <div class="detail"
         v-if="kind"
         @mouseenter="isEnter"
         @mouseleave="isOut">
      <template v-for="item in curdetail">
        <h4 :key="item.id">{{item.title}}<span class="right">更多&gt;</span></h4>
        <span v-for="sub in item.child"
              :key="sub.id">{{sub}}</span>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      kind: '',
      menu: [
        {
          type: 'food',
          name: '美食',
          child: [{
            title: '美食',
            child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
          }]
        },
        {
          type: 'takeout',
          name: '外卖',
          child: [{
            title: '外卖',
            child: ['美团外卖', '饿了么']
          }]
        },
        {
          type: 'hotel',
          name: '酒店',
          child: [{
            title: '酒店星级',
            child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
          }]
        },
      ]
    }
  },
  computed: {
    curdetail () {
      // console.log(this.menu.filter((item) => item.type === this.kind)[0].child);
      return this.menu.filter((item) => item.type === this.kind)[0].child
    }
  },
  methods: {
    mouseleaveKind () {
      let _self = this
      _self.timer = setTimeout(() => {
        this.kind = ''
      }, 200);
    },
    mouseinKind (val) {
      this.kind = val
    },
    isEnter () {
      clearTimeout(this.timer)
    },
    isOut () {
      this.kind = ''
    }
  }
}
</script>
<style lang="scss">
</style>
