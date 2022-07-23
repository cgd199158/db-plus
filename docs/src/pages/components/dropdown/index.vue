<template>
  <div>
    <div class="title">默认</div>
    <db-dropdown>
      <db-butto type="primary">下拉菜单</db-butto>
      <template #drop>
        <ul style="background: red; display: inline-flex">
          <li>123123</li>
        </ul>
      </template>
    </db-dropdown>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Dropdown',
  title: '下拉菜单',
};
</script>

<style lang="scss">
.title {
  padding: 10px 0;
}
</style>
