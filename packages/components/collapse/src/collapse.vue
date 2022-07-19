<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'DbCollapse',
};
</script>

<script setup lang="ts">
import { collapseProps, COLLAPSE_STATE } from './types';
import { useNamespace } from '@db-plus/hooks/index';
import { computed, provide, reactive, toRef } from 'vue';
const ns = useNamespace('collapse');
const props = defineProps(collapseProps);

const className = computed(() => {
  return [
    ns.b(),
    ns.b('vars'),
    ns.em('item', `arrow-${props.arrowType}`),
    {
      [ns.m('card')]: props.type === 'card',
    },
  ];
});

provide(
  COLLAPSE_STATE,
  reactive({
    arrowType: toRef(props, 'arrowType'),
  }),
);

console.log('=========> props', props);
</script>

<style scoped lang="scss"></style>
