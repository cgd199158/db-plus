<template>
  <div>
    <div class="title">默认</div>
    <db-divider>分割线</db-divider>
    <db-divider text-position="left">左边分割线</db-divider>
    <db-divider text-position="right">右分割线</db-divider>
    <div class="title">竖向分割线</div>
    <p>
      姓名
      <db-divider vertical></db-divider>
      年龄
      <db-divider vertical></db-divider>
      性别
    </p>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Divider',
  title: '分割线',
};
</script>

<script setup lang="ts"></script>

<style scoped lang="scss">
.title {
  padding: 10px 0;
}
</style>
