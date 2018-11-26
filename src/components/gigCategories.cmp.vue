<template>
  <section class="gig-categories-container">
    <div class="category moving">
      <router-link to="/app/moving">
        <i class="fas fa-people-carry"></i>

        <h1>Moving</h1>
      </router-link>
    </div>

    <div class="category house-work">
      <router-link to="/app/house-work">
        <i class="fas fa-hammer"></i>
        <h1>House-Work</h1>
      </router-link>
    </div>

    <div class="category delivery">
      <router-link to="/app/delivery">
        <i class="fas fa-parachute-box"></i>
        <h1>Delivery</h1>
      </router-link>
    </div>
    
    <div class="category pet-care">
      <router-link to="/app/pet-care">
        <i class="fas fa-dog"></i>
        <h1>Pet-Care</h1>
      </router-link>
    </div>
    
    <div class="category other">
      <router-link to="/app/other">
        <i class="fas fa-ellipsis-h"></i>
        <h1>Other</h1>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
name: 'gigCategories',
created() {

}
}
</script>
<style lang="scss" scoped>
.gig-categories-container {
  z-index: 1;
  left: 0;
  width: 100%;
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-row: 2;
  grid-gap: 10px;
  min-height: 60vh;
}

.category a{
  color: white;
  text-decoration: none;
}

.category i{
  font-size: 5rem;
}

</style>

