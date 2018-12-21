<template>
  <div :id="id"
       :style="{width:width+'px',height:height+'px',margin:'34px auto'}"
       class="m-map"></div>
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    point: {
      type: Array,
      default () {
        retun[116.46, 39.92]
      }
    }
  },
  data () {
    return {
      id: `map`,
      key: '3d222a3955ba404bdb4875c88fb7f1a5'
    }
  },
  mounted () {
    let _self = this
    _self.id = `map${Math.random().toString().slice(4, 6)}`
    window.onmaploaded = () => {
      let map = new window.AMap.Map(_self.id, {
        resizeEnable: true,
        zoom: 11,
        center: _self.point
      })
      _self.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        let toolbar = new window.AMap.Toolbar()
        map.addControl(toolbar);
        let marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: _self.point
        })
        _self.marker = marker
        marker.setMap(map)
      })
    }
    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${_self.key}&callback=onmaploaded`
    let jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  },
}
</script>
<style lang="scss">
</style>
