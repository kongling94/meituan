<template>
  <div class="m-product-categroy">
    <dl class="classic">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd v-for="(item,index) in types"
          :key="index">
        <iselect :name="item.type"
                 :list="item.module"></iselect>
      </dd>
    </dl>
    <dl class="classic">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd v-for="(item,index) in areas"
          :key="index">
        <iselect :name="item.type"
                 :list="item.module"></iselect>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
</style>

