<template>
  <div>
    <div class="title">栅格布局</div>
    <db-row>
      <db-col :span="5">
        <div class="chunk">span5</div>
      </db-col>
      <db-col :span="4">
        <div class="chunk">span4</div>
      </db-col>
      <db-col :span="4">
        <div class="chunk">span4</div>
      </db-col>
      <db-col :span="11">
        <div class="chunk">span11</div>
      </db-col>
    </db-row>
    <div class="title">双向间距</div>
    <db-row :gutter="[10, 10]">
      <db-col :span="8">
        <div class="chunk">span8</div>
      </db-col>
      <db-col :span="8">
        <div class="chunk">span8</div>
      </db-col>
      <db-col :span="8">
        <div class="chunk">span8</div>
      </db-col>
      <db-col :span="8">
        <div class="chunk">span8</div>
      </db-col>
      <db-col :span="8">
        <div class="chunk">span8</div>
      </db-col>
      <db-col :span="8">
        <div class="chunk">span8</div>
      </db-col>
    </db-row>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Row',
  title: '栅格布局',
};
</script>

<script setup lang="ts"></script>

<style scoped lang="scss">
.title {
  padding: 10px 0;
}

.chunk {
  width: 100%;
  height: 100%;
  min-height: 48px;
  background-color: var(--db-color-primary-base);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--db-color-white);
  border-radius: var(--db-radius-large);
}
</style>
