<template>
  <button :class="[ns.b(), ns.m(props.type), ns.m(props.size), ns.is('disabled', props.disabled)]">
    测试
  </button>
</template>
<script lang="ts">
export default {
  name: 'DbButton',
};
</script>

<script setup lang="ts">
import { useNamespace } from '@db-plus/hooks/index';
import { buttonProps } from './types';
const ns = useNamespace('button');
const props = defineProps(buttonProps);
</script>

<style scoped lang="scss"></style>
