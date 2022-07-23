<template>
  <div
    ref="wrapper"
    :class="className"
    @mouseenter="handleTriggerEnter"
    @mouseleave="handleTriggerLeave"
  >
    <div ref="reference" :class="ns.e('trigger')">
      <slot></slot>
    </div>
    <dropdown-drop>
      <Portal>
        <transition :name="props.transitionName" :appear="props.appear">
          <div
            v-show="currentVisible"
            ref="popper"
            :class="[ns.e('popper'), ns.e('vars')]"
            @mouseenter="handleTriggerEnter"
            @mouseleave="handleTriggerLeave"
          >
            <slot name="drop"></slot>
          </div>
        </transition>
      </Portal>
    </dropdown-drop>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DbDropdown',
};
</script>

<script lang="ts" setup>
import { useNamespace, useClickOutside, usePopper, useSetTimeout } from '@db-plus/hooks';
import type { Placement } from '@db-plus/hooks';
import { emitEvent } from '@db-plus/config';
import {
  computed,
  inject,
  ref,
  toRef,
  provide,
  watch,
  defineEmits,
  onMounted,
  nextTick,
} from 'vue';
import { dropdownProps, DROPDOWN_STATE, SELECT_HANDLER } from './types';
import DropdownDrop from './dropdown-drop';
import Portal from '../../portal/index';
import { useLabel } from './hooks';

const props = defineProps(dropdownProps);

const emit = defineEmits(['update:visible']);

const parentState = inject(DROPDOWN_STATE, null);

const isNested = !!parentState; // 是否嵌套使用
const label = toRef(props, 'label');
const placement = ref(props.placement);
const currentVisible = ref(props.visible);
const transfer = toRef(props, 'transfer');
const ns = useNamespace('dropdown');
const className = computed(() => {
  return [ns.b(), ns.b('vars')];
});

const wrapper = useClickOutside(handleClickOutside);
const { reference, popper, transferTo, updatePopper } = usePopper({
  placement,
  transfer,
  wrapper,
  isDrop: true,
  offset: isNested ? [-5, 0] : undefined,
});

const currentLabel = useLabel(label, reference);

provide(SELECT_HANDLER, null);
provide(DROPDOWN_STATE, {
  handleSelect,
  handleTriggerEnter,
  handleTriggerLeave,
});

watch(
  () => props.visible,
  (value) => {
    currentVisible.value = value;
  },
);

watch(
  () => props.placement,
  (value) => {
    setPlacement(value);
  },
);

watch(currentVisible, (value) => {
  if (value) {
    updatePopper();
  }

  emitEvent(props.onToggle, value);
  emit('update:visible', value);
});

onMounted(() => {
  nextTick(() => {
    setPlacement(props.placement);
  });
});

function handleClickOutside() {
  emitEvent(props.onClickOutside);

  if (props.outsideClose && props.trigger !== 'custom' && currentVisible.value) {
    currentVisible.value = false;
    emitEvent(props.onOutsideClose);
  }
}

function handleSelect(labels: (string | number)[], metas: Array<Record<string, any>>) {
  if (props.trigger !== 'custom') {
    currentVisible.value = false;
    emitEvent(props.onSelect, labels, metas);
  }

  if (typeof parentState?.handleSelect === 'function') {
    parentState.handleSelect([currentLabel.value!, ...labels], [props.meta || {}, ...metas]);
  }
}

function setPlacement(value: Placement) {
  const [xPlacement] = value.split('-');

  if (isNested && xPlacement !== 'right' && xPlacement !== 'left') {
    placement.value = 'right-start';
  } else {
    placement.value = value;
  }
}

const { timer } = useSetTimeout();

function handleTriggerEnter() {
  console.log('handleTriggerEnter');
  if (props.trigger === 'hover') {
    clearTimeout(timer.hover);

    if (typeof parentState?.handleTriggerEnter === 'function') {
      parentState.handleTriggerEnter();
    }

    timer.hover = setTimeout(() => {
      currentVisible.value = true;
    }, 250);
  }
}

function handleTriggerLeave() {
  console.log('handleTriggerLeave');
  if (props.trigger === 'hover') {
    clearTimeout(timer.hover);

    if (typeof parentState?.handleTriggerLeave === 'function') {
      parentState.handleTriggerLeave();
    }

    timer.hover = setTimeout(() => {
      currentVisible.value = false;
    }, 250);
  }
}

function handleTriggerClick() {
  if (props.trigger === 'click') {
    currentVisible.value = !currentVisible.value;
  }
}
</script>
