import { Component, computed, defineComponent, h, mergeProps, PropType } from 'vue';
import type { ExtractPropTypes } from 'vue';
import { useNamespace } from '@db-plus/hooks/index';
export type Depth = 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5' | undefined;

export const iconProps = {
  depth: [String, Number] as PropType<Depth>,
  size: {
    type: [Number, String] as PropType<number | string>,
    default: 20,
  },
  color: String,
  component: Object as PropType<Component>,
} as const;

export type IconProps = ExtractPropTypes<typeof iconProps>;

const Icon = defineComponent({
  name: 'DbIcon',
  inheritAttrs: false,
  props: iconProps,
  setup(props) {
    return {
      mergedStyle: computed(() => {
        const { size, color } = props;
        return {
          fontSize: size,
          color,
        };
      }),
    };
  },
  render() {
    const { component } = this;
    const ns = useNamespace('icon');
    return h(
      'i',
      mergeProps(this.$attrs, {
        role: 'img',
        class: [ns.b()],
        style: [this.mergedStyle],
      }),
      component ? h(component) : this.$slots,
    );
  },
});

export default Icon;
