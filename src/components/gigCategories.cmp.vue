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

    <div class="category line-queue">
      <router-link to="/app/line-queue">
        <i class="fas fa-male"></i>
        <i class="fas fa-female"></i>
        <i class="fas fa-male"></i>
        <h1>Line Queue</h1>
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
  
</style>

