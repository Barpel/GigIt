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
import gigDetails from '@/components/gigDetails.cmp.vue'
import homeFooter from '@/components/homeFooter.cmp.vue'
export default {
  name: 'home',
  components: {
    gigCategories,
    gigDetails,
    homeFooter,
}
}
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: 1fr;
}

img {
  z-index: 0;
  max-height: 400px;
  object-fit: cover;
  min-width: 100%;
  top: 0;
  left: 0;
}

.cover-container {
  background: url('../assets/home-cover.jpg');
  background-size: 100%;
  background-position-y: bottom;
  grid-row: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
}

.search-container {
  z-index: 1;
  grid-row: 4;
  max-height: 55px;
  display: flex;
  justify-content: center;
  max-width: fit-content;
  margin: 0 auto;
}

.search-container input {
  width: 400px;
  font-size: 1.5rem;
  padding: 10px;
  height: 100%;
}

.search-container button {
  height: 100%;
  font-size: 1rem;
  background-color: #2ca2afd0;
  border: none;
  cursor: pointer;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}
</style>


