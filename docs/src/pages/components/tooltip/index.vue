<template>
  <div>
    <db-tooltip>
      <db-button type="primary">提示</db-button>
      <template #tip> 这里是提示内容 </template>
    </db-tooltip>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Tooltip',
  title: '提示',
};
</script>
