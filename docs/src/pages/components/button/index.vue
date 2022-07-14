<template>
  <div>
    <div class="title">不同类型</div>
    <db-button type="primary">primary</db-button>
    <db-button type="default">default</db-button>
    <db-button type="info">info</db-button>
    <db-button type="success">success</db-button>
    <db-button type="error">error</db-button>
    <db-button type="warning">warning</db-button>
    <div class="title">不同大小</div>
    <db-button type="primary" size="large">large</db-button>
    <db-button type="primary" size="default">default</db-button>
    <db-button type="primary" size="small">small</db-button>
    <div class="title">text类型</div>
    <db-button text type="primary">primary</db-button>
    <db-button text type="default">default</db-button>
    <db-button text type="info">info</db-button>
    <db-button text type="success">success</db-button>
    <db-button text type="error">error</db-button>
    <db-button text type="warning">warning</db-button>
    <div class="title">simple类型</div>
    <db-button simple type="primary">primary</db-button>
    <db-button simple type="default">default</db-button>
    <db-button simple type="info">info</db-button>
    <db-button simple type="success">success</db-button>
    <db-button simple type="error">error</db-button>
    <db-button simple type="warning">warning</db-button>
    <div class="title">circle类型</div>
    <db-button circle type="primary">primary</db-button>
    <db-button circle type="default">default</db-button>
    <db-button circle type="info">info</db-button>
    <db-button circle type="success">success</db-button>
    <db-button circle type="error">error</db-button>
    <db-button circle type="warning">warning</db-button>
    <div class="title">禁用状态</div>
    <db-button disabled type="primary">primary</db-button>
    <db-button text disabled type="primary">primary</db-button>
    <db-button simple disabled type="primary">primary</db-button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Button',
};
</script>

<script setup lang="ts"></script>

<style lang="scss">
.title {
  padding: 10px 0;
}
</style>
