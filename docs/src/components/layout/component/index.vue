<template>
  <div class="components">
    <div class="components__menu">
      <ul>
        <li v-for="item in menuList" :key="item.path">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </li>
      </ul>
    </div>
    <div class="components__content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
export default {};
</script>

<script setup lang="ts">
import { getComponentsMenu, menuItem } from '../../../utils/component';
import { onMounted, ref, Ref } from 'vue';
const menuList: Ref<menuItem[]> = ref([]);
onMounted(() => {
  const data = getComponentsMenu();
  console.log('data', data);
  menuList.value = data;
});
</script>

<style lang="scss" scoped>
.components {
  display: flex;
  &__menu {
    flex: 0 0 240px;
  }
  &__content {
    flex: 1;
  }
}
</style>
