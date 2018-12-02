<template>
  <section class="gig-toolbar-container">
    <div class="gig-toolbar">
      <button @click="searchGig">Moving</button>
      <button @click="searchGig">House-Work</button>
      <button @click="searchGig">Technical</button>
      <button @click="searchGig">Line-Queue</button>
      <button @click="searchGig">Pet-Care</button>
      <button @click="searchGig">Other</button>
    </div>
    <div>
      <input v-model="filter.byTitle" type="text" @input="searchByTitle">
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        byCategory: "",
        byTitle: ""
      }
    };
  },
  created() {
    if (!this.$route.params.type) return;
    this.filter.byCategory = this.$route.params.type;
    this.$emit("searchGig", this.filter);
  },
  methods: {
    searchGig(ev) {
      var category = ev.target.innerHTML.toLowerCase();
      this.filter.byCategory = category;
      this.$emit("searchGig", this.filter);
    },
    searchByTitle() {
      this.$emit("searchGig", this.filter);
    },
    destroyed(){
    }
  }
};
</script>

<style>
</style>
