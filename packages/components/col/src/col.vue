<template>
  <div :class="[ns.b(), ns.m(String(props.span))]" :style="colStyle">
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'DbCol',
};
</script>

<script setup lang="ts">
import { useNamespace } from '@db-plus/hooks/index';
import { computed, inject, Ref, ref } from 'vue';
import { colProps } from './types';
const props = defineProps(colProps);
const ns = useNamespace('col');

const gutter = inject<Ref<number | number[]>>('gutter', ref(10));

const getPadding = () => {
  const value = gutter?.value;
  if (Array.isArray(value)) {
    return `${value[0] / 2}px ${value[1] / 2}px`;
  } else {
    return `0 ${value / 2}px`;
  }
};

const colStyle = computed(() => {
  return {
    padding: getPadding(),
  };
});
</script>
