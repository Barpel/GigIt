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
.gig-categories-container {
  z-index: 1;
  left: 0;
  width: 100%;
  padding: 50px 30px 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-row: 2;
  grid-gap: 10px;
  // min-height: 120vh;
}

.category {
  display: flex;
  justify-content: center;
  justify-self: center;
  align-self: center;
  align-items: center;
  box-shadow:0px 0px 17px -1px rgba(0,0,0,0.67);
  min-width: 100%;
  min-height: 300px;
}

.category a{
  color: white;
  text-decoration: none;
  letter-spacing: 1px;
}

.category i{
  font-size: 7rem;
  text-shadow: 0px 4px 6px rgba(165,173,182,0.69);
  color: white;
  opacity: 0.2;
}

.category h1 {
  font-size: 2rem;
}
.moving {
  background-color: #006bae;

}

.house-work{
  background-color: #00aea9;
}

.delivery {
  background-color: #00ae38;
}

.pet-care {
  background-color: #92ae00;
}

.line-queue{
  background-color: #e09401;

}

.other {
  background-color: #cf6b04;
  }
</style>

