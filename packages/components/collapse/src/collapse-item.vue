<template>
  <div :class="className">
    <div :class="ns.e('header')" @click="handlerHeader">
      <slot name="title">
        {{ props.title }}
      </slot>
      <div :class="ns.e('arrow')">
        <icon>
          <RightOutlined></RightOutlined>
        </icon>
      </div>
    </div>
    <collapse-transition>
      <div v-if="isActive" :class="ns.e('body')">
        <div :class="ns.e('content')">
          <div>
            <p>123123123</p>
            <p>123123123</p>
            <p>123123123</p>
            <p>123123123</p>
          </div>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>
<script lang="ts">
export default {
  name: 'DbCollapseItem',
};
</script>

<script setup lang="ts">
import { computed, defineProps, inject, ref } from 'vue';
import { RightOutlined } from '@vicons/antd';
import { collapseItemProps } from './collapse-item-types';
import { useNamespace } from '@db-plus/hooks/index';
import CollapseTransition from '../../collapse-transition/index';
import Icon from '../../icon/index';
import { COLLAPSE_STATE } from './types';

const props = defineProps(collapseItemProps);
const collapseState = inject(COLLAPSE_STATE, null);
const ns = useNamespace('collapse');

const isActive = ref(props.isActive); // 当前内容区是否显示

const useArrowType = computed(() => {
  if (collapseState) {
    return collapseState.arrowType;
  }

  return props.arrowType;
});

const className = computed(() => {
  return [
    ns.e('item'),
    ns.is('active', isActive.value),
    {
      [ns.m('arrow-right')]: useArrowType.value === 'right',
      [ns.m('arrow-left')]: useArrowType.value === 'left',
      [ns.m('arrow-none')]: useArrowType.value === 'none',
      [ns.em('item', 'expanded')]: isActive.value,
    },
  ];
});

// 开关内容区显隐
const handlerHeader = () => {
  isActive.value = !isActive.value;
};
</script>
