<template>
  <section class="gig-toolbar-container">
    <div class="gig-toolbar tab" :class="filterBarStatus">
      <input
        @click="searchByTitle"
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
        @click="searchByTitle"
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
        @click="searchByTitle"
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
        @click="searchByTitle"
        type="radio"
        class="tablinks"
        name="technical"
        value="technical"
        id="tab4"
        v-model="filter.byCategory"
      >
      <!-- <label for="tab4">Technical</label>
      <input
        type="radio"
        class="tablinks"
        name="line-queue"
        value="line-queue"
        id="tab5"
        v-model="filter.byCategory"
      > -->
      <label for="tab5">
        <i class="fas fa-male"></i>
        <i class="fas fa-female"></i>
        <i class="fas fa-male"></i>
      </label>
      <input
        @click="searchByTitle"
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
    <button @click="toggleFilterStatus"  class="toggle-filter-btn" :class="filterBarStatus">Filter</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        byCategory: "",
        byTitle: ""
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
      this.$emit("searchGig", this.filter);
    },
    toggleFilterStatus() {
      this.showFilter = !this.showFilter;
    }
  },
  watch: {
    "filter.byCategory"() {
      this.$emit("searchGig", this.filter);
    }
  }
};
</script>

<style>
</style>
