<template>
  <i :class="`db-iconfont db-icon-${icon}`" :style="style"> <slot></slot></i>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

// ExtractPropTypes 自定处理props的类型
import type { ExtractPropTypes } from 'vue';

export const iconProps = {
  size: {
    type: Number,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
} as const;

export type IconProps = ExtractPropTypes<typeof iconProps>;

export default defineComponent({
  name: 'DbIcon',
  props: iconProps,
  setup(props) {
    const style = computed(() => {
      if (!props.size && !props.color) {
        return {};
      }
      return {
        ...(props.size ? { 'font-size': props.size + 'px' } : {}),
        ...(props.color ? { color: props.color } : {}),
      };
    });

    return { style };
  },
});
</script>
