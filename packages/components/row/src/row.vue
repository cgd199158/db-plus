<template>
  <div :class="[ns.b()]" :style="rowStyle">
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'DbRow',
};
</script>

<script setup lang="ts">
import { useNamespace } from '@db-plus/hooks/index';
import { provide, ref, computed } from 'vue';
import { rowProps } from './types';
const props = defineProps(rowProps);
const ns = useNamespace('row');

const rowStyle = computed(() => {
  const gutter = props.gutter;
  if (Array.isArray(gutter)) {
    const [hMargin, vMargin] = gutter;
    return {
      margin: `-${vMargin / 2}px -${hMargin / 2}px ${vMargin / 2}px`,
    };
  } else {
    return {
      margin: `0 -${gutter / 2}px`,
    };
  }
});

provide('gutter', ref(props.gutter));
</script>

<style scoped lang="scss"></style>
