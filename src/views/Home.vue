<template>
  <div class="home">
    <div class="cover-container">
      <!-- <img alt="Vue logo" src="../assets/home-cover.jpg"> -->
      <div class="search-container">
        <input type="text" placeholder="Find your type of Gig...">
        <button>Search</button>
      </div>
    </div>
    <gig-categories />
    <home-footer />
  </div>
</template>

<script>
// @ is an alias to /src
import gigCategories from '@/components/gigCategories.cmp.vue'
import homeFooter from '@/components/homeFooter.cmp.vue'
export default {
  name: 'home',
  components: {
    gigCategories,
    homeFooter,
}
}
</script>

<style lang="scss" scoped>

</style>


