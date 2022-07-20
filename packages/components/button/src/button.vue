<template>
  <button :class="className" @click="handleClick" @animationend="handleAnimationEnd">
    <slot></slot>
  </button>
</template>
<script lang="ts">
export default {
  name: 'DbButton',
};
</script>

<script setup lang="ts">
import { useNamespace } from '@db-plus/hooks/index';
import { ref, computed } from 'vue';
import { buttonProps } from './types';
const props = defineProps(buttonProps);
const emits = defineEmits(['click']);
const pulsing = ref(false);
const ns = useNamespace('button');

const className = computed(() => {
  return [
    ns.b(),
    ns.b('vars'),
    { [ns.m('pulsing')]: pulsing },
    { [ns.m('text')]: props.text },
    { [ns.m('simple')]: props.simple },
    { [ns.m('circle')]: props.circle },
    { [ns.m('disabled')]: props.disabled },
    ns.m(props.type),
    ns.m(props.size),
  ];
});

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.text || props.simple) return;
  pulsing.value = false;

  requestAnimationFrame(() => {
    console.log('requestAnimationFrame');
    pulsing.value = true;
  });

  emits('click', event);
};

const handleAnimationEnd = () => {
  pulsing.value = false;
  console.log('handleAnimationEnd');
};
</script>
