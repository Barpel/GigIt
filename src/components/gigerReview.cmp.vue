
<template>
  <section class="giger-review-container">
    <div class="giger-review-screen"></div>
    <form class="giger-review-form" @submit.prevent="sumbitReview">
      <h2>How Was Your Gig With {{reviewStats.nameForReview}} ?</h2>
      <div class="giger-review-field">
        <h3>{{proffesionalOrPayment}}:</h3>
        <el-rate v-model="workOrPayment"></el-rate>
      </div>
      <div class="giger-review-field">
        <h3>Reliability:</h3>
        <el-rate v-model="review.reliable"></el-rate>
      </div>
      <div class="giger-review-field">
        <h3>Overall:</h3>
        <el-rate v-model="review.overall"></el-rate>
      </div>
      <div class="giger-review-text">
        <el-input
          placeholder="Please give us few words"
          v-model="review.text"
          type="textarea"
          clearable
        ></el-input>
      </div>
      <button class="giger-review-cancel" @click.prevent="skipReview">Skip</button>
      <button class="giger-review-send" type="submit">Send Review</button>
    </form>
  </section>
</template>

<script>
export default {
  props: { reviewStats: Object },
  data() {
    return {
      workOrPayment: 1,
      review: {
        reliable: 1,
        overall: 1,
        text: null
      }
    };
  },
  computed: {
    proffesionalOrPayment() {
      return this.reviewStats.isForGigster ? "Proffesional" : "Payment";
    }
  },
  methods: {
    sumbitReview() {
      var review = this.review;
      if (this.reviewStats.isForGigster) review.work = this.workOrPayment;
      else review.payment = this.workOrPayment;
      review.average = (
        (review.reliable + review.overall + this.workOrPayment) /
        3
      ).toFixed(1);
      this.$emit("reviewSumbitted", review);
    },
    skipReview() {
      this.$confirm(
        "Our community relies on your reviews. Go back to the review? ",
        "Warning",
        {
          confirmButtonText: "Back to the review",
          cancelButtonText: "No thanks",
          type: "warning"
        }
      )
        .catch(() => {
          this.$emit("reviewSumbitted");
        });
    }
  }
};
</script>

<style>
</style>
