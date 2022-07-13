<template>
  <div class="components">
    <div class="components__menu">
      <ul>
        <li>
          <router-link to="/components/button">按钮</router-link>
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

<script setup lang="ts"></script>

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
