<template>
  <div class="search-categories-container">
    <section class="gig-toolbar-container">
      <div class="search-container">
        SORTER
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
          <div class="item badge">
            <i class="fas fa-people-carry"></i>
            <!-- <span v-if="gigCategoryCounter.moving">{{gigCategoryCounter.moving}}</span> -->
          </div>
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
          <div class="item badge">
            <i class="fas fa-hammer"></i>
            <!-- <span class="badge" v-if="gigCategoryCounter['house-work']">{{gigCategoryCounter['house-work']}}</span> -->
          </div>
        </label>
        <input
          type="radio"
          class="tablinks"
          name="technical"
          value="technical"
          id="tab4"
          v-model="filter.byCategory"
        >
        <!-- <label for="tab4">Technical</label> -->
        <input
          type="radio"
          class="tablinks"
          name="line-queue"
          value="line-queue"
          id="tab5"
          v-model="filter.byCategory"
        >
        <label for="tab5">
          <div class="item badge">
            <i class="fas fa-male"></i>
            <i class="fas fa-female"></i>
            <i class="fas fa-male"></i>
            <!-- <span class="badge" v-if="gigCategoryCounter['line-queue']" >{{gigCategoryCounter['line-queue']}}</span> -->
          </div>
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
          <div class="item badge">
            <i class="fas fa-dog"></i>
            <!-- <span class="badge" v-if="gigCategoryCounter['pet-care']" >{{gigCategoryCounter['pet-care']}}</span> -->
          </div>
        </label>
        <input
          type="radio"
          class="tablinks"
          name="delivery"
          value="delivery"
          id="tab7"
          v-model="filter.byCategory"
        >
        <label for="tab7">
          <div class="item badge">
            <i class="fas fa-parachute-box"></i>
            <!-- <span class="badge" v-if="gigCategoryCounter['delivery']" >{{gigCategoryCounter['delivery']}}</span> -->
          </div>
        </label>
        <input
          type="radio"
          class="tablinks"
          name="other"
          value="other"
          id="tab8"
          v-model="filter.byCategory"
        >
        <label for="tab8">
          <div class="item badge">
            <i class="fas fa-ellipsis-h"></i>
            <!-- <span class="badge" v-if="gigCategoryCounter['other']">{{gigCategoryCounter['other']}}</span> -->
          </div>
        </label>
      </div>
      <button @click="toggleFilterStatus" class="toggle-filter-btn" :class="filterBarStatus">Filter</button>
    </section>
  </div>
</template>

<script>
export default {
  props: ["gigCategoryCounter"],
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
      return;
      this.$emit("searchGig", { ...this.filter });
    },
    toggleFilterStatus() {
      this.showFilter = !this.showFilter;
    },
    focusOnSearch() {
      this.$refs.searchGig.focus();
    }
  },
  watch: {
    filter: {
      handler() {
        this.$emit("searchGig", this.filter);
      },
      deep: true
    }
  }
};
</script>

<style>
</style>
