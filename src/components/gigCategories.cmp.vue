<template>
  <section v-if="gigCategoryCounter" class="gig-categories-container">
    <div class="category moving">
    <el-badge :value="gigCategoryCounter.moving" class="item badge">
      <router-link to="/gig/category/moving">
        <i class="fas fa-people-carry"></i>
        <h1>Moving</h1>
      </router-link>
    </el-badge>
    </div>
    <div class="category house-work">
      <el-badge :value="gigCategoryCounter['house-work']" class="item badge">
      <router-link to="/gig/category/house-work">
        <i class="fas fa-hammer"></i>
        <h1>House-Work</h1>
      </router-link>
      </el-badge>
    </div>

    <div class="category delivery">
      <el-badge :value="gigCategoryCounter.delivery" class="item badge">
      <router-link  to="/gig/category/delivery">
        <i class="fas fa-parachute-box"></i>
        <h1>Delivery</h1>
      </router-link>
      </el-badge>
    </div>

    <div class="category pet-care">
      <el-badge :value="gigCategoryCounter['pet-care']" class="item badge">
      <router-link to="/gig/category/pet-care">
        <i class="fas fa-dog"></i>
        <h1>Pet-Care</h1>
      </router-link>
      </el-badge>
    </div>

    <div class="category line-queue">
      <el-badge :value="gigCategoryCounter['line-queue']" class="item badge">
      <router-link  to="/gig/category/line-queue">
        <i class="fas fa-male"></i>
        <i class="fas fa-female"></i>
        <i class="fas fa-male"></i>
        <h1>Line Queue</h1>
      </router-link>
      </el-badge>
    </div>

    <div class="category other">
      <el-badge :value="gigCategoryCounter.other" class="item badge">
      <router-link to="/gig/category/other">
        <i class="fas fa-ellipsis-h"></i>
        <h1>Other</h1>
      </router-link>
      </el-badge>
    </div>
  </section>
</template>

<script>
export default {
 props: {
    gigCategoryCounter: Object
},
name: 'gigCategories',
created() {
  // Notification
  },
methods:{
  },
computed:{
}

}
</script>
<style lang="scss" scoped>

</style>

