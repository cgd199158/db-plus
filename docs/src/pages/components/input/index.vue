<template>
  <div>
    <div class="title">default</div>
    <db-input before="123">
      <template #after>456</template>
    </db-input>
  </div>
</template>
<script lang="ts">
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Input',
  title: '输入框',
};
</script>

<style lang="scss">
.title {
  padding: 10px 0;
}
</style>
