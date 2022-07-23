<template>
  <teleport v-if="isMounted && to" :to="to">
    <slot></slot>
  </teleport>
  <slot v-else></slot>
</template>

<script lang="ts">
export default {
  name: 'DbProtal',
};
</script>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { portalProps } from './types';

defineProps(portalProps);
const isMounted = ref(false);

onMounted(() => {
  nextTick(() => {
    isMounted.value = true;
  });
});
</script>
