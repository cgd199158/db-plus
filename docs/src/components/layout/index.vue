<template>
  <div class="docPage">
    <div class="docPage-navbar">
      <h1 class="docPage-navbar__left"><router-link to="/">公用导航</router-link></h1>
      <ul class="docPage-navbar__right">
        <li>
          <router-link to="/components">组件</router-link>
        </li>
      </ul>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.docPage {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.docPage-navbar {
  display: flex;
  justify-content: space-between;
}
</style>
