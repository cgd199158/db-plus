<template>
  <div :class="className">
    <span v-if="!props.vertical && hasText" :class="ns.e('text')">
      <slot></slot>
    </span>
  </div>
</template>
<script lang="ts">
export default {
  name: 'DbDivider',
};
</script>

<script setup lang="ts">
import { dividerProps } from './types';
import { useNamespace } from '@db-plus/hooks/index';
import { computed, useSlots } from 'vue';
const props = defineProps(dividerProps);
const ns = useNamespace('divider');
const slots = useSlots();

const hasText = computed(() => {
  return !!slots.default;
});

const className = computed(() => {
  return [
    ns.b(),
    ns.b('vars'),
    ns.m(props.vertical ? 'vertival' : 'horizontal'),
    {
      [ns.m('dashed')]: props.dashed,
      [ns.m('with-text')]: !props.vertical && hasText.value,
      [ns.m(`with-text-${props.textPosition}`)]:
        !props.vertical && hasText.value && props.textPosition !== 'center',
    },
  ];
});

console.log('props', props);
</script>

<style scoped lang="scss"></style>
