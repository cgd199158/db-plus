<template>
  <button
    :class="[
      ns.b(),
      ns.b('vars'),
      { [ns.m('pulsing')]: pulsing },
      { [ns.m('text')]: text },
      { [ns.m('simple')]: simple },
      { [ns.m('circle')]: circle },
      { [ns.m('disabled')]: disabled },
      ns.m(props.type),
      ns.m(props.size),
    ]"
    @click="handleClick"
    @animationend="handleAnimationEnd"
  >
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
import { ref } from 'vue';
import { buttonProps } from './types';
const pulsing = ref(false);
const ns = useNamespace('button');
const props = defineProps(buttonProps);

const emits = defineEmits(['click']);

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

<style scoped lang="scss"></style>
