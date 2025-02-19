<script>
import MapComponent from '@/components/MapComponent.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    MapComponent,
  },
}
</script>
<template>
  <div class="home-view">
    <UserList />
  </div>
</template>
<style scoped>
.home-view {
  direction: rtl;
  text-align: right;
}
</style>
