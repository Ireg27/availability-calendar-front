<template>
  <div id="app">
    <component :is="layoutName">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>

import BaseLayout from "@/layouts/BaseLayout";
export default {
  name: 'App',
  components: {BaseLayout},
  computed: {
    layoutName() {
      const routeMeta = this.$route.meta
      return routeMeta ? routeMeta.layout : undefined
    }
  }
};
</script>
