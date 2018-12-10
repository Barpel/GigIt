<template>
  <div class="search-categories-container">
    <section class="gig-toolbar-container">
      <div class="search-container">
        <router-link to="/gig/edit" tag="button">
          <i class="fas fa-plus"></i>
          <span>Gig</span>
        </router-link>
        <input
          type="text"
          placeholder="Find your next Gig"
          @input="searchByTitle"
          v-model="filter.byTitle"
          ref="searchGig"
        >
        <button @click="focusOnSearch">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div class="gig-toolbar tab" :class="filterBarStatus">
        <input
          type="radio"
          class="tablinks"
          name="all gigs"
          value
          id="tab1"
          checked
          v-model="filter.byCategory"
        >
        <label for="tab1">All</label>
        <input
          type="radio"
          class="tablinks"
          name="moving"
          value="moving"
          id="tab2"
          v-model="filter.byCategory"
        >
        <label for="tab2">
          <i class="fas fa-people-carry"></i>
        </label>
        <input
          type="radio"
          class="tablinks"
          name="house-work"
          value="house-work"
          id="tab3"
          v-model="filter.byCategory"
        >
        <label for="tab3">
          <i class="fas fa-hammer"></i>
        </label>
        <input
          type="radio"
          class="tablinks"
          name="technical"
          value="technical"
          id="tab4"
          v-model="filter.byCategory"
        >
      <input
        type="radio"
        class="tablinks"
        name="line-queue"
        value="line-queue"
        id="tab5"
        v-model="filter.byCategory"
        >
        <label for="tab5">
          <i class="fas fa-male"></i>
          <i class="fas fa-female"></i>
          <i class="fas fa-male"></i>
        </label>
        <input
          type="radio"
          class="tablinks"
          name="pet-care"
          value="pet-care"
          id="tab6"
          v-model="filter.byCategory"
        >
        <label for="tab6">
          <i class="fas fa-dog"></i>
        </label>
        <input
          @click="searchByTitle"
          type="radio"
          class="tablinks"
          name="other"
          value="other"
          id="tab7"
          v-model="filter.byCategory"
        >
        <label for="tab7">
          <i class="fas fa-ellipsis-h"></i>
        </label>
      </div>
      <button @click="toggleFilterStatus" class="toggle-filter-btn" :class="filterBarStatus">Filter</button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        byCategory: "",
        byTitle: "",
        isActive: true
      },
      showFilter: false
    };
  },
  created() {
    if (!this.$route.params.type) return;
    this.filter.byCategory = this.$route.params.type;
    this.$emit("searchGig", this.filter);
  },
  computed: {
    filterBarStatus() {
      return {
        open: this.showFilter,
        closed: !this.showFilter
      };
    }
  },
  methods: {
    // searchGig(ev) {
    //   var category = ev.target.innerHTML.toLowerCase();
    //   if (category === "all gigs") category = "";
    //   this.filter.byCategory = category;
    //   this.$emit("searchGig", this.filter);
    // },
    searchByTitle() {
      return 
      // console.log(this.filter)
      this.$emit("searchGig", {...this.filter});
    },
    toggleFilterStatus() {
      this.showFilter = !this.showFilter;
    },
    focusOnSearch() {
      this.$refs.searchGig.focus();
    }
  },
  watch: {
    "filter":{
      handler() {
        this.$emit("searchGig", this.filter);
      },
      deep: true
    }
  }
};
</script>

<style>
.search-categories-container{
  width: 100%;
  display: flex !important;
}
</style>
