<template>
  <div>
    <h1>公用导航</h1>
    <ul>
      <li>
        <router-link to="/components">组件</router-link>
      </li>
    </ul>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
