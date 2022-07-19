<template>
  <div>
    <div class="title">默认</div>
    <db-collapse>
      <db-collapse-item title="测试标题"></db-collapse-item>
    </db-collapse>
    <div class="title">卡片模式</div>
    <db-collapse type="card">
      <db-collapse-item title="卡片模式1"></db-collapse-item>
      <db-collapse-item title="卡片模式2"></db-collapse-item>
    </db-collapse>
    <div class="title">箭头位置</div>
    <db-collapse type="card" arrow-type="left">
      <db-collapse-item title="卡片模式1"></db-collapse-item>
      <db-collapse-item title="卡片模式2"></db-collapse-item>
    </db-collapse>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Collapse',
  title: '折叠面板',
};
</script>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
