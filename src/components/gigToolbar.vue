<template>
  <section class="gig-toolbar-container">
    <div class="gig-toolbar tab" :class="filterBarStatus">
      <!-- <button @click="searchGig" class="tablinks">All Gigs</button>
      <button @click="searchGig" class="tablinks">Moving</button>
      <button @click="searchGig" class="tablinks">House Work</button>
      <button @click="searchGig" class="tablinks">Technical</button>
      <button @click="searchGig" class="tablinks">Line Queue</button>
      <button @click="searchGig" class="tablinks">Pet Care</button>
      <button @click="searchGig" class="tablinks">Other</button> -->
      <input type="radio" class="tablinks" name="all gigs" value="" id="tab1" checked v-model="filter.byCategory">
      <label for="tab1">All Gigs</label>
      <input type="radio" class="tablinks" name="moving" value="moving" id="tab2" v-model="filter.byCategory">
      <label for="tab2">Moving</label>
      <input type="radio" class="tablinks" name="house-work" value="house-work" id="tab3" v-model="filter.byCategory">
      <label for="tab3">House-Work</label>
      <input type="radio" class="tablinks" name="technical" value="technical" id="tab4" v-model="filter.byCategory">
      <label for="tab4">Technical</label>
      <input type="radio" class="tablinks" name="line-queue" value="line-queue" id="tab5" v-model="filter.byCategory">
      <label for="tab5">Line Queue</label>
      <input type="radio" class="tablinks" name="pet-care" value="pet-care" id="tab6" v-model="filter.byCategory">
      <label for="tab6">Pet Care</label>
      <input type="radio" class="tablinks" name="other" value="other" id="tab7" v-model="filter.byCategory">
      <label for="tab7">Other</label>
    </div>
    <div>
      <input v-model="filter.byTitle" type="text" @input="searchByTitle">
    </div>
    <button @click="toggleFilterStatus" class="toggle-filter-btn" :class="filterBarStatus">Filter</button>
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
      showFilter: true
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
      }
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
      this.showFilter = !this.showFilter
    }
  },
  watch: {
    "filter.byCategory"() {
      this.$emit("searchGig", this.filter)
    }
  }
};
</script>

<style>
</style>
